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
        cleaned = (
            value.strip()
            .replace(" ", "")
            .replace("-", "")
            .replace("(", "")
            .replace(")", "")
        )

        # Nigerian local format: 08012345678
        if cleaned.startswith("0"):
            if len(cleaned) != 11 or not cleaned.isdigit():
                raise serializers.ValidationError(
                    "Please enter a valid Nigerian phone number."
                )

            return cleaned

        # Nigerian international format: +2348012345678
        if cleaned.startswith("+234"):
            number = cleaned[4:]

            if len(number) != 10 or not number.isdigit():
                raise serializers.ValidationError(
                    "Please enter a valid Nigerian phone number."
                )

            return cleaned

        # International format without +
        if cleaned.startswith("234"):
            number = cleaned[3:]

            if len(number) != 10 or not number.isdigit():
                raise serializers.ValidationError(
                    "Please enter a valid Nigerian phone number."
                )

            return f"+{cleaned}"

        raise serializers.ValidationError(
            "Please enter a valid Nigerian phone number."
        )
    
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