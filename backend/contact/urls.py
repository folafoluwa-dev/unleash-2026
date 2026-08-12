from django.urls import path

from .views import messages_list, message_detail

urlpatterns = [
    path("messages/", messages_list, name="messages-list"),
    path("messages/<int:pk>/", message_detail, name="message-detail"),
]
