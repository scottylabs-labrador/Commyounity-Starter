# myapp/urls.py
from django.urls import path
from .views import EventList, EventListSearch
from .user import create_user_account

urlpatterns = [
    path('eventlist/', EventList.as_view(), name='event-list'),
    path('eventlist/search', EventListSearch.as_view(), name='event-list-search'),
    path('create-account/', create_user_account, name='create-account'),
]