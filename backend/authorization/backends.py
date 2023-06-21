from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model


UserModel = get_user_model()

class PasswordlessAuthBackend(ModelBackend):
    """
    Authentication without password checking and generating
    """
    def authenticate(self, request, username=None, **kwargs):
        if username is None:
            username = kwargs.get(UserModel.USERNAME_FIELD)
        if username is None:
            return None
        
        try:
            user = UserModel._default_manager.get_by_natural_key(username)
        except UserModel.DoesNotExist:
            return None
        else:
            if self.user_can_authenticate(user):
                return user