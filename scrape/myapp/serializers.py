from rest_framework import serializers
from .models import Events  # Adjust the import according to your model's name

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = '__all__'