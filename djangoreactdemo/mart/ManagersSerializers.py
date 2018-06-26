from rest_framework import serializers
from mart.models import Buyers,Bought
from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model
User = get_user_model()


class POSEmployeeCreateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True,validators=[UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(min_length=8,write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('username', 'email', 'password')