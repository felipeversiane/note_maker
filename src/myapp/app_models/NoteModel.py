from django.db import models
from  myapp.validators import *
from rest_framework import serializers
from .UserModel import CustomUser
class Note(models.Model):

    title = models.CharField(max_length=100,verbose_name="Title",null=False,blank=True,validators=[validate_first_letter])
    content = models.TextField(max_length=2000,verbose_name="Content",null=False,blank=True)
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='Creator')


    def __str__(self):
        return "{}".format(self.title)
    
    class Meta:
        verbose_name = "Note"
        verbose_name_plural = "Notes"
        ordering = ['id']
    

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

