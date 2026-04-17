from __future__ import annotations

import json
from copy import deepcopy
from datetime import date, datetime, time
from pathlib import Path

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.utils import timezone

from autosphere_api.models import (
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

User = get_user_model()
ROOT_DIR = Path(__file__).resolve().parents[4]
MOCKS = ROOT_DIR / "frontend" / "src" / "mocks"


def load_json(*parts, default=None):
    path = MOCKS.joinpath(*parts)
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def parse_dt(value):
    if not value:
        return None
    if "T" in value:
        dt = datetime.fromisoformat(value)
    else:
        dt = datetime.fromisoformat(f"{value}T12:00:00")
    if timezone.is_naive(dt):
        dt = timezone.make_aware(dt, timezone.get_current_timezone())
    return dt


def parse_date(value):
    if not value:
        return None
    return datetime.fromisoformat(value).date()


class Command(BaseCommand):
    help = "Seed local demo data for AutoSphere"

    def handle(self, *args, **options):
        self.stdout.write("Seeding AutoSphere demo data...")

        ListingImage.objects.all().delete()
        SavedVehicle.objects.all().delete()
        SearchHistory.objects.all().delete()
        Appointment.objects.all().delete()
        Review.objects.all().delete()
        Listing.objects.all().delete()
        CatalogEntry.objects.all().delete()
        AdminReport.objects.all().delete()
        AdminSuspension.objects.all().delete()
        ContactSubmission.objects.all().delete()
        Profile.objects.all().delete()
        User.objects.all().delete()

        public_profiles = load_json("shared", "public-profiles.json", default={}) or {}
        shared_users = {item["id"]: item for item in load_json("shared", "users.json", default=[]) or []}
        listings_index = load_json("catalog", "listings.json", default={}).get("items", [])
        listings_detail = load_json("catalog", "listing-details.json", default={}) or {}
        rentals_index = load_json("catalog", "rentals.json", default={}).get("items", [])
        rentals_detail = load_json("catalog", "rental-details.json", default={}) or {}
        appointments_seed = load_json("appointments", "appointments.json", default=[]) or []
        appointment_details = load_json("appointments", "appointment-details.json", default={}) or {}

        users_by_public_id = {}

        def make_user(
            public_id,
            name,
            email,
            *,
            password="User123!",
            is_staff=False,
            verified=True,
            city="",
            state="",
            bio="",
            surface="buyer",
            phone="",
            member_since=None,
        ):
            first, _, last = name.partition(" ")
            user = User.objects.create_user(
                username=email,
                email=email,
                password=password,
                first_name=first,
                last_name=last,
                is_staff=is_staff,
                is_superuser=is_staff,
            )
            Profile.objects.create(
                user=user,
                public_id=public_id,
                phone=phone,
                city=city,
                state=state,
                bio=bio,
                avatar_preset="aurora",
                verified=verified,
                member_since=parse_date(member_since) or date(2024, 1, 1),
                primary_surface=surface,
                password_updated_at=timezone.now(),
            )
            users_by_public_id[public_id] = user
            return user

        def profile_seed(public_id):
            return public_profiles.get(public_id) or {}

        # Core demo identities
        admin_user = make_user(
            "u-admin-001",
            "Ana Admin",
            "admin@autosphere.local",
            password="Admin123!",
            is_staff=True,
            verified=True,
            city="Ciudad de México",
            state="CDMX",
            bio="Administra operaciones, moderación y catálogos de AutoSphere.",
            surface="admin",
            phone="55 1000 0000",
            member_since="2023-12-31",
        )
        self.stdout.write("✓ Users: admin")

        demo_user = make_user(
            "u-demo-001",
            "Carlos Méndez",
            "user@autosphere.local",
            password="User123!",
            verified=True,
            city="Ciudad de México",
            state="CDMX",
            bio="Cuenta demo con superficies activas de comprador, vendedor y arrendador.",
            surface="buyer",
            phone="55 5555 0101",
            member_since="2024-01-15",
        )

        mariana = make_user(
            "u-buyer-001",
            "Mariana López",
            "mariana@example.com",
            password="Mariana123!",
            phone="55 5555 0101",
            city="Ciudad de México",
            state="CDMX",
            bio="Compradora activa con citas y vehículos guardados.",
            surface="buyer",
            member_since="2024-01-14",
        )
        make_user(
            "u-buyer-002",
            "Daniela Pérez",
            "daniela@example.com",
            password="Daniela123!",
            phone="55 5555 0102",
            city="Ciudad de México",
            state="CDMX",
            bio="Compradora recurrente de AutoSphere.",
            surface="buyer",
            member_since="2024-01-14",
        )
        sofia = make_user(
            "u-buyer-003",
            "Sofía Reyes",
            "sofia@autosphere.local",
            password="Sofia123!",
            phone="55 5555 0103",
            city="Puebla",
            state="Puebla",
            bio="Cuenta realista para probar favoritos y anuncios en borrador.",
            surface="buyer",
            member_since="2024-02-20",
        )
        make_user(
            "u-buyer-004",
            "Nuevo Usuario",
            "nuevo@autosphere.local",
            password="Nuevo123!",
            phone="",
            city="",
            state="",
            bio="Cuenta recién creada sin actividad todavía.",
            surface="buyer",
            member_since="2026-04-17",
        )

        # Marketplace businesses / lessors from the shared mock identity layer
        for public_id in [
            "u-seller-001",
            "u-seller-002",
            "u-lessor-001",
            "u-seller-rent-001",
            "u-seller-rent-002",
            "u-seller-rent-003",
            "u-seller-rent-004",
            "u-seller-rent-005",
        ]:
            seed_profile = profile_seed(public_id)
            seed_user = shared_users.get(public_id, {})
            make_user(
                public_id,
                seed_profile.get("displayName") or seed_user.get("name") or public_id,
                seed_user.get("email") or f"{public_id}@autosphere.local",
                password=("Seller123!" if seed_profile.get("surface") == "seller" else "Rent1234!"),
                phone="55 7000 0000",
                city=seed_profile.get("city", ""),
                state=seed_profile.get("state", ""),
                bio=seed_profile.get("bio", ""),
                surface=(seed_profile.get("surface") or "seller"),
                member_since=seed_profile.get("memberSince"),
                verified=seed_profile.get("verified", True),
            )
        self.stdout.write(f"✓ Users ({Profile.objects.count()} profiles total)")

        def owner_for_seed(seed, detail, *, fallback=None):
            seller_id = (
                detail.get("sellerId")
                or seed.get("sellerId")
                or (detail.get("sellerProfile") or {}).get("id")
                or (seed.get("sellerProfile") or {}).get("id")
            )
            return users_by_public_id.get(seller_id) or fallback or demo_user

        def create_listing(seed, detail, *, mode, owner=None):
            location = detail.get("location") or {}
            rental_specs = detail.get("rentalSpecs") or {}
            listing = Listing.objects.create(
                public_id=seed["id"],
                seller=owner or owner_for_seed(seed, detail),
                mode=mode,
                status=detail.get("status") or seed.get("status") or "published",
                title=detail.get("title") or seed.get("title"),
                brand=detail.get("brand") or seed.get("brand", ""),
                model=detail.get("model") or seed.get("model", ""),
                year=detail.get("year") or seed.get("year"),
                type=detail.get("type") or seed.get("type", ""),
                category=detail.get("type") or seed.get("type", ""),
                transmission=detail.get("transmission") or seed.get("transmission", ""),
                fuel=detail.get("fuel") or seed.get("fuel", ""),
                mileage_km=detail.get("mileageKm") or seed.get("mileageKm"),
                color=detail.get("color") or seed.get("color", ""),
                city_id=detail.get("cityId") or seed.get("cityId", ""),
                city_name=location.get("city", ""),
                state_name=location.get("state", ""),
                cover_image_external_url=detail.get("coverImage") or seed.get("coverImage", ""),
                price=detail.get("price") or seed.get("price") or 0,
                price_per_day=rental_specs.get("pricePerDay") or seed.get("pricePerDay"),
                price_per_week=rental_specs.get("pricePerWeek") or seed.get("pricePerWeek"),
                price_per_month=rental_specs.get("pricePerMonth") or seed.get("pricePerMonth"),
                deposit_amount=rental_specs.get("depositAmount") or seed.get("depositAmount"),
                km_included_per_day=rental_specs.get("kmIncludedPerDay") or seed.get("kmIncludedPerDay"),
                available_from=parse_date(rental_specs.get("availableFrom") or seed.get("availableFrom")),
                available_to=parse_date(rental_specs.get("availableTo") or seed.get("availableTo")),
                available=rental_specs.get("available", seed.get("available", True)),
                description=detail.get("description", ""),
                vin_masked=detail.get("vinMasked", ""),
                doors=detail.get("doors"),
                seats=detail.get("seats"),
                engine=detail.get("engine", ""),
                traction=detail.get("traction", ""),
                location=location,
                gallery_urls=detail.get("gallery") or [],
                features=rental_specs.get("includedItems") or detail.get("features") or [],
                specs=detail.get("specs") or {},
                seller_profile_extra=detail.get("sellerProfile") or {},
                views=detail.get("views", seed.get("views", 0)) or 0,
                messages=detail.get("messages", seed.get("messages", 0)) or 0,
            )
            if mode == "rental" and listing.status == "published" and not listing.available:
                listing.status = "unavailable"
                listing.save(update_fields=["status"])
            return listing

        listings_by_id = {}
        for seed in listings_index:
            detail = listings_detail.get(seed["id"], {})
            listings_by_id[seed["id"]] = create_listing(seed, detail, mode="sale")

        for seed in rentals_index:
            detail = rentals_detail.get(seed["id"], {})
            listings_by_id[seed["id"]] = create_listing(seed, detail, mode="rental")

        # Add coherent personal demo inventory instead of hijacking marketplace vendors
        demo_sale_seeds = [
            {
                "id": "vh-101",
                "title": "Mazda CX-5 Signature 2022",
                "brand": "Mazda",
                "model": "CX-5",
                "year": 2022,
                "price": 569000,
                "type": "SUV",
                "transmission": "Automática",
                "fuel": "Gasolina",
                "mileageKm": 24800,
                "cityId": "mx-cdmx",
                "coverImage": "https://images.unsplash.com/photo-1549399812-1d87fd4a2a28",
                "status": "published",
                "color": "Rojo",
            },
            {
                "id": "vh-102",
                "title": "Cupra Formentor 2023",
                "brand": "Cupra",
                "model": "Formentor",
                "year": 2023,
                "price": 689000,
                "type": "SUV",
                "transmission": "Automática",
                "fuel": "Gasolina",
                "mileageKm": 18200,
                "cityId": "mx-cdmx",
                "coverImage": "https://images.unsplash.com/photo-1502877338535-766e1452684a",
                "status": "published",
                "color": "Azul",
            },
        ]
        demo_sale_details = {
            "vh-101": {
                "location": {
                    "city": "Ciudad de México",
                    "state": "CDMX",
                    "addressLabel": "Polanco · entrega por cita",
                },
                "gallery": [
                    "https://images.unsplash.com/photo-1549399812-1d87fd4a2a28",
                    "https://images.unsplash.com/photo-1549399812-1d87fd4a2a28?2",
                ],
                "description": "SUV premium con historial de agencia, factura original y opción de revisión mecánica por cita.",
                "sellerProfile": {"responseTime": "Menos de 1 hora", "ratingAverage": 4.9},
                "specs": {"tracción": "AWD", "interior": "Piel negra"},
            },
            "vh-102": {
                "location": {
                    "city": "Ciudad de México",
                    "state": "CDMX",
                    "addressLabel": "Santa Fe · showings privados",
                },
                "gallery": [
                    "https://images.unsplash.com/photo-1502877338535-766e1452684a",
                    "https://images.unsplash.com/photo-1502877338535-766e1452684a?2",
                ],
                "description": "Formentor con paquete de asistencias, llantas nuevas y documentación lista para cambio de propietario.",
                "sellerProfile": {"responseTime": "Mismo día", "ratingAverage": 4.8},
                "specs": {"tracción": "Delantera", "sonido": "Beats"},
            },
        }
        demo_rental_seeds = [
            {
                "id": "rt-101",
                "title": "MINI Cooper S 2023",
                "brand": "MINI",
                "model": "Cooper S",
                "year": 2023,
                "type": "Hatchback",
                "transmission": "Automática",
                "fuel": "Gasolina",
                "cityId": "mx-cdmx",
                "coverImage": "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
                "pricePerDay": 1450,
                "pricePerWeek": 8700,
                "pricePerMonth": 27900,
                "depositAmount": 12000,
                "kmIncludedPerDay": 220,
                "availableFrom": "2026-04-20",
                "availableTo": "2026-12-31",
                "available": True,
                "status": "published",
            },
            {
                "id": "rt-102",
                "title": "BMW X1 2024",
                "brand": "BMW",
                "model": "X1",
                "year": 2024,
                "type": "SUV",
                "transmission": "Automática",
                "fuel": "Gasolina",
                "cityId": "mx-cdmx",
                "coverImage": "https://images.unsplash.com/photo-1553440569-bcc63803a83d",
                "pricePerDay": 2100,
                "pricePerWeek": 12600,
                "pricePerMonth": 39900,
                "depositAmount": 18000,
                "kmIncludedPerDay": 250,
                "availableFrom": "2026-04-18",
                "availableTo": "2026-10-31",
                "available": True,
                "status": "published",
            },
            {
                "id": "rt-103",
                "title": "BYD Dolphin 2024",
                "brand": "BYD",
                "model": "Dolphin",
                "year": 2024,
                "type": "Hatchback",
                "transmission": "Automática",
                "fuel": "Eléctrico",
                "cityId": "mx-cdmx",
                "coverImage": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
                "pricePerDay": 1350,
                "pricePerWeek": 7900,
                "pricePerMonth": 24900,
                "depositAmount": 9000,
                "kmIncludedPerDay": 240,
                "availableFrom": "2026-05-01",
                "availableTo": "2026-12-31",
                "available": False,
                "status": "published",
            },
        ]
        demo_rental_details = {
            "rt-101": {
                "location": {"city": "Ciudad de México", "state": "CDMX", "addressLabel": "Condesa · entrega flexible"},
                "gallery": [
                    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
                    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?2",
                ],
                "description": "Compacto premium para renta urbana, ideal para fines de semana y visitas ejecutivas.",
                "rentalSpecs": {"pricePerDay": 1450, "pricePerWeek": 8700, "pricePerMonth": 27900, "depositAmount": 12000, "kmIncludedPerDay": 220, "availableFrom": "2026-04-20", "availableTo": "2026-12-31", "available": True, "includedItems": ["Seguro básico", "Tag urbano"]},
                "sellerProfile": {"responseTime": "30 minutos", "ratingAverage": 4.9},
            },
            "rt-102": {
                "location": {"city": "Ciudad de México", "state": "CDMX", "addressLabel": "Roma Norte · sucursal premium"},
                "gallery": [
                    "https://images.unsplash.com/photo-1553440569-bcc63803a83d",
                    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?2",
                ],
                "description": "SUV ejecutiva disponible por semana o mes con validación documental rápida.",
                "rentalSpecs": {"pricePerDay": 2100, "pricePerWeek": 12600, "pricePerMonth": 39900, "depositAmount": 18000, "kmIncludedPerDay": 250, "availableFrom": "2026-04-18", "availableTo": "2026-10-31", "available": True, "includedItems": ["Seguro ampliado", "Entrega en oficina"]},
                "sellerProfile": {"responseTime": "1 hora", "ratingAverage": 4.8},
            },
            "rt-103": {
                "location": {"city": "Ciudad de México", "state": "CDMX", "addressLabel": "Del Valle · unidad reservada"},
                "gallery": [
                    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
                    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?2",
                ],
                "description": "Eléctrico para uso corporativo y urbano. Actualmente fuera de disponibilidad por contrato activo.",
                "rentalSpecs": {"pricePerDay": 1350, "pricePerWeek": 7900, "pricePerMonth": 24900, "depositAmount": 9000, "kmIncludedPerDay": 240, "availableFrom": "2026-05-01", "availableTo": "2026-12-31", "available": False, "includedItems": ["Cable de carga", "Seguro básico"]},
                "sellerProfile": {"responseTime": "2 horas", "ratingAverage": 4.7},
            },
        }

        for seed in demo_sale_seeds:
            listings_by_id[seed["id"]] = create_listing(seed, demo_sale_details[seed["id"]], mode="sale", owner=demo_user)
        for seed in demo_rental_seeds:
            listings_by_id[seed["id"]] = create_listing(seed, demo_rental_details[seed["id"]], mode="rental", owner=demo_user)

        # Sofía with one private draft listing to make admin/user surfaces more interesting
        sofia_draft_seed = {
            "id": "vh-201",
            "title": "Peugeot 208 Allure 2021",
            "brand": "Peugeot",
            "model": "208",
            "year": 2021,
            "price": 312000,
            "type": "Hatchback",
            "transmission": "Automática",
            "fuel": "Gasolina",
            "mileageKm": 33800,
            "cityId": "mx-pue",
            "coverImage": "https://images.unsplash.com/photo-1489824904134-891ab64532f1",
            "status": "draft",
            "color": "Gris",
        }
        sofia_draft_detail = {
            "location": {"city": "Puebla", "state": "Puebla", "addressLabel": "Zona Angelópolis · por confirmar"},
            "gallery": ["https://images.unsplash.com/photo-1489824904134-891ab64532f1"],
            "description": "Publicación en preparación con documentación pendiente de cargar.",
            "sellerProfile": {"responseTime": "Durante el día"},
        }
        listings_by_id[sofia_draft_seed["id"]] = create_listing(sofia_draft_seed, sofia_draft_detail, mode="sale", owner=sofia)
        self.stdout.write(f"✓ Listings: {Listing.objects.count()} total")

        reviews_seed = load_json("shared", "reviews.json", default=[]) or []
        for item in reviews_seed:
            profile_user = users_by_public_id.get(item["profileId"])
            if not profile_user:
                continue
            Review.objects.create(
                public_id=item["id"],
                profile_user=profile_user,
                author_name=item["authorName"],
                author_role=item.get("authorRole", ""),
                rating=item.get("rating", 5),
                text=item.get("text", ""),
                created_at=parse_date(item["createdAt"]),
            )
        # A real review for Carlos
        Review.objects.create(
            public_id="rv-demo-001",
            profile_user=demo_user,
            author_name="Mariana López",
            author_role="Compradora",
            rating=5,
            text="Carlos respondió rápido, mostró el auto tal cual estaba anunciado y la cita fue muy clara.",
            created_at=date(2026, 4, 15),
        )
        self.stdout.write(f"✓ Reviews: {Review.objects.count()}")

        for item in appointments_seed:
            detail = appointment_details.get(item["id"], {})
            listing = listings_by_id.get(item.get("listingId"))
            buyer = users_by_public_id.get(item.get("buyerId")) or mariana
            seller = users_by_public_id.get(item.get("sellerId")) or (listing.seller if listing else demo_user)
            Appointment.objects.create(
                public_id=item["id"],
                listing=listing,
                buyer=buyer,
                seller=seller,
                status=item.get("status", "pending"),
                date=parse_date(item.get("date")),
                time=datetime.strptime(item.get("time", "09:00"), "%H:%M").time(),
                location_label=item.get("locationLabel", ""),
                notes=item.get("notes", ""),
                appointment_type=detail.get("type") or "test-drive",
                buyer_name=detail.get("buyerName") or buyer.get_full_name() or "Cliente AutoSphere",
                buyer_email=detail.get("buyerEmail") or buyer.email,
                buyer_phone=detail.get("buyerPhone") or buyer.profile.phone,
                seller_name=detail.get("sellerName") or seller.get_full_name() or "AutoSphere",
                seller_email=detail.get("sellerEmail") or seller.email,
                seller_phone=detail.get("sellerPhone") or seller.profile.phone,
            )

        # Carlos-specific appointments across buyer and seller surfaces
        Appointment.objects.create(
            public_id="ap-demo-001",
            listing=listings_by_id["vh-101"],
            buyer=mariana,
            seller=demo_user,
            status="confirmed",
            date=date(2026, 4, 20),
            time=time(11, 0),
            location_label="Polanco · entrega por cita",
            notes="Revisión general y prueba corta.",
            appointment_type="test-drive",
            buyer_name=mariana.get_full_name(),
            buyer_email=mariana.email,
            buyer_phone=mariana.profile.phone,
            seller_name=demo_user.get_full_name(),
            seller_email=demo_user.email,
            seller_phone=demo_user.profile.phone,
        )
        Appointment.objects.create(
            public_id="ap-demo-002",
            listing=listings_by_id["rt-101"],
            buyer=demo_user,
            seller=users_by_public_id["u-seller-rent-001"],
            status="pending",
            date=date(2026, 4, 22),
            time=time(16, 30),
            location_label="Sucursal CDMX Centro",
            notes="Validar condiciones de renta mensual.",
            appointment_type="rental-visit",
            buyer_name=demo_user.get_full_name(),
            buyer_email=demo_user.email,
            buyer_phone=demo_user.profile.phone,
            seller_name=users_by_public_id["u-seller-rent-001"].get_full_name(),
            seller_email=users_by_public_id["u-seller-rent-001"].email,
            seller_phone=users_by_public_id["u-seller-rent-001"].profile.phone,
        )
        self.stdout.write(f"✓ Appointments: {Appointment.objects.count()}")

        for public_id in ["vh-003", "rt-001", "vh-101"]:
            if public_id in listings_by_id:
                SavedVehicle.objects.get_or_create(user=demo_user, listing=listings_by_id[public_id])
        for public_id in ["vh-101", "rt-102"]:
            if public_id in listings_by_id:
                SavedVehicle.objects.get_or_create(user=mariana, listing=listings_by_id[public_id])
        SavedVehicle.objects.get_or_create(user=sofia, listing=listings_by_id["vh-003"])
        self.stdout.write(f"✓ Saved vehicles: {SavedVehicle.objects.count()}")

        for entry in [
            {
                "id": "sh-demo-001",
                "user": demo_user,
                "query": "SUV automáticas CDMX",
                "resultCount": 7,
                "filtersSummary": "Venta · SUV · 2021+",
                "timestamp": "2026-04-16T19:22:00",
            },
            {
                "id": "sh-demo-002",
                "user": demo_user,
                "query": "Rentas mensuales CDMX",
                "resultCount": 5,
                "filtersSummary": "Renta · mensual · CDMX",
                "timestamp": "2026-04-15T12:10:00",
            },
            {
                "id": "sh-demo-003",
                "user": mariana,
                "query": "Mazda CX-5 2022",
                "resultCount": 2,
                "filtersSummary": "Venta · Mazda · CDMX",
                "timestamp": "2026-04-14T08:41:00",
            },
            {
                "id": "sh-demo-004",
                "user": sofia,
                "query": "Hatchback Puebla",
                "resultCount": 3,
                "filtersSummary": "Venta · Hatchback · Puebla",
                "timestamp": "2026-04-13T17:05:00",
            },
        ]:
            SearchHistory.objects.create(
                public_id=entry["id"],
                user=entry["user"],
                query=entry["query"],
                result_count=entry["resultCount"],
                filters_summary=entry["filtersSummary"],
                timestamp=parse_dt(entry["timestamp"]) or timezone.now(),
            )
        self.stdout.write(f"✓ Search history: {SearchHistory.objects.count()}")

        for kind, filename in [
            ("brands", "brands.json"),
            ("models", "models.json"),
            ("vehicle-types", "vehicle-types.json"),
            ("locations", "locations.json"),
        ]:
            data = load_json("admin", filename, default={}).get("items", [])
            for item in data:
                CatalogEntry.objects.create(public_id=item["id"], kind=kind, data=item)
        self.stdout.write(
            f"✓ Catalogs: {CatalogEntry.objects.filter(kind='brands').count()} brands, "
            f"{CatalogEntry.objects.filter(kind='models').count()} models, "
            f"{CatalogEntry.objects.filter(kind='vehicle-types').count()} types, "
            f"{CatalogEntry.objects.filter(kind='locations').count()} locations"
        )

        for item in load_json("admin", "reports.json", default={}).get("items", []):
            AdminReport.objects.create(public_id=item["id"], data=item)
        for item in load_json("admin", "suspensions.json", default={}).get("items", []):
            AdminSuspension.objects.create(public_id=item["id"], data=item)
        self.stdout.write(f"✓ Reports: {AdminReport.objects.count()} · Suspensions: {AdminSuspension.objects.count()}")

        self.stdout.write(self.style.SUCCESS("seed complete!"))
        self.stdout.write("\nCredentials:")
        self.stdout.write("admin@autosphere.local / Admin123!   (admin)")
        self.stdout.write("user@autosphere.local / User123!     (Carlos Méndez · buyer + seller + landlord)")
        self.stdout.write("mariana@example.com / Mariana123!    (buyer)")
        self.stdout.write("sofia@autosphere.local / Sofia123!   (buyer + 1 draft listing)")
        self.stdout.write("nuevo@autosphere.local / Nuevo123!   (fresh account)")
