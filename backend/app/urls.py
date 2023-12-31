"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.urls import path, re_path, include
from django.views.static import serve 


urlpatterns = [
    path('admin/', admin.site.urls),
    path('healthcheck/', include('server.urls')),
    path('auth/', include('authorization.urls')),
    path('user/', include('user.urls')),
    path('event/', include('event.urls')),
    path('appointment/', include('appointment.urls')),
    path('schedule/', include('schedule.urls')),
    path('psy_tests/', include('psy_tests.urls')),

    # static/media files endpoints for django admin
    re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
]
