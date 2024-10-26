from rest_framework import serializers
from .models import Events, User

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
    
    def create(self, validated_data):
        # validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data) # inherit parent create
