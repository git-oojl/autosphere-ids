from __future__ import annotations

import json
from datetime import date

from django.contrib.auth import get_user_model
from django.db.models import Count, Q
from django.utils import timezone
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import (
    AdminReport,
    AdminSuspension,
    Appointment,
    CatalogEntry,
    ContactSubmission,
    Listing,
    ListingImage,
    Profile,
    Review,
    SavedVehicle,
    SearchHistory,
)
from .utils import (
    PUBLIC_HOME_DEFAULTS,
    STATUS_LABELS,
    TESTIMONIALS,
    VISIBLE_PUBLIC_STATUSES,
    build_seller_profile,
    calendar_payload,
    full_name,
    generate_prefixed_id,
    normalize_catalog_kind,
    normalize_mode,
    parse_iso_date,
    parse_iso_time,
    read_mock_json,
    serialize_appointment,
    serialize_listing,
    serialize_profile,
    serialize_review,
    serialize_security,
    serialize_session,
    user_public_id,
    compute_user_surfaces,
)

User = get_user_model()


def get_profile_by_public_id(public_id: str) -> Profile | None:
    try:
        return Profile.objects.select_related("user").get(public_id=public_id)
    except Profile.DoesNotExist:
        return None


def get_user_by_public_id(public_id: str):
    profile = get_profile_by_public_id(public_id)
    return profile.user if profile else None


def public_listing_queryset(include_unpublished: bool = False):
    queryset = Listing.objects.select_related("seller", "seller__profile").prefetch_related(
        "uploaded_images", "seller__profile_reviews"
    )
    if include_unpublished:
        return queryset
    return queryset.filter(status__in=VISIBLE_PUBLIC_STATUSES)


def sort_listings(items, sort_key: str):
    key = (sort_key or "relevance").lower()
    if key in {"price", "price_asc", "lowtohigh"}:
        return sorted(items, key=lambda item: item.price_per_day if item.mode == "rental" else item.price)
    if key in {"price-desc", "price_desc", "hightolow"}:
        return sorted(items, key=lambda item: item.price_per_day if item.mode == "rental" else item.price, reverse=True)
    if key in {"year", "newest", "date_desc", "relevance"}:
        return sorted(items, key=lambda item: (item.year or 0, item.created_at or timezone.now()), reverse=True)
    if key in {"year-asc", "oldtonew", "date_asc"}:
        return sorted(items, key=lambda item: (item.year or 0, item.created_at or timezone.now()))
    return list(items)


def filter_listings(request, *, include_unpublished=False):
    items = list(public_listing_queryset(include_unpublished=include_unpublished))
    mode = normalize_mode(request.query_params.get("mode"))
    if mode != "all":
        items = [item for item in items if item.mode == mode]
    seller_id = request.query_params.get("sellerId")
    if seller_id:
        items = [item for item in items if user_public_id(item.seller) == seller_id]
    status_value = request.query_params.get("status")
    if status_value:
        statuses = {value.strip() for value in status_value.split(",") if value.strip()}
        items = [item for item in items if item.status in statuses]
    q = (request.query_params.get("q") or request.query_params.get("query") or "").strip().lower()
    if q:
        items = [
            item
            for item in items
            if q in " ".join(
                [
                    item.public_id,
                    item.title or "",
                    item.brand or "",
                    item.model or "",
                    item.category or "",
                    item.type or "",
                    item.city_name or "",
                ]
            ).lower()
        ]
    brand = request.query_params.getlist("brand") or ([request.query_params.get("brand")] if request.query_params.get("brand") else [])
    if brand:
        allowed = {value for value in brand if value}
        items = [item for item in items if item.brand in allowed]
    type_values = request.query_params.getlist("type") or ([request.query_params.get("type")] if request.query_params.get("type") else [])
    if type_values:
        allowed = {value for value in type_values if value}
        items = [item for item in items if (item.type in allowed or item.category in allowed)]
    city_values = request.query_params.getlist("city") or ([request.query_params.get("city")] if request.query_params.get("city") else [])
    if city_values:
        allowed = {value for value in city_values if value}
        items = [item for item in items if ((item.city_name in allowed) or (item.city_id in allowed))]
    min_year = request.query_params.get("minYear")
    if min_year:
        items = [item for item in items if (item.year or 0) >= int(min_year)]
    max_year = request.query_params.get("maxYear")
    if max_year:
        items = [item for item in items if (item.year or 9999) <= int(max_year)]
    available_from = parse_iso_date(request.query_params.get("availableFrom"))
    if available_from:
        items = [item for item in items if not item.available_from or item.available_from <= available_from or item.mode != "rental"]
    available_to = parse_iso_date(request.query_params.get("availableTo"))
    if available_to:
        items = [item for item in items if not item.available_to or item.available_to >= available_to or item.mode != "rental"]
    max_deposit = request.query_params.get("maxDeposit")
    if max_deposit:
        items = [item for item in items if (item.deposit_amount or 0) <= int(max_deposit)]
    min_km = request.query_params.get("minKmIncluded")
    if min_km:
        items = [item for item in items if (item.km_included_per_day or 0) >= int(min_km)]
    return sort_listings(items, request.query_params.get("sort") or "relevance")


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def home_view(request):
    data = read_mock_json("public", "home.json", default=PUBLIC_HOME_DEFAULTS) or PUBLIC_HOME_DEFAULTS
    featured_ids = data.get("featuredVehicleIds") or []
    featured_queryset = public_listing_queryset().filter(public_id__in=featured_ids)
    featured_map = {item.public_id: serialize_listing(request, item) for item in featured_queryset}
    featured = [featured_map[item_id] for item_id in featured_ids if item_id in featured_map]
    if not featured:
        featured = [serialize_listing(request, item) for item in public_listing_queryset()[:3]]
    return Response({**data, "featuredListings": featured, "testimonials": TESTIMONIALS})


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def contact_view(request):
    payload = request.data
    ticket_id = generate_prefixed_id("contact")
    submission = ContactSubmission.objects.create(
        public_id=ticket_id,
        name=payload.get("name", ""),
        email=payload.get("email", ""),
        phone=payload.get("phone", ""),
        subject=payload.get("subject", ""),
        message=payload.get("message", ""),
    )
    return Response(
        {
            "ok": True,
            "ticketId": submission.public_id,
            "message": "Mensaje recibido correctamente.",
            "submittedAt": submission.created_at.isoformat(),
            "payload": {
                "name": submission.name,
                "email": submission.email,
                "phone": submission.phone,
                "subject": submission.subject,
                "message": submission.message,
            },
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def catalog_filters_view(request):
    inventory = filter_listings(request, include_unpublished=False)
    brands = sorted({item.brand for item in inventory if item.brand})
    types = sorted({item.type or item.category for item in inventory if item.type or item.category})
    cities = []
    seen = set()
    for item in inventory:
        if item.city_id and item.city_id not in seen:
            seen.add(item.city_id)
            label = ", ".join(part for part in [item.city_name, item.state_name] if part)
            cities.append({"id": item.city_id, "label": label})
    base = read_mock_json("catalog", "filters.json", default={}) or {}
    return Response({**base, "brands": brands, "types": types, "cities": cities})


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def listings_view(request):
    include_unpublished = str(request.query_params.get("includeUnpublished", "")).lower() in {"1", "true", "yes"}
    items = filter_listings(request, include_unpublished=include_unpublished)
    page = max(int(request.query_params.get("page", 1) or 1), 1)
    page_size = max(int(request.query_params.get("pageSize", 12) or 12), 1)
    start = (page - 1) * page_size
    end = start + page_size
    serialized = [serialize_listing(request, item) for item in items[start:end]]
    return Response(
        {
            "meta": {
                "page": page,
                "pageSize": page_size,
                "total": len(items),
                "totalPages": max(1, (len(items) + page_size - 1) // page_size),
            },
            "items": serialized,
            "appliedFilters": dict(request.query_params),
        }
    )


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def listing_detail_view(request, public_id: str):
    try:
        listing = public_listing_queryset(include_unpublished=True).get(public_id=public_id)
    except Listing.DoesNotExist:
        return Response(None, status=status.HTTP_404_NOT_FOUND)
    return Response(serialize_listing(request, listing))


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def public_profile_view(request, public_id: str):
    user = get_user_by_public_id(public_id)
    if not user:
        return Response(None, status=status.HTTP_404_NOT_FOUND)
    inventory = [serialize_listing(request, item) for item in public_listing_queryset().filter(seller=user)]
    profile = build_seller_profile(request, user)
    return Response({**profile, "inventory": inventory, "reviews": [serialize_review(item) for item in user.profile_reviews.all()]})


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def public_profile_reviews_view(request, public_id: str):
    user = get_user_by_public_id(public_id)
    if not user:
        return Response([])
    return Response([serialize_review(item) for item in user.profile_reviews.all()])


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def register_view(request):
    payload = request.data
    email = (payload.get("email") or "").strip().lower()
    if not email:
        return Response({"detail": "Email requerido"}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email__iexact=email).exists():
        return Response({"detail": "El correo ya está registrado."}, status=status.HTTP_400_BAD_REQUEST)
    name = (payload.get("name") or "").strip() or "Usuario AutoSphere"
    first_name, _, last_name = name.partition(" ")
    user = User.objects.create_user(
        username=email,
        email=email,
        password=payload.get("password") or "ChangeMe123!",
        first_name=first_name,
        last_name=last_name,
    )
    Profile.objects.create(
        user=user,
        public_id=generate_prefixed_id("u"),
        phone=payload.get("phone", ""),
        city="",
        state="",
        bio="",
        avatar_preset="aurora",
        verified=False,
        member_since=date.today(),
        primary_surface="buyer",
    )
    return Response(
        {
            "ok": True,
            "message": "Cuenta registrada correctamente. Pendiente de validación manual.",
            "user": {
                "id": user.profile.public_id,
                "name": full_name(user),
                "email": user.email,
                "roles": ["user"],
                "status": "pending_verification",
            },
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def login_view(request):
    payload = request.data
    email = (payload.get("email") or "").strip().lower()
    password = payload.get("password") or ""
    try:
        user = User.objects.select_related("profile").get(email__iexact=email)
    except User.DoesNotExist:
        return Response({"detail": "Credenciales inválidas."}, status=status.HTTP_400_BAD_REQUEST)
    if not user.check_password(password):
        return Response({"detail": "Credenciales inválidas."}, status=status.HTTP_400_BAD_REQUEST)
    if not user.is_active:
        return Response({"detail": "Cuenta inactiva."}, status=status.HTTP_403_FORBIDDEN)
    token = str(RefreshToken.for_user(user).access_token)
    return Response(serialize_session(request, user, token=token))


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def forgot_password_view(request):
    email = request.data.get("email", "")
    return Response({"ok": True, "email": email, "message": "Solicitud de recuperación registrada"})


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def verify_email_view(request):
    return Response({"ok": True, "token": request.data.get("token"), "message": "Correo verificado correctamente."})


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def logout_view(request):
    return Response({"ok": True})


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def me_view(request):
    return Response(serialize_session(request, request.user, token=None))


@api_view(["GET", "PATCH"])
@permission_classes([permissions.IsAuthenticated])
def profile_view(request):
    user = request.user
    profile = user.profile
    if request.method == "GET":
        return Response(serialize_profile(request, user))
    payload = request.data
    user.first_name = payload.get("firstName", user.first_name)
    user.last_name = payload.get("lastName", user.last_name)
    user.email = payload.get("email", user.email)
    user.username = user.email
    profile.phone = payload.get("phone", profile.phone)
    profile.city = payload.get("city", profile.city)
    profile.state = payload.get("state", profile.state)
    profile.bio = payload.get("bio", profile.bio)
    profile.avatar_preset = payload.get("avatarPreset", profile.avatar_preset)
    if "avatarUrl" in payload:
        profile.avatar_url = payload.get("avatarUrl")
    user.save()
    profile.save()
    return Response(serialize_profile(request, user))


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def security_view(request):
    return Response(serialize_security(request.user))


@api_view(["PATCH"])
@permission_classes([permissions.IsAuthenticated])
def password_view(request):
    current = request.data.get("current") or ""
    new_password = request.data.get("next") or ""
    if not request.user.check_password(current):
        return Response({"detail": "La contraseña actual no coincide."}, status=status.HTTP_400_BAD_REQUEST)
    request.user.set_password(new_password)
    request.user.save()
    request.user.profile.password_updated_at = timezone.now()
    request.user.profile.save(update_fields=["password_updated_at"])
    return Response({"ok": True, "changedAt": request.user.profile.password_updated_at.isoformat()})


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def buyer_dashboard_view(request):
    saved_count = SavedVehicle.objects.filter(user=request.user).count()
    search_count = SearchHistory.objects.filter(user=request.user).count()
    upcoming = Appointment.objects.filter(buyer=request.user, status__in=["pending", "confirmed", "rescheduled"]).count()
    return Response({
        "summary": {
            "savedVehicles": saved_count,
            "searchHistory": search_count,
            "upcomingAppointments": upcoming,
        }
    })


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def saved_vehicles_view(request):
    items = [serialize_listing(request, item.listing) for item in SavedVehicle.objects.filter(user=request.user).select_related("listing", "listing__seller", "listing__seller__profile").prefetch_related("listing__uploaded_images", "listing__seller__profile_reviews")]
    q = (request.query_params.get("q") or request.query_params.get("query") or "").lower()
    if q:
        items = [item for item in items if q in " ".join([item.get("title") or "", item.get("brand") or "", item.get("model") or "", item.get("cityLabel") or ""]).lower()]
    return Response({"items": items})


@api_view(["GET", "POST", "DELETE"])
@permission_classes([permissions.IsAuthenticated])
def saved_vehicle_detail_view(request, public_id: str):
    try:
        listing = Listing.objects.select_related("seller", "seller__profile").prefetch_related("uploaded_images", "seller__profile_reviews").get(public_id=public_id)
    except Listing.DoesNotExist:
        return Response(None, status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        saved = SavedVehicle.objects.filter(user=request.user, listing=listing).exists()
        if not saved:
            return Response(None, status=status.HTTP_404_NOT_FOUND)
        return Response(serialize_listing(request, listing))
    if request.method == "DELETE":
        SavedVehicle.objects.filter(user=request.user, listing=listing).delete()
        return Response({"ok": True, "id": public_id})
    saved, _ = SavedVehicle.objects.get_or_create(user=request.user, listing=listing)
    return Response(serialize_listing(request, saved.listing), status=status.HTTP_201_CREATED)


@api_view(["GET", "POST"])
@permission_classes([permissions.IsAuthenticated])
def search_history_view(request):
    if request.method == "GET":
        items = [
            {
                "id": item.public_id,
                "query": item.query,
                "timestamp": item.timestamp.isoformat(),
                "resultCount": item.result_count,
                "filtersSummary": item.filters_summary,
            }
            for item in SearchHistory.objects.filter(user=request.user)
        ]
        return Response({"items": items})
    payload = request.data
    query = (payload.get("query") or "").strip()
    if not query:
        return Response(None)
    entry = SearchHistory.objects.filter(user=request.user, query__iexact=query).first()
    created = entry is None
    if created:
        entry = SearchHistory(
            user=request.user,
            public_id=generate_prefixed_id("sh"),
            query=query,
        )
    entry.result_count = int(payload.get("resultCount") or entry.result_count or 0)
    entry.filters_summary = payload.get("filtersSummary") or entry.filters_summary or ""
    entry.timestamp = timezone.now()
    entry.save()
    return Response({
        "id": entry.public_id,
        "query": entry.query,
        "timestamp": entry.timestamp.isoformat(),
        "resultCount": entry.result_count,
        "filtersSummary": entry.filters_summary,
    }, status=status.HTTP_201_CREATED)


@api_view(["DELETE"])
@permission_classes([permissions.IsAuthenticated])
def search_history_detail_view(request, public_id: str):
    SearchHistory.objects.filter(user=request.user, public_id=public_id).delete()
    return Response({"ok": True, "id": public_id})


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def appointments_calendar_view(request):
    queryset = Appointment.objects.select_related("listing", "listing__seller", "listing__seller__profile", "buyer", "buyer__profile", "seller", "seller__profile")
    if not request.user.is_staff:
        queryset = queryset.filter(Q(buyer=request.user) | Q(seller=request.user) | Q(listing__seller=request.user))
    return Response(calendar_payload(request, list(queryset)))


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def appointment_slots_view(request):
    listing_id = request.query_params.get("listingId") or request.query_params.get("id")
    date_value = request.query_params.get("date")
    slots = [
        {"time": value, "available": True}
        for value in ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
    ]
    if listing_id and date_value:
        reserved = set(
            Appointment.objects.filter(listing__public_id=listing_id, date=parse_iso_date(date_value), status__in=["pending", "confirmed", "rescheduled"]).values_list("time", flat=True)
        )
        slots = [slot for slot in slots if parse_iso_time(slot["time"]) not in reserved]
    return Response({"listingId": listing_id, "date": date_value, "slots": slots})


@api_view(["GET", "POST"])
@permission_classes([permissions.IsAuthenticatedOrReadOnly])
def appointments_view(request):
    if request.method == "GET":
        queryset = Appointment.objects.select_related("listing", "listing__seller", "listing__seller__profile", "buyer", "buyer__profile", "seller", "seller__profile")
        buyer_id = request.query_params.get("buyerId")
        seller_id = request.query_params.get("sellerId")
        listing_id = request.query_params.get("listingId")
        if buyer_id:
            queryset = queryset.filter(buyer__profile__public_id=buyer_id)
        if seller_id:
            queryset = queryset.filter(Q(seller__profile__public_id=seller_id) | Q(listing__seller__profile__public_id=seller_id))
        if listing_id:
            queryset = queryset.filter(listing__public_id=listing_id)
        status_value = request.query_params.get("status")
        if status_value:
            statuses = [value for value in status_value.split(",") if value]
            queryset = queryset.filter(status__in=statuses)
        return Response([serialize_appointment(request, item) for item in queryset])
    payload = request.data
    try:
        listing = Listing.objects.select_related("seller", "seller__profile").get(public_id=payload.get("listingId"))
    except Listing.DoesNotExist:
        return Response({"detail": "Publicación no encontrada."}, status=status.HTTP_400_BAD_REQUEST)
    buyer = request.user if request.user.is_authenticated else None
    buyer_public_id = payload.get("buyerId")
    if buyer_public_id:
        maybe_buyer = get_user_by_public_id(buyer_public_id)
        buyer = maybe_buyer or buyer
    appointment = Appointment.objects.create(
        public_id=generate_prefixed_id("ap"),
        listing=listing,
        buyer=buyer,
        seller=listing.seller,
        status="pending",
        date=parse_iso_date(payload.get("date")),
        time=parse_iso_time(payload.get("time")),
        location_label=first_scalar(payload, "locationLabel") or listing.location.get("addressLabel", "Ubicación por confirmar"),
        notes=payload.get("notes", ""),
        appointment_type=payload.get("appointmentType") or payload.get("type") or "test-drive",
        buyer_name=payload.get("buyerName") or (full_name(buyer) if buyer else "Cliente AutoSphere"),
        buyer_email=payload.get("buyerEmail") or (buyer.email if buyer else ""),
        buyer_phone=payload.get("buyerPhone") or (buyer.profile.phone if buyer and hasattr(buyer, "profile") else ""),
        seller_name=full_name(listing.seller),
        seller_email=listing.seller.email,
        seller_phone=listing.seller.profile.phone,
    )
    return Response(serialize_appointment(request, appointment), status=status.HTTP_201_CREATED)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def appointment_detail_view(request, public_id: str):
    try:
        appointment = Appointment.objects.select_related("listing", "listing__seller", "listing__seller__profile", "buyer", "buyer__profile", "seller", "seller__profile").get(public_id=public_id)
    except Appointment.DoesNotExist:
        return Response(None, status=status.HTTP_404_NOT_FOUND)
    return Response(serialize_appointment(request, appointment))


def update_appointment_status(request, public_id: str, status_value: str, extra_fields: dict | None = None):
    try:
        appointment = Appointment.objects.get(public_id=public_id)
    except Appointment.DoesNotExist:
        return Response(None, status=status.HTTP_404_NOT_FOUND)
    appointment.status = status_value
    for key, value in (extra_fields or {}).items():
        setattr(appointment, key, value)
    appointment.save()
    appointment.refresh_from_db()
    return Response(serialize_appointment(request, appointment))


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def appointment_confirm_view(request, public_id: str):
    return update_appointment_status(request, public_id, "confirmed")


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def appointment_reschedule_view(request, public_id: str):
    return update_appointment_status(
        request,
        public_id,
        "rescheduled",
        {
            "date": parse_iso_date(request.data.get("date")),
            "time": parse_iso_time(request.data.get("time")),
            "notes": request.data.get("notes", ""),
        },
    )


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def appointment_cancel_view(request, public_id: str):
    return update_appointment_status(request, public_id, "cancelled", {"cancel_reason": request.data.get("reason", "")})


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def seller_dashboard_view(request):
    listings_qs = Listing.objects.filter(seller=request.user)
    return Response(
        {
            "summary": {
                "totalListings": listings_qs.count(),
                "saleListings": listings_qs.filter(mode="sale").count(),
                "rentalListings": listings_qs.filter(mode="rental").count(),
                "appointments": Appointment.objects.filter(Q(seller=request.user) | Q(listing__seller=request.user)).count(),
            }
        }
    )


def first_scalar(payload, key):
    value = payload.get(key)
    if isinstance(value, list):
        return value[-1] if value else None
    return value


def coerce_jsonish(value):
    if isinstance(value, str):
        stripped = value.strip()
        if stripped.startswith(("[", "{")):
            try:
                return json.loads(stripped)
            except json.JSONDecodeError:
                return value
    return value


def listing_from_payload(payload, seller, existing: Listing | None = None):
    listing = existing or Listing(seller=seller, public_id=generate_prefixed_id("vh" if normalize_mode(first_scalar(payload, "type") or first_scalar(payload, "mode") or first_scalar(payload, "listingType")) != "rental" else "rt"))
    mode = normalize_mode(first_scalar(payload, "type") or first_scalar(payload, "mode") or first_scalar(payload, "listingType") or listing.mode)
    listing.mode = mode if mode != "all" else listing.mode
    listing.status = first_scalar(payload, "status") or listing.status or "draft"
    listing.title = first_scalar(payload, "title") or listing.title
    listing.brand = first_scalar(payload, "brand") or listing.brand
    listing.model = first_scalar(payload, "model") or listing.model
    listing.year = int(first_scalar(payload, "year")) if first_scalar(payload, "year") not in (None, "") else listing.year
    payload_type = first_scalar(payload, "type")
    normalized_type = "" if payload_type in (None, "", "venta", "renta", "sale", "rental") else payload_type
    listing.type = normalized_type or first_scalar(payload, "category") or listing.type or ""
    listing.category = first_scalar(payload, "category") or listing.category or listing.type or ""
    listing.transmission = first_scalar(payload, "transmission") or listing.transmission
    listing.fuel = first_scalar(payload, "fuel") or first_scalar(payload, "fuelType") or listing.fuel
    listing.mileage_km = int(first_scalar(payload, "mileageKm") or first_scalar(payload, "mileage") or listing.mileage_km or 0) if any(v not in (None, "") for v in [first_scalar(payload, "mileageKm"), first_scalar(payload, "mileage")]) else listing.mileage_km
    listing.color = first_scalar(payload, "color") or listing.color
    listing.city_name = first_scalar(payload, "cityName") or first_scalar(payload, "cityLabel") or first_scalar(payload, "city") or listing.city_name
    listing.state_name = first_scalar(payload, "state") or listing.state_name
    listing.price = int(first_scalar(payload, "price") or listing.price or 0)
    listing.price_per_day = int(first_scalar(payload, "pricePerDay") or listing.price_per_day or 0) if first_scalar(payload, "pricePerDay") not in (None, "") else listing.price_per_day
    listing.price_per_week = int(first_scalar(payload, "pricePerWeek") or listing.price_per_week or 0) if first_scalar(payload, "pricePerWeek") not in (None, "") else listing.price_per_week
    listing.price_per_month = int(first_scalar(payload, "pricePerMonth") or listing.price_per_month or 0) if first_scalar(payload, "pricePerMonth") not in (None, "") else listing.price_per_month
    listing.deposit_amount = int(first_scalar(payload, "deposit") or first_scalar(payload, "depositAmount") or listing.deposit_amount or 0) if first_scalar(payload, "deposit") not in (None, "") or first_scalar(payload, "depositAmount") not in (None, "") else listing.deposit_amount
    listing.km_included_per_day = int(first_scalar(payload, "kmIncludedPerDay") or listing.km_included_per_day or 0) if first_scalar(payload, "kmIncludedPerDay") not in (None, "") else listing.km_included_per_day
    listing.available_from = parse_iso_date(first_scalar(payload, "availableFrom")) or listing.available_from
    listing.available_to = parse_iso_date(first_scalar(payload, "availableTo")) or listing.available_to
    if first_scalar(payload, "available") is not None:
        listing.available = str(first_scalar(payload, "available")).lower() in {"1", "true", "yes"}
    listing.description = first_scalar(payload, "description") or listing.description
    location_value = coerce_jsonish(first_scalar(payload, "location"))
    if not location_value and hasattr(payload, "getlist"):
        maybe_list = payload.getlist("location")
        location_value = coerce_jsonish(maybe_list[-1]) if maybe_list else None
    listing.location = location_value or listing.location or {
        "city": listing.city_name,
        "state": listing.state_name,
        "addressLabel": first_scalar(payload, "address") or first_scalar(payload, "locationLabel") or first_scalar(payload, "publicPlace") or "Ubicación por confirmar",
    }
    features_value = coerce_jsonish(first_scalar(payload, "features"))
    if (features_value in (None, "", [])) and hasattr(payload, "getlist"):
        multi_features = [item for item in payload.getlist("features") if item not in (None, "")]
        if len(multi_features) > 1:
            features_value = multi_features
    listing.features = features_value or listing.features or []
    listing.specs = coerce_jsonish(first_scalar(payload, "specs")) or listing.specs or {}
    listing.seller_profile_extra = listing.seller_profile_extra or {}
    return listing


@api_view(["GET", "POST"])
@permission_classes([permissions.IsAuthenticated])
def seller_listings_view(request):
    if request.method == "GET":
        items = filter_listings(request, include_unpublished=True)
        items = [item for item in items if item.seller_id == request.user.id]
        page = max(int(request.query_params.get("page", 1) or 1), 1)
        page_size = max(int(request.query_params.get("pageSize", 12) or 12), 1)
        start = (page - 1) * page_size
        end = start + page_size
        return Response({
            "meta": {"page": page, "pageSize": page_size, "total": len(items), "totalPages": max(1, (len(items) + page_size - 1) // page_size)},
            "items": [serialize_listing(request, item) for item in items[start:end]],
        })
    listing = listing_from_payload(request.data, request.user)
    listing.save()
    for image in request.FILES.getlist("images"):
        ListingImage.objects.create(listing=listing, image=image)
    return Response(serialize_listing(request, listing), status=status.HTTP_201_CREATED)


@api_view(["GET", "PATCH", "DELETE"])
@permission_classes([permissions.IsAuthenticated])
def seller_listing_detail_view(request, public_id: str):
    try:
        listing = Listing.objects.select_related("seller", "seller__profile").prefetch_related("uploaded_images", "seller__profile_reviews").get(public_id=public_id, seller=request.user)
    except Listing.DoesNotExist:
        return Response(None, status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        return Response(serialize_listing(request, listing))
    if request.method == "DELETE":
        listing.status = "archived"
        listing.save(update_fields=["status"])
        return Response({"ok": True, "id": public_id, "status": "deleted"})
    listing = listing_from_payload(request.data, request.user, existing=listing)
    listing.save()
    return Response(serialize_listing(request, listing))


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def seller_listing_form_options_view(request):
    return Response(read_mock_json("seller", "listing-form-options.json", default={}) or {})


@api_view(["GET", "POST"])
@permission_classes([permissions.IsAuthenticated])
def lessor_rentals_view(request):
    if request.method == "GET":
        items = [item for item in filter_listings(request, include_unpublished=True) if item.mode == "rental" and item.seller_id == request.user.id]
        return Response({"items": [serialize_listing(request, item) for item in items]})
    payload = request.data
    payload["mode"] = "rental"
    payload.setdefault("status", "published")
    listing = listing_from_payload(payload, request.user)
    if not listing.public_id.startswith("rt-"):
        listing.public_id = generate_prefixed_id("rt")
    listing.mode = "rental"
    listing.save()
    for image in request.FILES.getlist("images"):
        ListingImage.objects.create(listing=listing, image=image)
    return Response(serialize_listing(request, listing), status=status.HTTP_201_CREATED)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def lessor_rental_detail_view(request, public_id: str):
    try:
        listing = Listing.objects.select_related("seller", "seller__profile").prefetch_related("uploaded_images", "seller__profile_reviews").get(public_id=public_id, seller=request.user, mode="rental")
    except Listing.DoesNotExist:
        return Response(None, status=status.HTTP_404_NOT_FOUND)
    return Response({
        "id": listing.public_id,
        "vehicleLabel": listing.title,
        "clientName": "Cliente AutoSphere",
        "status": "closed" if not listing.available else ("scheduled" if listing.available_from and listing.available_from > date.today() else "active"),
        "startDate": listing.available_from.isoformat() if listing.available_from else None,
        "endDate": listing.available_to.isoformat() if listing.available_to else None,
        "monthlyRate": listing.price_per_month or listing.price or 0,
        "deposit": listing.deposit_amount or 0,
        "insuranceIncluded": True,
        "pickupLocation": (listing.location or {}).get("addressLabel") or listing.city_name or "Sucursal AutoSphere",
        "notes": listing.description,
    })


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def lessor_rental_close_view(request, public_id: str):
    try:
        listing = Listing.objects.get(public_id=public_id, seller=request.user, mode="rental")
    except Listing.DoesNotExist:
        return Response(None, status=status.HTTP_404_NOT_FOUND)
    listing.available = False
    listing.status = "unavailable"
    listing.save(update_fields=["available", "status"])
    return Response({"ok": True, "id": listing.public_id, "status": "closed", "closedAt": timezone.now().isoformat(), "closeNotes": request.data.get("closeNotes", "")})


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def admin_dashboard_view(request):
    if not request.user.is_staff:
        return Response(status=status.HTTP_403_FORBIDDEN)
    active_statuses = ["published", "active", "approved"]
    return Response({
        "summary": {
            "totalUsers": Profile.objects.count(),
            "totalListings": Listing.objects.filter(status__in=active_statuses).count(),
            "totalAppointments": Appointment.objects.count(),
            "pendingReports": AdminReport.objects.filter(data__status="pending").count(),
            "pendingModeration": Listing.objects.filter(status="pending").count(),
            "suspendedUsers": AdminSuspension.objects.filter(data__status="active").count(),
            "catalogSummary": {
                "brands": CatalogEntry.objects.filter(kind="brands").count(),
                "models": CatalogEntry.objects.filter(kind="models").count(),
                "types": CatalogEntry.objects.filter(kind="vehicle-types").count(),
                "locations": CatalogEntry.objects.filter(kind="locations").count(),
            },
        },
        "recentAlerts": [],
    })


def admin_required(request):
    return request.user.is_staff


@api_view(["GET", "POST"])
@permission_classes([permissions.IsAuthenticated])
def admin_users_view(request):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    if request.method == "GET":
        items = []
        listing_counts = {item["seller__profile__public_id"]: item["count"] for item in Listing.objects.values("seller__profile__public_id").annotate(count=Count("id"))}
        active_suspensions = {
            item.data.get("userId")
            for item in AdminSuspension.objects.all()
            if item.data.get("status") == "active"
        }
        for profile in Profile.objects.select_related("user"):
            user = profile.user
            surfaces = compute_user_surfaces(user)
            fallback_role = {"lessor": "landlord"}.get(profile.primary_surface, profile.primary_surface or "buyer")
            primary_role = "admin" if user.is_staff else (surfaces[0] if surfaces else fallback_role)
            items.append({
                "id": profile.public_id,
                "name": full_name(user),
                "email": user.email,
                "phone": profile.phone,
                "location": ", ".join(part for part in [profile.city, profile.state] if part),
                "role": primary_role,
                "surfaces": surfaces if not user.is_staff else ["admin"],
                "status": "suspended" if profile.public_id in active_suspensions else ("active" if user.is_active else "inactive"),
                "verified": profile.verified,
                "registeredAt": profile.member_since.isoformat() if profile.member_since else None,
                "lastLogin": user.last_login.isoformat() if user.last_login else None,
                "listingsCount": listing_counts.get(profile.public_id, 0),
                "avatar": profile.avatar_url,
            })
        return Response({"items": items})
    payload = request.data
    user = None
    profile = None
    if payload.get("id"):
        profile = get_profile_by_public_id(payload["id"])
        user = profile.user if profile else None
    if not user:
        email = (payload.get("email") or "").strip().lower()
        user = User.objects.create_user(username=email, email=email, password="AdminUser123!")
        profile = Profile.objects.create(user=user, public_id=generate_prefixed_id("u"), member_since=date.today())
    name = payload.get("name") or full_name(user)
    first_name, _, last_name = name.partition(" ")
    user.first_name = first_name
    user.last_name = last_name
    user.email = payload.get("email", user.email)
    user.username = user.email
    user.is_staff = payload.get("role") == "admin"
    user.is_active = payload.get("status", "active") == "active"
    user.save()
    profile.phone = payload.get("phone", profile.phone)
    location = payload.get("location", "")
    if location and not first_scalar(payload, "city"):
        profile.city = location
    profile.primary_surface = payload.get("role", profile.primary_surface)
    profile.verified = bool(payload.get("verified", profile.verified))
    profile.avatar_url = payload.get("avatar", profile.avatar_url)
    profile.save()
    return Response({"id": profile.public_id})


@api_view(["GET", "PATCH", "DELETE"])
@permission_classes([permissions.IsAuthenticated])
def admin_user_detail_view(request, public_id: str):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    profile = get_profile_by_public_id(public_id)
    if not profile:
        return Response(None, status=status.HTTP_404_NOT_FOUND)
    user = profile.user
    if request.method == "GET":
        return Response(serialize_profile(request, user))
    if request.method == "DELETE":
        user.delete()
        return Response({"ok": True, "id": public_id})
    payload = request.data
    name = payload.get("name") or full_name(user)
    first_name, _, last_name = name.partition(" ")
    user.first_name = first_name
    user.last_name = last_name
    user.email = payload.get("email", user.email)
    user.username = user.email
    user.is_staff = payload.get("role", "admin" if user.is_staff else profile.primary_surface) == "admin"
    user.is_active = payload.get("status", "active") == "active"
    user.save()
    profile.phone = payload.get("phone", profile.phone)
    profile.primary_surface = payload.get("role", profile.primary_surface)
    profile.verified = bool(payload.get("verified", profile.verified))
    profile.avatar_url = payload.get("avatar", profile.avatar_url)
    profile.save()
    return Response({"id": profile.public_id})


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def admin_user_status_view(request, public_id: str):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    profile = get_profile_by_public_id(public_id)
    if not profile:
        return Response(None, status=status.HTTP_404_NOT_FOUND)
    status_value = request.data.get("status", "active")
    profile.user.is_active = status_value == "active"
    profile.user.save(update_fields=["is_active"])
    return Response({"ok": True, "status": status_value})


@api_view(["GET", "POST"])
@permission_classes([permissions.IsAuthenticated])
def admin_listings_view(request):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    if request.method == "GET":
        items = [serialize_listing(request, item) for item in public_listing_queryset(include_unpublished=True)]
        return Response({"items": items})
    listing = listing_from_payload(request.data, request.user)
    listing.save()
    return Response(serialize_listing(request, listing), status=status.HTTP_201_CREATED)


@api_view(["PATCH", "DELETE"])
@permission_classes([permissions.IsAuthenticated])
def admin_listing_detail_view(request, public_id: str):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    try:
        listing = Listing.objects.get(public_id=public_id)
    except Listing.DoesNotExist:
        return Response(None, status=status.HTTP_404_NOT_FOUND)
    if request.method == "DELETE":
        listing.delete()
        return Response({"ok": True, "id": public_id})
    listing = listing_from_payload(request.data, listing.seller, existing=listing)
    listing.save()
    return Response(serialize_listing(request, listing))


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def admin_listing_review_view(request, public_id: str):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    try:
        listing = Listing.objects.get(public_id=public_id)
    except Listing.DoesNotExist:
        return Response(None, status=status.HTTP_404_NOT_FOUND)
    listing.status = request.data.get("status", "active")
    listing.save(update_fields=["status"])
    return Response(serialize_listing(request, listing))


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def admin_appointments_view(request):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    items = [serialize_appointment(request, item) for item in Appointment.objects.select_related("listing", "listing__seller", "listing__seller__profile", "buyer", "buyer__profile", "seller", "seller__profile")]
    return Response({"items": items})


@api_view(["PATCH", "DELETE"])
@permission_classes([permissions.IsAuthenticated])
def admin_appointment_detail_view(request, public_id: str):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    try:
        appointment = Appointment.objects.get(public_id=public_id)
    except Appointment.DoesNotExist:
        return Response(None, status=status.HTTP_404_NOT_FOUND)
    if request.method == "DELETE":
        appointment.delete()
        return Response({"ok": True, "id": public_id})
    if request.data.get("status"):
        appointment.status = request.data["status"]
    if request.data.get("cancelReason"):
        appointment.cancel_reason = request.data["cancelReason"]
    appointment.save()
    appointment.refresh_from_db()
    return Response(serialize_appointment(request, appointment))


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def admin_catalog_view(request):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    brands = [item.data for item in CatalogEntry.objects.filter(kind="brands")]
    models = [item.data for item in CatalogEntry.objects.filter(kind="models")]
    types = [item.data for item in CatalogEntry.objects.filter(kind="vehicle-types")]
    locations = [item.data for item in CatalogEntry.objects.filter(kind="locations")]
    return Response({
        "brands": brands,
        "models": models,
        "types": types,
        "vehicleTypes": types,
        "locations": locations,
    })


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def admin_catalog_collections_view(request):
    return admin_catalog_view(request)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def admin_catalog_item_view(request, kind: str):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    payload = request.data
    normalized_kind = normalize_catalog_kind(kind)
    public_id = payload.get("id") or generate_prefixed_id(normalized_kind[:2])
    item, _ = CatalogEntry.objects.update_or_create(public_id=public_id, defaults={"kind": normalized_kind, "data": {**payload, "id": public_id}})
    return Response(item.data)


@api_view(["DELETE"])
@permission_classes([permissions.IsAuthenticated])
def admin_catalog_item_detail_view(request, kind: str, public_id: str):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    CatalogEntry.objects.filter(kind=normalize_catalog_kind(kind), public_id=public_id).delete()
    return Response({"ok": True, "id": public_id})


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def admin_moderation_view(request):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    items = [serialize_listing(request, item) for item in Listing.objects.filter(status__in=["pending", "approved", "rejected"]).select_related("seller", "seller__profile").prefetch_related("uploaded_images", "seller__profile_reviews")]
    return Response({"items": items})


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def admin_moderation_listings_view(request):
    return admin_moderation_view(request)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def admin_moderation_approve_view(request, public_id: str):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    try:
        listing = Listing.objects.get(public_id=public_id)
    except Listing.DoesNotExist:
        return Response(None, status=status.HTTP_404_NOT_FOUND)
    listing.status = "approved"
    listing.save(update_fields=["status"])
    return Response(serialize_listing(request, listing))


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def admin_moderation_reject_view(request, public_id: str):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    try:
        listing = Listing.objects.get(public_id=public_id)
    except Listing.DoesNotExist:
        return Response(None, status=status.HTTP_404_NOT_FOUND)
    listing.status = "rejected"
    listing.description = request.data.get("reason") or listing.description
    listing.save(update_fields=["status", "description"])
    return Response(serialize_listing(request, listing))


@api_view(["DELETE"])
@permission_classes([permissions.IsAuthenticated])
def admin_moderation_delete_view(request, public_id: str):
    return admin_listing_detail_view(request, public_id)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def admin_reports_view(request):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    return Response({"items": [item.data for item in AdminReport.objects.all()]})


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def admin_report_start_view(request, public_id: str):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    report = AdminReport.objects.get(public_id=public_id)
    data = report.data
    data["status"] = "in_review"
    data["updatedAt"] = timezone.now().isoformat()
    report.data = data
    report.save(update_fields=["data", "updated_at"])
    return Response(data)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def admin_report_resolve_view(request, public_id: str):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    report = AdminReport.objects.get(public_id=public_id)
    data = report.data
    data["status"] = "resolved"
    data["resolution"] = request.data.get("resolution")
    data["adminNotes"] = request.data.get("adminNotes")
    data["resolvedAt"] = timezone.now().isoformat()
    data["updatedAt"] = timezone.now().isoformat()
    report.data = data
    report.save(update_fields=["data", "updated_at"])
    return Response(data)


@api_view(["DELETE"])
@permission_classes([permissions.IsAuthenticated])
def admin_report_detail_view(request, public_id: str):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    AdminReport.objects.filter(public_id=public_id).delete()
    return Response({"ok": True, "id": public_id})


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def admin_suspensions_view(request):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    return Response({"items": [item.data for item in AdminSuspension.objects.all()]})


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def admin_suspension_form_options_view(request):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    users = [{"id": profile.public_id, "name": full_name(profile.user), "email": profile.user.email} for profile in Profile.objects.select_related("user")]
    return Response({"users": users})


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def admin_suspension_save_view(request):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    payload = request.data
    public_id = payload.get("id") or generate_prefixed_id("sp")
    payload["id"] = public_id
    item, _ = AdminSuspension.objects.update_or_create(public_id=public_id, defaults={"data": payload})
    return Response(item.data)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def admin_suspension_reinstate_view(request, public_id: str):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    suspension = AdminSuspension.objects.get(public_id=public_id)
    data = suspension.data
    data["status"] = "reinstated"
    data["reinstatementDate"] = timezone.now().date().isoformat()
    suspension.data = data
    suspension.save(update_fields=["data", "updated_at"])
    return Response(data)


@api_view(["DELETE"])
@permission_classes([permissions.IsAuthenticated])
def admin_suspension_detail_view(request, public_id: str):
    if not admin_required(request):
        return Response(status=status.HTTP_403_FORBIDDEN)
    AdminSuspension.objects.filter(public_id=public_id).delete()
    return Response({"ok": True, "id": public_id})
