from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Media
from .serializers import MediaSerializer, AdminMediaSerializer


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([AllowAny])
def gallery_list(request):
    if request.method == 'GET':
        if request.user and request.user.is_staff:
            media_items = Media.objects.all()
        else:
            media_items = Media.objects.filter(is_active=True)
        serializer = MediaSerializer(media_items, many=True)
        return Response(serializer.data)

    # POST
    if not (request.user and request.user.is_staff):
        return Response(
            {'detail': 'Authentication credentials were not provided or unauthorized.'},
            status=status.HTTP_403_FORBIDDEN,
        )

    serializer = AdminMediaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser])
def gallery_detail(request, pk):
    try:
        media_item = Media.objects.get(pk=pk)
    except Media.DoesNotExist:
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        if not media_item.is_active and not (request.user and request.user.is_staff):
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = MediaSerializer(media_item)
        return Response(serializer.data)

    if not (request.user and request.user.is_staff):
        return Response(
            {'detail': 'Authentication credentials were not provided or unauthorized.'},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == 'PATCH':
        serializer = AdminMediaSerializer(media_item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        media_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

