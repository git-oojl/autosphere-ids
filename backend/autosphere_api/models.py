from django.conf import settings
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    public_id = models.CharField(max_length=64, unique=True)
    phone = models.CharField(max_length=64, blank=True)
    city = models.CharField(max_length=128, blank=True)
    state = models.CharField(max_length=128, blank=True)
    bio = models.TextField(blank=True)
    avatar_preset = models.CharField(max_length=32, default="aurora")
    avatar_url = models.TextField(blank=True, null=True)
    verified = models.BooleanField(default=False)
    member_since = models.DateField(null=True, blank=True)
    primary_surface = models.CharField(max_length=32, default="buyer")
    support_message = models.TextField(
        blank=True,
        default="Mantén este correo actualizado para recuperar acceso y recibir avisos importantes de la cuenta.",
    )
    password_updated_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.public_id} - {self.user.get_full_name() or self.user.email}"


class Listing(models.Model):
    public_id = models.CharField(max_length=64, unique=True)
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="listings")
    mode = models.CharField(max_length=16, default="sale")
    status = models.CharField(max_length=32, default="published")
    title = models.CharField(max_length=255)
    brand = models.CharField(max_length=128, blank=True)
    model = models.CharField(max_length=128, blank=True)
    year = models.IntegerField(null=True, blank=True)
    type = models.CharField(max_length=128, blank=True)
    category = models.CharField(max_length=128, blank=True)
    transmission = models.CharField(max_length=128, blank=True)
    fuel = models.CharField(max_length=128, blank=True)
    mileage_km = models.IntegerField(null=True, blank=True)
    color = models.CharField(max_length=64, blank=True)
    city_id = models.CharField(max_length=64, blank=True)
    city_name = models.CharField(max_length=128, blank=True)
    state_name = models.CharField(max_length=128, blank=True)
    cover_image = models.ImageField(upload_to="listings/cover/", blank=True, null=True)
    cover_image_external_url = models.URLField(blank=True)
    price = models.IntegerField(default=0)
    price_per_day = models.IntegerField(null=True, blank=True)
    price_per_week = models.IntegerField(null=True, blank=True)
    price_per_month = models.IntegerField(null=True, blank=True)
    deposit_amount = models.IntegerField(null=True, blank=True)
    km_included_per_day = models.IntegerField(null=True, blank=True)
    available_from = models.DateField(null=True, blank=True)
    available_to = models.DateField(null=True, blank=True)
    available = models.BooleanField(default=True)
    description = models.TextField(blank=True)
    vin_masked = models.CharField(max_length=64, blank=True)
    doors = models.IntegerField(null=True, blank=True)
    seats = models.IntegerField(null=True, blank=True)
    engine = models.CharField(max_length=64, blank=True)
    traction = models.CharField(max_length=64, blank=True)
    location = models.JSONField(default=dict, blank=True)
    gallery_urls = models.JSONField(default=list, blank=True)
    features = models.JSONField(default=list, blank=True)
    specs = models.JSONField(default=dict, blank=True)
    seller_profile_extra = models.JSONField(default=dict, blank=True)
    views = models.IntegerField(default=0)
    messages = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at", "public_id"]

    def __str__(self):
        return self.public_id


class ListingImage(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="uploaded_images")
    image = models.ImageField(upload_to="listings/gallery/")
    created_at = models.DateTimeField(auto_now_add=True)


class Review(models.Model):
    public_id = models.CharField(max_length=64, unique=True)
    profile_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile_reviews")
    author_name = models.CharField(max_length=128)
    author_role = models.CharField(max_length=64, blank=True)
    rating = models.PositiveSmallIntegerField(default=5)
    text = models.TextField()
    created_at = models.DateField()

    class Meta:
        ordering = ["-created_at", "public_id"]


class Appointment(models.Model):
    public_id = models.CharField(max_length=64, unique=True)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="appointments", null=True, blank=True)
    buyer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name="buyer_appointments", null=True, blank=True)
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name="seller_appointments", null=True, blank=True)
    status = models.CharField(max_length=32, default="pending")
    date = models.DateField(null=True, blank=True)
    time = models.TimeField(null=True, blank=True)
    location_label = models.CharField(max_length=255, blank=True)
    notes = models.TextField(blank=True)
    cancel_reason = models.TextField(blank=True)
    appointment_type = models.CharField(max_length=64, default="test-drive")
    buyer_name = models.CharField(max_length=128, blank=True)
    buyer_email = models.EmailField(blank=True)
    buyer_phone = models.CharField(max_length=64, blank=True)
    seller_name = models.CharField(max_length=128, blank=True)
    seller_email = models.EmailField(blank=True)
    seller_phone = models.CharField(max_length=64, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["date", "time", "public_id"]


class SavedVehicle(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="saved_vehicles")
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="saved_by")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "listing")
        ordering = ["-created_at"]


class SearchHistory(models.Model):
    public_id = models.CharField(max_length=64, unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="search_history")
    query = models.CharField(max_length=255)
    result_count = models.IntegerField(default=0)
    filters_summary = models.CharField(max_length=255, blank=True)
    timestamp = models.DateTimeField()

    class Meta:
        ordering = ["-timestamp", "public_id"]


class ContactSubmission(models.Model):
    public_id = models.CharField(max_length=64, unique=True)
    name = models.CharField(max_length=128)
    email = models.EmailField()
    phone = models.CharField(max_length=64, blank=True)
    subject = models.CharField(max_length=255, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]


class CatalogEntry(models.Model):
    KIND_CHOICES = [
        ("brands", "brands"),
        ("models", "models"),
        ("vehicle-types", "vehicle-types"),
        ("locations", "locations"),
    ]
    public_id = models.CharField(max_length=64, unique=True)
    kind = models.CharField(max_length=32, choices=KIND_CHOICES)
    data = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["kind", "public_id"]


class AdminReport(models.Model):
    public_id = models.CharField(max_length=64, unique=True)
    data = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at", "public_id"]


class AdminSuspension(models.Model):
    public_id = models.CharField(max_length=64, unique=True)
    data = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at", "public_id"]
