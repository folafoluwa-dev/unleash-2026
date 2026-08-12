from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Message
from .serializers import MessageSerializer, AdminMessageSerializer


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def messages_list(request):
    if request.method == "GET":
        if not (request.user and request.user.is_staff):
            return Response(
                {
                    "detail": "Authentication credentials were not provided or unauthorized."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        messages = Message.objects.order_by("-created_at")
        serializer = AdminMessageSerializer(messages, many=True)
        return Response(serializer.data)

    serializer = MessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PATCH", "DELETE"])
@permission_classes([AllowAny])
def message_detail(request, pk):
    try:
        message = Message.objects.get(pk=pk)
    except Message.DoesNotExist:
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        if not (request.user and request.user.is_staff):
            return Response(
                {
                    "detail": "Authentication credentials were not provided or unauthorized."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = AdminMessageSerializer(message)
        return Response(serializer.data)

    if not (request.user and request.user.is_staff):
        return Response(
            {
                "detail": "Authentication credentials were not provided or unauthorized."
            },
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "PATCH":
        serializer = AdminMessageSerializer(message, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    message.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
