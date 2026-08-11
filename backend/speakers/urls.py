from django.urls import path
from .views import (
    SpeakerListView,
    AdminSpeakerListView,
    AdminSpeakerDetailView,
    AdminSpeakerOrderUpdateView,
    AdminSpeakerDeleteView,
)
urlpatterns = [
    path("speakers/", SpeakerListView.as_view(), name="speaker-list"),
    path("speakers/", AdminSpeakerListView.as_view(), name="admin-speaker-list"),
    path("speakers/<int:pk>/", AdminSpeakerDetailView.as_view(), name="admin-speaker-detail"),
    path("admin/speakers/<int:pk>/", AdminSpeakerOrderUpdateView.as_view(), name="admin-speaker-order-update"),
    path("speakers/<int:pk>/", AdminSpeakerDeleteView.as_view(), name="admin-speaker-delete"),
]