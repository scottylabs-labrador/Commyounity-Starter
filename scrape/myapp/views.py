from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status
from .models import Events
from .serializers import EventSerializer

class EventPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

#api url: http://127.0.0.1:8000/api/eventlist
class EventList(APIView):
    def get(self, request):
        events = Events.objects.all()[:10]
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

#api url: http://127.0.0.1:8000/api/eventlist/search?q=music&page=2&page_size=10
class EventListSearch(APIView):

    pagination_class = EventPagination

    def get(self, request):
        query = request.query_params.get('q', None)

        if(query):
            events = Events.objects.filter(title__icontains=query)
        else:
            events = Events.objects.all()
            
        paginator = self.pagination_class()
        paginated_events = paginator.paginate_queryset(events, request)
        serializer = EventSerializer(paginated_events, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

