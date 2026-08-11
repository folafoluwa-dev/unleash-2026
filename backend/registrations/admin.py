from django.contrib import admin
from .models import Registration


@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = (
        "registration_id",
        "full_name",
        "email",
        "phone_number",
        "age",
        "city",
        "status",
        "registered_at",
    )

    list_filter = (
        "status",
        "city",
        "registered_at",
    )

    search_fields = (
        "registration_id",
        "full_name",
        "email",
        "phone_number",
    )

    readonly_fields = (
        "registration_id",
        "registered_at",
        "updated_at",
    )

    ordering = ("-registered_at",)