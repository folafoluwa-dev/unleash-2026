from rest_framework import generics,permissions
from rest_framework.permissions import IsAdminUser,AllowAny
from .models import Speaker
from .serializers import SpeakerSerializer, AdminSpeakerSerializer
from rest_framework.response import Response

class SpeakerListView(generics.ListAPIView):
    queryset = Speaker.objects.filter(is_active=True)
    serializer_class = SpeakerSerializer
    permission_classes = [AllowAny]
    
class AdminSpeakerListView(generics.ListCreateAPIView):
    queryset = Speaker.objects.all()
    serializer_class = AdminSpeakerSerializer
    permission_classes = [IsAdminUser]
    
class AdminSpeakerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Speaker.objects.all()
    serializer_class = AdminSpeakerSerializer
    permission_classes = [IsAdminUser]

class AdminSpeakerOrderUpdateView(generics.UpdateAPIView):
    queryset = Speaker.objects.all()
    serializer_class = AdminSpeakerSerializer
    permission_classes = [IsAdminUser]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        new_order = request.data.get("display_order")
        if new_order is not None:
            instance.display_order = new_order
            instance.save()
            return Response({"status": "display order updated"})
        else:
            return Response({"error": "display_order not provided"}, status=400)
        
class AdminSpeakerDeleteView(generics.DestroyAPIView):
    queryset = Speaker.objects.all()
    serializer_class = AdminSpeakerSerializer
    permission_classes = [IsAdminUser]