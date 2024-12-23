from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User
from .serializers import UserSerializer
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from uuid import UUID

# http://127.0.0.1:8000/api/create-account/
# {
#    "password":"password",
#    "email":"email"
# }
@api_view(['POST']) 
def create_user_account(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():  # Validate the data
        user = serializer.save()  # Save and get the user instance
        return Response({
            "message": "User account created successfully",
            "username": user.username  # Include the generated username (UUID)
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# http://127.0.0.1:8000/api/check-account?email=email&password=password
@api_view(['GET'])
def check_user_account(request):
    email = request.query_params.get('email', None);
    password = request.query_params.get('password', None);
    
    try:
        user = User.objects.get(email=email);
    except User.DoesNotExist:
        return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)

    if check_password(password, user.password): # django's dehashing function
        return Response({
            "message": "Login successful!",
            "username": user.username
        }, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# http://127.0.0.1:8000/api/check-account?username=user&password=password
@api_view(['GET'])
def verify_email(request):
    account = request.query_params.get('account', None);
    if not account:
        return Response({"error": "Username is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    user = get_object_or_404(User, username=account);
    user.verified = True;
    user.save()
    return JsonResponse({'message': 'Email verified successfully!'})

# http://127.0.0.1:8000/api/update-preference/?username=bbb&preference={%22TRAVEL%22,%22ATHLETIC%22}
@api_view(['GET'])
def update_user_preference(request):
    username = request.query_params.get('username', None);
    preference = request.query_params.get('preference', []);

    if not username:
        return Response({"error": "Username is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(username=username)
        user.preference = preference
        user.save()

        return Response({"message": "User preference updated successfully"}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

# http://127.0.0.1:8000/api/update-likes/?username=bbb&events={10,20,30,40}
@api_view(['GET'])
def update_user_events(request):
    username = request.query_params.get('username', None);
    events = request.query_params.get('events', []);

    if not username:
        return Response({"error": "Username is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(username=username)
        user.events = events
        user.save()

        return Response({"message": "User events updated successfully"}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    
# http://127.0.0.1:8000/api/add-likes/?username=bbb&event=10&action=add
@api_view(['GET'])
def add_user_event(request):
    username = request.query_params.get('username', None);
    event = request.query_params.get('event', None);
    action = request.query_params.get('action', None);

    if not username:
        return Response({"error": "Username is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    if not event:
        return Response({"error": "Event ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    if not action:
        return Response({"error": "Event ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(username=username)
        if action == "add":
            if event not in user.events:
                user.events.append(event)
        elif action == "remove":
            if event in user.events:
                user.events.remove(event)
        else:
            return Response({"error": "Action invalid."}, status=status.HTTP_400_BAD_REQUEST)
        user.save()

        return Response({"message": "User events updated successfully"}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)