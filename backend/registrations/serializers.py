from rest_framework import serializers
from .models import Registration


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration

        fields = [
            "registration_id",

            # LOCCI information
            "is_locci_member",
            "locci_branch",

            # Personal information
            "full_name",
            "email",
            "phone_number",
            "age_group",
            "city",
            "additional_information",

            # Registration information
            "status",
            "registered_at",
        ]

        read_only_fields = [
            "registration_id",
            "status",
            "registered_at",
        ]

    def validate(self, attrs):
        is_locci_member = attrs.get(
            "is_locci_member",
            False
        )

        locci_branch = attrs.get(
            "locci_branch",
            ""
        ).strip()

        if is_locci_member and not locci_branch:
            raise serializers.ValidationError({
                "locci_branch": "Please select your LOCCI branch."
            })

        if not is_locci_member:
            attrs["locci_branch"] = ""

        return attrs

    def validate_phone_number(self, value):
        cleaned = (
            value.strip()
            .replace(" ", "")
            .replace("-", "")
            .replace("(", "")
            .replace(")", "")
        )

        # Nigerian local format
        # 08012345678
        if cleaned.startswith("0"):
            if len(cleaned) != 11 or not cleaned.isdigit():
                raise serializers.ValidationError(
                    "Please enter a valid Nigerian phone number."
                )

            return cleaned

        # Nigerian international format
        # +2348012345678
        if cleaned.startswith("+234"):
            number = cleaned[4:]

            if len(number) != 10 or not number.isdigit():
                raise serializers.ValidationError(
                    "Please enter a valid Nigerian phone number."
                )

            return cleaned

        # International format without +
        # 2348012345678
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

            # LOCCI information
            "is_locci_member",
            "locci_branch",

            # Personal information
            "full_name",
            "email",
            "phone_number",
            "age_group",
            "city",
            "additional_information",

            # Registration information
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