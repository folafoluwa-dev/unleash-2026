from django.contrib import admin
from .models import Speaker

@admin.register(Speaker)
class SpeakerAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'biography', 'created_at')
    search_fields = ('name', 'title')