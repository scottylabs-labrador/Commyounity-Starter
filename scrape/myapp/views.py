from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Events
from .serializers import EventSerializer

class EventList(APIView):
    def get(self, request):
        events = Events.objects.all()[:10]  # Fetching the first 10 entries
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
