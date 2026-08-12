from rest_framework import serializers
from .models import Speaker

class SpeakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Speaker
        fields = [
            "id",
            "name",
            "title",
            "biography",
            "photo",
            "display_order",
            "is_active",
        ]
        read_only_fields = ["id"]


class AdminSpeakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Speaker
        fields = [
            "id",
            "name",
            "title",
            "biography",
            "photo",
            "display_order",
            "is_active",
        ]
        read_only_fields = ["id"]