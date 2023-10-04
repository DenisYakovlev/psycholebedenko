from django.urls import path
from .views import PsychologyTestList, PsychologyTestDetail, TestResultCreate, TestResultRetrive

urlpatterns = [
    path('', PsychologyTestList.as_view()),
    path('result', TestResultCreate.as_view()),
    path('result/<str:result_hash>', TestResultRetrive.as_view()),
    path('<str:name>', PsychologyTestDetail.as_view()),
]