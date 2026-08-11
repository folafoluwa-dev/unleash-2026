from django.urls import path
from .views import gallery_list, gallery_detail

urlpatterns = [
    path('gallery/', gallery_list, name='gallery-list'),
    path('gallery/<int:pk>/', gallery_detail, name='gallery-detail'),
]