from django.urls import path,re_path
from . import views
from django.conf.urls import include
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'person', views.PersonViewSet)
router.register(r'note', views.NoteViewSet)


urlpatterns = [
    re_path('', include(router.urls)),
    
]