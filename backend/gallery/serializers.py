from .models import Media
from rest_framework import serializers

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['id', 'title', 'caption', 'image', 'category', 'display_order', 'is_active', 'created_at', 'updated_at']
        
class AdminMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['id', 'title', 'caption', 'image', 'category', 'display_order', 'is_active', 'created_at', 'updated_at']
         