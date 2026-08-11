from django.urls import path
from .views import MediaListView,AdminMediaListCreateView, AdminMediaDetailView, AdminUpdateMediaOrderView, AdminDeleteMediaView

urlpatterns = [
    path('gallery/', MediaListView.as_view(), name='media-list'),
    path('gallery/', AdminMediaListCreateView.as_view(), name='admin-media-list-create'),
    path('gallery/<int:pk>/', AdminMediaDetailView.as_view(), name='admin-media-detail'),
    path('gallery/<int:pk>/', AdminUpdateMediaOrderView.as_view(), name='admin-media-update-order'),
    path('gallery/<int:pk>/', AdminDeleteMediaView.as_view(), name='admin-media-delete'),
]