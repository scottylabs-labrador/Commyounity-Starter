from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Events, User

# return event informaiton in JSON format 
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = '__all__' # include everything in JSON response

# automatically validate incoming data, like check uniqueness
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__' # mapped to these fields
    
    def create(self, data): # automatically called when serializer.save()
        data['password'] = make_password(data['password']) # hash pw for secrutiy
        return super().create(data) # override
