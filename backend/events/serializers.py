from rest_framework import serializers
from .models import EventSettings


class EventSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventSettings
        fields = [
            'id',
            'event_name',
            'theme',
            'start_date',
            'end_date',
            'start_time',
            'venue',
            'address',
            'registration_open',
            'updated_at',
        ]
