from urllib.parse import unquote 
import json
from django.contrib.auth import authenticate, get_user_model
from django.conf import settings
from rest_framework import serializers, exceptions
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.tokens import RefreshToken
from .utils import confirmTelegramWidgetHash, confirmTelegramBotAppHash, validateIMGURL
from user.models import TelegramUser
from user.serializers import TelegramUserSerializer
from rest_framework_simplejwt.serializers import TokenObtainSerializer


class PasswordlessTokenObtainSerializer(serializers.Serializer):
    """
    template: rest_framework_simplejwt.serializers.TokenObtainSerializer
    Removed password field that is required for request
    Validation authenticates user with django auth backend
    """
    
    # username field of TelegramUser model
    username_field = get_user_model().USERNAME_FIELD
    token_class = None
    
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)

        self.fields[self.username_field] = serializers.CharField()
    
    def validate(self, attrs):
        authenticate_kwargs = {
            self.username_field: attrs[self.username_field],
        }
        try:
            authenticate_kwargs["request"] = self.context["request"]
        except KeyError:
            pass

        self.user = authenticate(request=None, username=attrs[self.username_field])

        if not api_settings.USER_AUTHENTICATION_RULE(self.user):
            raise serializers.ValidationError(
                self.error_messages["no_active_account"],
                "no_active_account",
            )

        return {}
    
    @classmethod
    def get_token(cls, user):
        return cls.token_class.for_user(user)  # type: ignore
    

class PasswordlessTokenObtainPairSerializer(PasswordlessTokenObtainSerializer):
    token_class = RefreshToken

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data
    
    
class AuthWidgetTelegramUserSerializer(serializers.ModelSerializer):
    hash = serializers.CharField(write_only=True)
    
    class Meta:
        model = TelegramUser
        fields = ['id', 'first_name', 'last_name', 'username', 'photo_url', 'auth_date', 'hash']
        
    def validate(self, attrs):
        hashIsValid = confirmTelegramWidgetHash(attrs, secret_key=settings.TELEGRAM_BOT_API_KEY)
        
        if hashIsValid == False:
            raise serializers.ValidationError({"hash": "Hash is not valid"})
        
        imgIsValid = validateIMGURL(attrs['photo_url'])
        if imgIsValid == False:
            attrs['photo_url'] = f'/user/photo'
        
        return super().validate(attrs)
        
    def create(self, data):
        data.pop("hash", None)
        return super().create(data)
    

class AuthBotAppTelegramUserSerializer(serializers.Serializer):
    initData = serializers.CharField()

    def validate(self, attrs):
        hashIsValid = confirmTelegramBotAppHash(attrs['initData'], settings.TELEGRAM_BOT_API_KEY)

        if hashIsValid == False:
            raise serializers.ValidationError({"hash": "Hash is not valid"})
        
        # extract user from initData
        try:
            quotedStr = unquote(attrs['initData'])
            idx, jdx = quotedStr.find("{"), quotedStr.find("}")
            user_data = json.loads(quotedStr[idx:jdx+1])
            attrs["user"] = user_data
        except:
            raise serializers.ValidationError({"msg": "user not found"})
        
        return super().validate(attrs)
