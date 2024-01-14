from myapp.app_models.UserModel import CustomUser, CustomUserSerializer
from rest_framework.decorators import permission_classes,action
from rest_framework.response import Response
from myapp.app_models.NoteModel import Note, NoteSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied



'''

Tokens views

'''

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


'''

Notes views

'''

@permission_classes([IsAuthenticated]) 
class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.filter(creator=self.request.user)

    def perform_create(self, serializer):
        serializer.validated_data['creator'] = self.request.user
        serializer.save()

    def perform_update(self, serializer):
        note = self.get_object()
        if note.creator != self.request.user:
            raise PermissionDenied({"message": "Permission denied."})
        serializer.save()

    def perform_destroy(self, instance):
        if instance.creator != self.request.user:
                raise PermissionDenied({"message": "Permission denied."})
        instance.delete()
'''

Users views

'''

class SignupViewSet(viewsets.ViewSet):
    serializer_class = CustomUserSerializer
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            if username is None:
                return Response({'message': 'Please provide a valid username.'}, status=status.HTTP_400_BAD_REQUEST)
            if CustomUser.objects.filter(username=username).exists():
                return Response({'message': 'This username is already in use.'}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response({'message': 'Successfully created'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






