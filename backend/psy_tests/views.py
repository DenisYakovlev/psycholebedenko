from django.http import Http404
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from .models import PsycholyTest, TestResult
from .serializers import PsycholyTestSerializer, PsycholyTestFullSerializer, TestResultSerializer, TestResultFullSerializer
from .utils import generateResultHash

# Create your views here.


class PsychologyTestList(generics.ListCreateAPIView):
    queryset = PsycholyTest.objects.all()
    pagination_class = None

    def get_permissions(self):
        # allow only retrieve for non staff users

        if self.request.method == "GET":
            return []
        else:
            return [IsAdminUser()]
        
    def get_serializer_class(self):
        if self.request.method == "GET":
            return PsycholyTestSerializer
        else:
            return PsycholyTestFullSerializer


class PsychologyTestDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PsycholyTest.objects.all()
    pagination_class = None
    serializer_class = PsycholyTestFullSerializer
    lookup_field = "name"

    def get_permissions(self):
        # allow only retrieve for non staff users

        if self.request.method == "GET":
            return []
        else:
            return [IsAdminUser()]
        

class TestResultRetrive(generics.RetrieveUpdateDestroyAPIView):
    queryset = TestResult.objects.all()
    pagination_class = None
    serializer_class = TestResultFullSerializer
    lookup_field = "result_hash"

    def get_permissions(self):
        # only allow retrieve for non staff users

        if self.request.method == "GET":
            return [IsAuthenticated()]
        else:
            return [IsAdminUser()]


class TestResultCreate(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            print(request.data)
            resultHash = generateResultHash(request.user.id, request.data["score"])
            
            data = request.data
            data["user"] = request.user.id
            data["result_hash"] = resultHash
        except:
            return Response({"detail": "score is not provided"}, status.HTTP_409_CONFLICT)
        
        serializer = TestResultSerializer(data=data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        response_serializer = TestResultSerializer(serializer.validated_data)

        return Response(response_serializer.data, status.HTTP_201_CREATED)