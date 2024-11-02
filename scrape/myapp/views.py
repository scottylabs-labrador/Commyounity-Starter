from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status
from .models import Events, User
from .serializers import EventSerializer

class EventPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

#api url: http://127.0.0.1:8000/api/eventlist
class EventList(APIView):
    def get(self, request):
        events = Events.objects.all()[:10]
        serializer = EventSerializer(events, many=True) # handle multiple records
        return Response(serializer.data, status=status.HTTP_200_OK)

def rank(events, preference):
    print(preference)
    matching_events = [event for event in events if event.category in preference]
    print(matching_events)
    non_matching_events = [event for event in events if event.category not in preference]
    ranked_events = matching_events + non_matching_events
    return ranked_events

#api url: http://127.0.0.1:8000/api/eventlist/search?q=keyword&page=2&page_size=10&username=bbb
class EventListSearch(APIView):

    pagination_class = EventPagination

    def get(self, request):
        query = request.query_params.get('q', None)
        username = request.query_params.get('username', None)

        if(query):
            events = Events.objects.filter(title__icontains=query)
        else:
            events = Events.objects.all()

        if(username):
            try:
                user = User.objects.get(username=username)
                events = rank(events, user.preference)
            except User.DoesNotExist:
                return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
            
        paginator = self.pagination_class()
        paginated_events = paginator.paginate_queryset(events, request)
        serializer = EventSerializer(paginated_events, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

