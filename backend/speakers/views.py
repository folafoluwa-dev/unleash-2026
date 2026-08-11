from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Speaker
from .serializers import AdminSpeakerSerializer, SpeakerSerializer


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def speaker_list(request):
    if request.method == 'GET':
        speakers = Speaker.objects.filter(is_active=True)
        serializer = SpeakerSerializer(speakers, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # Explicit check for admin/staff permission
        if not (request.user and request.user.is_staff):
            return Response(
                {"detail": "Authentication credentials were not provided or unauthorized."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = AdminSpeakerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([AllowAny])
def speaker_detail(request, pk):
    try:
        speaker = Speaker.objects.get(pk=pk)
    except Speaker.DoesNotExist:
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SpeakerSerializer(speaker)
        return Response(serializer.data)

    # Require staff permissions for PATCH and DELETE
    if not (request.user and request.user.is_staff):
        return Response(
            {"detail": "Authentication credentials were not provided or unauthorized."},
            status=status.HTTP_403_FORBIDDEN
        )

    if request.method == 'PATCH':
        serializer = AdminSpeakerSerializer(speaker, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        speaker.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)