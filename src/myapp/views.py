from myapp.app_models.NoteModel import Note,NoteSerializer
from myapp.app_models.PersonModel import Person,PersonSerializer
from rest_framework import viewsets

######################################### GENERIC VIEWSETS ############################################
class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
