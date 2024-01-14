from django.contrib.auth.models import AbstractUser
from django.db import models
from rest_framework import serializers
from myapp.validators import *



class CustomUser(AbstractUser):
    age = models.PositiveSmallIntegerField(null=True,blank=True,verbose_name="Age",validators=[validate_value])

    def __str__(self):
        return "".format()
    
    class Meta:
        verbose_name = "CustomUser"
        verbose_name_plural = "CustomUsers"
        ordering = ['id']

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

    
