from django.urls import path
from .views import EventSettingsView

urlpatterns = [
    # your existing URLs...

    path(
        "event-settings/",
        EventSettingsView.as_view(),
        name="event-settings"
    ),
]