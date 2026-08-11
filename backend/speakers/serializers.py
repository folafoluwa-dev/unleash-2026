from .models import Speaker
from rest_framework import serializers

class SpeakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Speaker
        fields = ["id","name", "title", "biography", "photo", "display_order"]
        read_only_fields = ["id"]
        
class AdminSpeakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Speaker
        fields = ["id", "name", "title", "biography", "photo", "display_order"]
        read_only_fields = ["id"]