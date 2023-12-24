from django.urls import path,re_path
from . import views
from django.conf.urls import include
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'person', views.PersonViewSet)
router.register(r'note', views.NoteViewSet)


urlpatterns = [
    re_path('', include(router.urls)),
    path('person/<str:name>/<int:age>/', views.get_person_by_name_and_age, name='get_person_by_name_and_age'),
    path('notes-by-creator/<int:creator_id>/', views.get_notes_by_creator, name='get_notes_by_creator'),

]