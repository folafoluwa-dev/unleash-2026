from django.urls import path
from .views import MediaListView,AdminMediaListCreateView, AdminMediaDetailView, AdminUpdateMediaOrderView, AdminDeleteMediaView

urlpatterns = [
    path('media/', MediaListView.as_view(), name='media-list'),
    path('media/', AdminMediaListCreateView.as_view(), name='admin-media-list-create'),
    path('media/<int:pk>/', AdminMediaDetailView.as_view(), name='admin-media-detail'),
    path('media/<int:pk>/', AdminUpdateMediaOrderView.as_view(), name='admin-media-update-order'),
    path('media/<int:pk>/', AdminDeleteMediaView.as_view(), name='admin-media-delete'),
]