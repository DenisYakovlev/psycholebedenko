from rest_framework import serializers
from .models import PsycholyTest, TestResult, TestAnswer
from user.models import TelegramUser


class PsycholyTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PsycholyTest
        fields = ["id", "name", "img_url"]

class PsycholyTestFullSerializer(serializers.ModelSerializer):
    class Meta:
        model = PsycholyTest
        fields = "__all__"

class TestAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestAnswer
        fields = "__all__"

class TestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestResult
        fields = "__all__"


class TestResultFullSerializer(serializers.ModelSerializer):
    test = PsycholyTest()
    test_name = serializers.SerializerMethodField("get_test_name")
    test_max_score = serializers.SerializerMethodField("get_test_max_score")
    answer = TestAnswerSerializer()
    user = TelegramUser()

    class Meta:
        model = TestResult
        fields = ["test", "test_name", "test_max_score", "user", "score", "answer", "result_hash", "created_at"]

    def get_test_name(self, obj):
        try:
            return obj.test.name
        except:
            return obj["test"].name
        
    def get_test_max_score(self, obj):
        try:
            return obj.test.max_score
        except:
            return obj["test"].max_score
    