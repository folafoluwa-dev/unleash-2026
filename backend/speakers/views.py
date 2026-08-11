from rest_framework.permissions import IsAdminUser,AllowAny
from .models import Speaker
from .serializers import SpeakerSerializer, AdminSpeakerSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

@api_view(['GET','POST'])
@permission_classes([AllowAny])
def speaker_list(request):
    if request.method == 'GET':
        speakers = Speaker.objects.filter(is_active=True)
        serializer = SpeakerSerializer(speakers, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        permission_classes([IsAdminUser])
        serializer = AdminSpeakerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
@api_view(['GET','PUT','DELETE'])
@permission_classes([AllowAny])
def speaker_detail(request, pk):
    try:
        speaker = Speaker.objects.get(pk=pk)
    except Speaker.DoesNotExist:
        return Response(status=404)

    if request.method == 'GET':
        serializer = SpeakerSerializer(speaker)
        return Response(serializer.data)
    elif request.method == 'PUT':
        permission_classes([IsAdminUser])
        serializer = AdminSpeakerSerializer(speaker, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    elif request.method == 'DELETE':
        permission_classes([IsAdminUser])
        speaker.delete()
        return Response(status=204)