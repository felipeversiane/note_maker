from django.urls import path,re_path,include
from . import views
from rest_framework.routers import DefaultRouter


router= DefaultRouter()
router.register(r'notes', views.NoteViewSet,basename="notes")
router.register(r'signup', views.SignupViewSet,basename="signup")

urlpatterns = [
    path('', include(router.urls)),

]