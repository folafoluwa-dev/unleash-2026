from django.urls import path
from .views import speaker_list,speaker_detail

urlpatterns = [
    path('speakers/',speaker_list),
    path('speakers/<int:pk>/',speaker_detail)
]
