from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes

from .tasks import test


@api_view(["GET"])
@permission_classes([])
def healthcheck(request):
    # healthcheck for app

    return Response({"msg": "working"}, status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([])
def rabbit_test(request):
    # testing rabbit with telegram

    test.delay()
    return Response({"msg": "working"}, status.HTTP_200_OK)
