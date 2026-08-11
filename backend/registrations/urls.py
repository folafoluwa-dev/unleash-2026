from django.urls import path
from .views import (
    AdminRegistrationCheckInView,
    RegistrationCreateView,
    AdminRegistrationListView,
    AdminRegistrationDetailView,
    AdminRegistrationLookupView,
    AdminRegistrationStatsView,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path(
        "registration/",
        RegistrationCreateView.as_view(),
        name="registration-create",
    ),
    path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "registrations/admin/",
        AdminRegistrationListView.as_view(),
        name="admin-registration-list",
    ),
    path(
        "registrations/admin/",
        AdminRegistrationListView.as_view(),
        name="admin-registration-list",
    ),
    path(
        "registrations/admin/stats/",
        AdminRegistrationStatsView.as_view(),
        name="admin-registration-stats",
    ),
    path(
        "registrations/admin/<int:pk>/",
        AdminRegistrationDetailView.as_view(),
        name="admin-registration-detail",
    ),
    path(
    "admin/lookup/<str:registration_id>/",
    AdminRegistrationLookupView.as_view(),
    name="admin-registration-lookup",
),
    path(
    "admin/check-in/<str:registration_id>/",
    AdminRegistrationCheckInView.as_view(),
    name="admin-registration-check-in",
),
]
