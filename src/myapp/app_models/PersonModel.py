from django.db import models
from myapp.validators import *
# from django.contrib.auth.models import User
from rest_framework import serializers


class Person(models.Model):
    

    name = models.CharField(max_length=50, null=False, blank=True, verbose_name="Name", validators=[validate_first_letter])
    age = models.PositiveSmallIntegerField(null=False,blank=True,verbose_name="Age",validators=[validate_value])

    def __str__(self):
        return "{}".format(self.name)
    
    class Meta:
        verbose_name = "Person"
        verbose_name_plural = "Persons"
        ordering = ['id']

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'


