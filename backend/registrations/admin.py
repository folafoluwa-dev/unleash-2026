from django.contrib import admin
from .models import Registration


@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = (
        "registration_id",
        "full_name",
        "email",
        "phone_number",
        "age_group",
        "city",
        "is_locci_member",
        "locci_branch",
        "status",
        "registered_at",
    )

    list_filter = (
        "status",
        "age_group",
        "is_locci_member",
        "locci_branch",
        "registered_at",
    )

    search_fields = (
        "registration_id",
        "full_name",
        "email",
        "phone_number",
        "city",
        "locci_branch",
    )

    ordering = ("-registered_at",)

    readonly_fields = (
        "registration_id",
        "registered_at",
        "updated_at",
    )