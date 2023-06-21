import os

from django.conf import settings
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import TelegramUserSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def UserInfo(request):
    serializer = TelegramUserSerializer(instance=request.user)
    
    return Response({**serializer.data}, status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def SendDefaultUserPhoto(request):
    file_path = os.path.join(settings.MEDIA_ROOT, "user_photo.jpeg")

    try:
        with open(file_path, "rb") as f:
            return HttpResponse(f.read(), content_type="image/jpeg")
    except IOError:
        return HttpResponse({"msg": "file not found"}, status=status.HTTP_404_NOT_FOUND)
    