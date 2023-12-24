from myapp.app_models.NoteModel import Note,NoteSerializer
from myapp.app_models.PersonModel import Person,PersonSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.http import JsonResponse
from rest_framework.decorators import api_view



######################################### GENERIC VIEWSETS ############################################
class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

    


#######################################################################################################
@api_view(['GET'])
def get_person_by_name_and_age(request, name, age):
    try:
        person = Person.objects.get(name=name, age=age)
        serializer = PersonSerializer(person)
        return JsonResponse(serializer.data)
    except Person.DoesNotExist:
        return JsonResponse({'error': 'Person not found'}, status=404)
    

@api_view(['GET'])
def get_notes_by_creator(request, creator_id):
    notes = Note.objects.filter(creator_id=creator_id)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)
