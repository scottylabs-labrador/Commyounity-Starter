# myapp/urls.py
from django.urls import path
from .views import EventList, EventListSearch, UserLikes
from .user import create_user_account, check_user_account, update_user_preference, update_user_events

urlpatterns = [
    path('eventlist/', EventList.as_view(), name='event-list'),
    path('eventlist/search', EventListSearch.as_view(), name='event-list-search'),
    path('create-account/', create_user_account, name='create-account'),
    path('check-account/', check_user_account, name="check-account"),
    path('update-preference/', update_user_preference, name="update-preference"),
    path('update-likes/', update_user_events, name="update-likes"),
    path('get-likes/', UserLikes.as_view(), name="get-likes")
]