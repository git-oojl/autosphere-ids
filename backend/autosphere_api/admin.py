from django.contrib import admin

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

admin.site.register(Profile)
admin.site.register(Listing)
admin.site.register(ListingImage)
admin.site.register(Review)
admin.site.register(Appointment)
admin.site.register(SavedVehicle)
admin.site.register(SearchHistory)
admin.site.register(ContactSubmission)
admin.site.register(CatalogEntry)
admin.site.register(AdminReport)
admin.site.register(AdminSuspension)
