from django.urls import path
from .views import event_settings

urlpatterns = [
    path('event-settings/', event_settings, name='event-settings'),
]
