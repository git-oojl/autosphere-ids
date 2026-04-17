from __future__ import annotations

import json
from collections import defaultdict
from datetime import datetime
from pathlib import Path
from typing import Any

from django.conf import settings
from django.core.files.base import ContentFile
from django.db.models import Count
from django.utils import timezone

from .models import Appointment, Listing, Profile, Review, SavedVehicle, SearchHistory

ROOT_DIR = Path(settings.BASE_DIR).parent
FRONTEND_MOCKS_DIR = ROOT_DIR / "frontend" / "src" / "mocks"

PUBLIC_HOME_DEFAULTS = {
    "hero": {
        "headline": "Encuentra tu próximo vehículo en AutoSphere",
        "subheadline": "Explora publicaciones, agenda citas y compara opciones con un flujo claro para comprador y vendedor.",
        "ctaPrimary": {"label": "Ver vehículos", "routeName": "public-catalog"},
        "ctaSecondary": {"label": "Conocer más", "routeName": "public-about"},
    },
    "stats": [],
    "featuredVehicleIds": [],
}

TESTIMONIALS = [
    {
        "id": "press-001",
        "initials": "R",
        "title": "Reseña pública",
        "outlet": "Fuente externa · Revista Ruta Norte",
        "type": "Artículo editorial",
        "source": "",
        "text": "La propuesta destaca por conectar búsqueda, ficha del vehículo y agenda sin romper el flujo visual del usuario.",
    },
    {
        "id": "press-002",
        "initials": "C",
        "title": "Comentario recopilado",
        "outlet": "Fuente externa · Cuaderno Motor",
        "type": "Columna de producto",
        "source": "",
        "text": "AutoSphere toma referencias claras del mercado automotriz digital: fichas limpias, filtros directos y pasos de contacto fáciles de entender.",
    },
    {
        "id": "press-003",
        "initials": "M",
        "title": "Mención pública",
        "outlet": "Fuente externa · Mercado Vial Hoy",
        "type": "Nota de tendencias",
        "source": "",
        "text": "Lo más fuerte es la lectura inmediata del tipo de publicación y la forma en que la cita aparece como continuación natural de la navegación.",
    },
]

STATUS_LABELS = {
    "pending": "Pendiente",
    "confirmed": "Confirmada",
    "completed": "Completada",
    "cancelled": "Cancelada",
    "rescheduled": "Reagendada",
    "active": "Activa",
    "published": "Activa",
    "draft": "Borrador",
    "archived": "Archivada",
    "sold": "Vendida",
    "unavailable": "No disponible",
    "approved": "Aprobada",
    "rejected": "Rechazada",
}

VISIBLE_PUBLIC_STATUSES = {"published", "active", "approved", "sold", "unavailable"}


def read_mock_json(*parts: str, default: Any = None) -> Any:
    path = FRONTEND_MOCKS_DIR.joinpath(*parts)
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def normalize_mode(value: str | None) -> str:
    raw = (value or "all").lower()
    if raw in {"venta", "sale"}:
        return "sale"
    if raw in {"renta", "rental"}:
        return "rental"
    return "all"




def normalize_catalog_kind(kind: str | None) -> str:
    raw = (kind or '').strip().lower()
    if raw in {'types', 'type', 'vehicle-types', 'vehicle_type', 'vehicletypes'}:
        return 'vehicle-types'
    if raw in {'locations', 'location'}:
        return 'locations'
    if raw in {'brands', 'brand'}:
        return 'brands'
    if raw in {'models', 'model'}:
        return 'models'
    return raw or 'brands'


def compute_user_surfaces(user) -> list[str]:
    if not user:
        return []
    if user.is_staff:
        return ['admin']

    surfaces: list[str] = []
    sale_count = user.listings.filter(mode='sale').count() if hasattr(user, 'listings') else 0
    rental_count = user.listings.filter(mode='rental').count() if hasattr(user, 'listings') else 0
    buyer_activity = 0
    if hasattr(user, 'saved_vehicles'):
        buyer_activity += user.saved_vehicles.count()
    if hasattr(user, 'search_history'):
        buyer_activity += user.search_history.count()
    if hasattr(user, 'buyer_appointments'):
        buyer_activity += user.buyer_appointments.count()

    if buyer_activity > 0:
        surfaces.append('buyer')
    if sale_count > 0:
        surfaces.append('seller')
    if rental_count > 0:
        surfaces.append('landlord')

    ordered = []
    for value in surfaces:
        if value and value not in ordered:
            ordered.append(value)
    return ordered

def get_roles(user) -> list[str]:
    return ["admin"] if (user and user.is_staff) else (["user"] if user and user.is_authenticated else [])


def full_name(user) -> str:
    profile = getattr(user, "profile", None)
    if user.get_full_name().strip():
        return user.get_full_name().strip()
    if profile and profile.public_id:
        return profile.public_id
    return user.email if user else ""


def user_public_id(user) -> str | None:
    if not user:
        return None
    profile = getattr(user, "profile", None)
    if profile:
        return profile.public_id
    return str(user.pk)


def avatar_url(request, profile: Profile | None) -> str | None:
    if not profile:
        return None
    if profile.avatar_url:
        return profile.avatar_url
    return None


def serialize_session(request, user, token: str | None = None) -> dict[str, Any]:
    profile = getattr(user, "profile", None)
    return {
        "isAuthenticated": True,
        "accessToken": token,
        "user": {
            "id": user_public_id(user),
            "name": full_name(user),
            "email": user.email,
            "phone": profile.phone if profile else "",
            "avatarUrl": avatar_url(request, profile),
            "roles": get_roles(user),
        },
        "roles": get_roles(user),
    }


def serialize_profile(request, user) -> dict[str, Any]:
    profile = user.profile
    first_name = user.first_name or (full_name(user).split(" ")[0] if full_name(user) else "")
    last_name = user.last_name or " ".join(full_name(user).split(" ")[1:])
    return {
        "id": profile.public_id,
        "name": full_name(user),
        "firstName": first_name,
        "lastName": last_name,
        "email": user.email,
        "phone": profile.phone,
        "city": profile.city,
        "state": profile.state,
        "bio": profile.bio,
        "avatarUrl": avatar_url(request, profile),
        "avatarPreset": profile.avatar_preset,
        "memberSince": profile.member_since.isoformat() if profile.member_since else None,
    }


def serialize_security(user) -> dict[str, Any]:
    profile = user.profile
    return {
        "passwordLastUpdatedAt": profile.password_updated_at.isoformat() if profile.password_updated_at else None,
        "recoveryEmail": user.email,
        "canChangePassword": True,
        "supportMessage": profile.support_message,
    }


def serialize_review(review: Review) -> dict[str, Any]:
    return {
        "id": review.public_id,
        "profileId": user_public_id(review.profile_user),
        "authorName": review.author_name,
        "authorRole": review.author_role,
        "rating": review.rating,
        "text": review.text,
        "createdAt": review.created_at.isoformat(),
    }


def build_seller_profile(request, user, listing_hint: Listing | None = None) -> dict[str, Any]:
    profile = user.profile
    reviews = list(user.profile_reviews.all())
    rating_average = None
    if reviews:
        rating_average = round(sum(item.rating for item in reviews) / len(reviews), 1)
    active_listings = user.listings.filter(status__in=VISIBLE_PUBLIC_STATUSES).count()
    surfaces = compute_user_surfaces(user)
    primary_surface = surfaces[0] if surfaces else ("seller" if listing_hint and listing_hint.mode == "sale" else "landlord")
    if primary_surface == 'buyer':
        primary_surface = 'seller' if listing_hint and listing_hint.mode == 'sale' else 'landlord'
    data = {
        "id": profile.public_id,
        "displayName": full_name(user),
        "verified": profile.verified,
        "city": profile.city,
        "state": profile.state,
        "bio": profile.bio,
        "memberSince": profile.member_since.isoformat() if profile.member_since else None,
        "surface": 'lessor' if primary_surface == 'landlord' else primary_surface,
        "contactEmail": user.email,
        "reviews": [serialize_review(item) for item in reviews],
        "ratingAverage": rating_average,
        "activeListings": active_listings,
    }
    if listing_hint and listing_hint.seller_profile_extra:
        allowed_keys = {
            'rating', 'ratingAverage', 'responseTime', 'responseRate', 'averageResponseTime', 'listingCount',
            'deliveryOptions', 'specialties', 'languages', 'notes', 'heroBadge', 'serviceArea'
        }
        extras = {k: v for k, v in listing_hint.seller_profile_extra.items() if k in allowed_keys and v not in (None, '')}
        data.update(extras)
        data.setdefault("ratingAverage", rating_average)
    return data


def listing_cover_url(request, listing: Listing) -> str | None:
    if listing.cover_image:
        return request.build_absolute_uri(listing.cover_image.url)
    uploaded_first = listing.uploaded_images.first()
    if uploaded_first:
        return request.build_absolute_uri(uploaded_first.image.url)
    if listing.cover_image_external_url:
        return listing.cover_image_external_url
    gallery = listing.gallery_urls or []
    return gallery[0] if gallery else None


def listing_gallery(request, listing: Listing) -> list[str]:
    uploaded = [request.build_absolute_uri(item.image.url) for item in listing.uploaded_images.all()]
    gallery = [url for url in (listing.gallery_urls or []) if url]
    cover = [listing_cover_url(request, listing)] if listing_cover_url(request, listing) else []
    ordered = []
    for url in [*uploaded, *gallery, *cover]:
        if url and url not in ordered:
            ordered.append(url)
    return ordered


def serialize_listing(request, listing: Listing) -> dict[str, Any]:
    seller_profile = build_seller_profile(request, listing.seller, listing)
    city = None
    if listing.city_id or listing.city_name:
        city = {
            "id": listing.city_id or None,
            "name": listing.city_name or listing.location.get("city") if listing.location else listing.city_name,
            "state": listing.state_name or listing.location.get("state") if listing.location else listing.state_name,
        }
    data = {
        "id": listing.public_id,
        "title": listing.title,
        "brand": listing.brand,
        "model": listing.model,
        "year": listing.year,
        "type": listing.type or listing.category,
        "category": listing.category or listing.type,
        "mode": listing.mode,
        "status": listing.status,
        "transmission": listing.transmission,
        "fuel": listing.fuel,
        "mileageKm": listing.mileage_km,
        "cityId": listing.city_id,
        "city": city,
        "cityLabel": ", ".join(part for part in [listing.city_name or (city or {}).get("name"), listing.state_name or (city or {}).get("state")] if part),
        "sellerId": user_public_id(listing.seller),
        "sellerProfile": seller_profile,
        "sellerDisplayName": seller_profile.get("displayName"),
        "coverImage": listing_cover_url(request, listing),
        "gallery": listing_gallery(request, listing),
        "description": listing.description,
        "location": listing.location or {},
        "features": listing.features or [],
        "specs": listing.specs or {},
        "color": listing.color,
        "price": listing.price,
        "pricePerDay": listing.price_per_day,
        "pricePerWeek": listing.price_per_week,
        "pricePerMonth": listing.price_per_month,
        "depositAmount": listing.deposit_amount,
        "kmIncludedPerDay": listing.km_included_per_day,
        "availableFrom": listing.available_from.isoformat() if listing.available_from else None,
        "availableTo": listing.available_to.isoformat() if listing.available_to else None,
        "available": listing.available,
        "vinMasked": listing.vin_masked,
        "doors": listing.doors,
        "seats": listing.seats,
        "engine": listing.engine,
        "traction": listing.traction,
        "views": listing.views,
        "messages": listing.messages,
        "createdAt": listing.created_at.isoformat() if listing.created_at else None,
        "updatedAt": listing.updated_at.isoformat() if listing.updated_at else None,
        "sellerName": full_name(listing.seller),
        "sellerEmail": listing.seller.email,
        "sellerPhone": getattr(listing.seller.profile, "phone", ""),
        "cityName": listing.city_name,
    }
    if listing.mode == "rental":
        data["rentalSpecs"] = {
            "pricePerDay": listing.price_per_day,
            "pricePerWeek": listing.price_per_week,
            "pricePerMonth": listing.price_per_month,
            "depositAmount": listing.deposit_amount,
            "kmIncludedPerDay": listing.km_included_per_day,
            "availableFrom": data["availableFrom"],
            "availableTo": data["availableTo"],
            "available": listing.available,
            "includedItems": listing.features or [],
        }
    return data


def appointment_timeline(status: str, date: str | None, time: str | None) -> list[dict[str, Any]]:
    stamp = f"{date}T{time or '09:00'}:00" if date else None
    confirmation_status = "pending" if status == "pending" else "done"
    visit_status = "pending" if status == "cancelled" else "scheduled"
    return [
        {"label": "Solicitud creada", "timestamp": stamp, "status": "done"},
        {"label": "Confirmación", "timestamp": stamp, "status": confirmation_status},
        {"label": "Visita programada", "timestamp": stamp, "status": visit_status},
    ]


def serialize_appointment(request, appointment: Appointment) -> dict[str, Any]:
    buyer = appointment.buyer
    seller = appointment.seller or appointment.listing.seller if appointment.listing else None
    listing = appointment.listing
    date_value = appointment.date.isoformat() if appointment.date else None
    time_value = appointment.time.strftime("%H:%M") if appointment.time else None
    return {
        "id": appointment.public_id,
        "listingId": listing.public_id if listing else None,
        "listingTitle": listing.title if listing else "Vehículo seleccionado",
        "listingPrice": listing.price if listing else 0,
        "buyerId": user_public_id(buyer),
        "buyerName": appointment.buyer_name or (full_name(buyer) if buyer else "Cliente AutoSphere"),
        "buyerPhone": appointment.buyer_phone or (buyer.profile.phone if buyer and hasattr(buyer, "profile") else ""),
        "buyerEmail": appointment.buyer_email or (buyer.email if buyer else ""),
        "sellerId": user_public_id(seller),
        "sellerName": appointment.seller_name or (full_name(seller) if seller else "AutoSphere"),
        "sellerPhone": appointment.seller_phone or (seller.profile.phone if seller and hasattr(seller, "profile") else ""),
        "sellerEmail": appointment.seller_email or (seller.email if seller else ""),
        "status": appointment.status,
        "date": date_value,
        "time": time_value,
        "type": appointment.appointment_type,
        "location": appointment.location_label,
        "address": appointment.location_label,
        "locationLabel": appointment.location_label,
        "notes": appointment.notes,
        "cancelReason": appointment.cancel_reason,
        "buyer": {
            "id": user_public_id(buyer),
            "name": appointment.buyer_name or (full_name(buyer) if buyer else "Cliente AutoSphere"),
            "phone": appointment.buyer_phone or (buyer.profile.phone if buyer and hasattr(buyer, "profile") else ""),
            "email": appointment.buyer_email or (buyer.email if buyer else ""),
        }
        if (buyer or appointment.buyer_name)
        else None,
        "seller": {
            "id": user_public_id(seller),
            "name": appointment.seller_name or (full_name(seller) if seller else "AutoSphere"),
            "phone": appointment.seller_phone or (seller.profile.phone if seller and hasattr(seller, "profile") else ""),
            "email": appointment.seller_email or (seller.email if seller else ""),
        }
        if seller
        else None,
        "timeline": appointment_timeline(appointment.status, date_value, time_value),
        "sourceTab": "rentador" if listing and listing.mode == "rental" else "comprador",
        "year": listing.year if listing else None,
        "tipo": "renta" if listing and listing.mode == "rental" else "venta",
        "createdAt": appointment.created_at.isoformat() if appointment.created_at else None,
        "updatedAt": appointment.updated_at.isoformat() if appointment.updated_at else None,
    }


def calendar_payload(request, appointments: list[Appointment]) -> dict[str, Any]:
    result: dict[str, Any] = {
        "comprador": {"stats": {}, "appointments": []},
        "vendedor": {"stats": {}, "appointments": []},
        "rentador": {"stats": {}, "appointments": []},
    }
    for appointment in appointments:
        serialized = serialize_appointment(request, appointment)
        listing_mode = appointment.listing.mode if appointment.listing else "sale"
        if listing_mode == "rental":
            tab = "rentador"
        else:
            tab = "comprador"
        result[tab]["appointments"].append(
            {
                "id": serialized["id"],
                "vehicle": serialized["listingTitle"],
                "listingTitle": serialized["listingTitle"],
                "listingId": serialized["listingId"],
                "date": serialized["date"],
                "time": serialized["time"],
                "address": serialized["locationLabel"],
                "locationLabel": serialized["locationLabel"],
                "status": STATUS_LABELS.get(serialized["status"], serialized["status"]),
                "statusKey": serialized["status"],
                "buyer": serialized["buyer"],
                "seller": serialized["seller"],
                "client": serialized["buyerName"],
                "notes": serialized["notes"],
                "year": serialized["year"],
                "tipo": serialized["tipo"],
            }
        )
        if appointment.seller_id:
            seller_tab = "rentador" if listing_mode == "rental" else "vendedor"
            result[seller_tab]["appointments"].append(
                {
                    "id": serialized["id"],
                    "vehicle": serialized["listingTitle"],
                    "listingTitle": serialized["listingTitle"],
                    "listingId": serialized["listingId"],
                    "date": serialized["date"],
                    "time": serialized["time"],
                    "address": serialized["locationLabel"],
                    "locationLabel": serialized["locationLabel"],
                    "status": STATUS_LABELS.get(serialized["status"], serialized["status"]),
                    "statusKey": serialized["status"],
                    "buyer": serialized["buyer"],
                    "seller": serialized["seller"],
                    "client": serialized["buyerName"],
                    "notes": serialized["notes"],
                    "year": serialized["year"],
                    "tipo": serialized["tipo"],
                }
            )
    for tab, payload in result.items():
        items = payload["appointments"]
        payload["stats"] = {
            "total": len(items),
            "pending": sum(1 for item in items if item["statusKey"] == "pending"),
            "confirmed": sum(1 for item in items if item["statusKey"] == "confirmed"),
            "completed": sum(1 for item in items if item["statusKey"] == "completed"),
        }
    return result


def parse_iso_date(value: str | None):
    if not value:
        return None
    return datetime.fromisoformat(value).date()


def parse_iso_time(value: str | None):
    if not value:
        return None
    return datetime.strptime(value, "%H:%M").time()


def generate_prefixed_id(prefix: str) -> str:
    return f"{prefix}-{timezone.now().strftime('%Y%m%d%H%M%S%f')}"
