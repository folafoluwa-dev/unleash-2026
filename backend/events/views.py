from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import EventSettings
from .serializers import EventSettingsSerializer


@api_view(['GET', 'PATCH'])
@permission_classes([AllowAny])
def event_settings(request):
    settings_obj = EventSettings.objects.first()

    if request.method == 'GET':
        if settings_obj is None:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = EventSettingsSerializer(settings_obj)
        return Response(serializer.data)

    if settings_obj is None:
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    if not (request.user and request.user.is_staff):
        return Response(
            {'detail': 'Authentication credentials were not provided or unauthorized.'},
            status=status.HTTP_403_FORBIDDEN,
        )

    serializer = EventSettingsSerializer(settings_obj, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
