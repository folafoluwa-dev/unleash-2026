from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.db.models import Count
from django.db import models

from .models import Registration
from .serializers import (
    RegistrationSerializer,
    AdminRegistrationSerializer,
)


class RegistrationCreateView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer


class AdminRegistrationListView(generics.ListAPIView):
    queryset = Registration.objects.all().order_by("-registered_at")
    serializer_class = AdminRegistrationSerializer
    permission_classes = [permissions.IsAdminUser]


class AdminRegistrationDetailView(generics.RetrieveUpdateAPIView):
    queryset = Registration.objects.all()
    serializer_class = AdminRegistrationSerializer
    permission_classes = [permissions.IsAdminUser]


class AdminRegistrationStatsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        registrations = Registration.objects.all()

        stats = registrations.aggregate(
            total=Count("id"),
            pending=Count(
                "id",
                filter=models.Q(status="pending")
            ),
            confirmed=Count(
                "id",
                filter=models.Q(status="confirmed")
            ),
            attended=Count(
                "id",
                filter=models.Q(status="attended")
            ),
            cancelled=Count(
                "id",
                filter=models.Q(status="cancelled")
            ),
        )

        return Response(stats)


class AdminRegistrationLookupView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, registration_id):
        try:
            registration = Registration.objects.get(
                registration_id=registration_id
            )
        except Registration.DoesNotExist:
            return Response(
                {
                    "detail": "Registration not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = AdminRegistrationSerializer(registration)

        return Response(serializer.data)


class AdminRegistrationCheckInView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, registration_id):
        try:
            registration = Registration.objects.get(
                registration_id=registration_id
            )
        except Registration.DoesNotExist:
            return Response(
                {
                    "detail": "Registration not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        if registration.status == "cancelled":
            return Response(
                {
                    "detail": (
                        "Cancelled registrations cannot "
                        "be checked in."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if registration.status == "attended":
            serializer = AdminRegistrationSerializer(registration)

            return Response(
                {
                    "detail": (
                        "This attendee has already "
                        "been checked in."
                    ),
                    "already_checked_in": True,
                    "registration": serializer.data,
                },
                status=status.HTTP_200_OK,
            )

        registration.status = "attended"
        registration.save(update_fields=["status"])

        serializer = AdminRegistrationSerializer(registration)

        return Response(
            {
                "detail": "Attendance confirmed.",
                "already_checked_in": False,
                "registration": serializer.data,
            },
            status=status.HTTP_200_OK,
        )