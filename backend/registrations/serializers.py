from rest_framework import serializers
from .models import Registration


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = [
            "registration_id",
            "full_name",
            "email",
            "phone_number",
            "age",
            "city",
            "additional_information",
            "status",
            "registered_at",
        ]

        read_only_fields = [
            "registration_id",
            "status",
            "registered_at",
        ]

    def validate_age(self, value):
        if value < 1:
            raise serializers.ValidationError(
                "Age must be greater than 0."
            )

        if value > 120:
            raise serializers.ValidationError(
                "Please enter a valid age."
            )

        return value

    def validate_phone_number(self, value):
        cleaned = value.replace(" ", "").replace("-", "")

        if not cleaned.isdigit():
            raise serializers.ValidationError(
                "Please enter a valid phone number."
            )

        if len(cleaned) < 10 or len(cleaned) > 15:
            raise serializers.ValidationError(
                "Please enter a valid phone number."
            )

        return value
    
class AdminRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = [
            "id",
            "registration_id",
            "full_name",
            "email",
            "phone_number",
            "age",
            "city",
            "additional_information",
            "status",
            "registered_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "registration_id",
            "registered_at",
            "updated_at",
        ]