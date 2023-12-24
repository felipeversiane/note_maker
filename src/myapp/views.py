from myapp.app_models.NoteModel import Note,NoteSerializer
from myapp.app_models.PersonModel import Person,PersonSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.http import JsonResponse


######################################### GENERIC VIEWSETS ############################################
class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

    


#######################################################################################################
def get_person_by_name_and_age(request, name, age):
    try:
        person = Person.objects.get(name=name, age=age)
        serializer = PersonSerializer(person)
        return JsonResponse(serializer.data)
    except Person.DoesNotExist:
        return JsonResponse({'error': 'Person not found'}, status=404)
