from rest_framework import generics,status,permissions
from rest_framework.response import Response
from .models import Media
from .serializers import MediaSerializer, AdminMediaSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAdminUser


class MediaListView(generics.ListAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class AdminMediaListCreateView(generics.ListCreateAPIView):
    queryset = Media.objects.all()
    serializer_class = AdminMediaSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAdminUser]

    def get_serializer_class(self):
        if self.request.user.is_staff:
            return AdminMediaSerializer
        return MediaSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class AdminMediaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Media.objects.all()
    serializer_class = AdminMediaSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAdminUser]

    def get_serializer_class(self):
        if self.request.user.is_staff:
            return AdminMediaSerializer
        return MediaSerializer
    
class AdminUpdateMediaOrderView(generics.UpdateAPIView):
    queryset = Media.objects.all()
    serializer_class = AdminMediaSerializer
    permission_classes = [IsAdminUser]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        display_order = request.data.get('display_order')

        if display_order is not None:
            instance.display_order = display_order
            instance.save()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        else:
            return Response({"error": "display_order is required."}, status=status.HTTP_400_BAD_REQUEST)
        
class AdminDeleteMediaView(generics.DestroyAPIView):
    queryset = Media.objects.all()
    serializer_class = AdminMediaSerializer
    permission_classes = [IsAdminUser]