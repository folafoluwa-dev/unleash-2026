from django.contrib import admin
from .models import EventSettings

@admin.register(EventSettings)
class EventAdmin(admin.ModelAdmin):
    list_display=['event_name','theme','start_date','id','end_date','start_time','venue','address','registration_open','updated_at']
