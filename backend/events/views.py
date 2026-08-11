from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import EventSettings
from .serializers import EventSettingsSerializer


class EventSettingsView(APIView):

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]

        return [IsAuthenticated()]

    def get(self, request):
        settings = EventSettings.objects.first()

        if not settings:
            return Response(
                {"detail": "Event settings have not been configured."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = EventSettingsSerializer(settings)
        return Response(serializer.data)

    def patch(self, request):
        settings = EventSettings.objects.first()

        if not settings:
            return Response(
                {"detail": "Event settings have not been configured."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = EventSettingsSerializer(
            settings,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )