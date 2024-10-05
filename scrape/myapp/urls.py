# myapp/urls.py
from django.urls import path
from .views import EventList, EventListSearch

urlpatterns = [
    path('eventlist/', EventList.as_view(), name='event-list'),
    path('eventlist/search', EventListSearch.as_view(), name='event-list-search'),
]