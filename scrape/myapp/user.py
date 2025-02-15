from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User, FriendRequest
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

# http://127.0.0.1:8000/api/get-profile?username=user
@api_view(['GET'])
def get_profile(request):
    account = request.query_params.get('account', None);
    if not account:
        return Response({"error": "Username is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(username=account)

        return Response({
            "message": "User events updated successfully",
            "nickname": user.nickname,
            "bio": user.bio,
            "interests": user.preference
            }, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST']) 
def update_profile(request):
    try:
        nickname = request.data.get('username')
        bio = request.data.get('biography')
        account = request.data.get('account')

        if not nickname and not bio:
            return Response(
                {"error": "At least one of 'nickname' or 'bio' must be provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get the user object
        user = get_object_or_404(User, username=account)

        # Update the fields if provided
        if nickname:
            user.nickname = nickname
        if bio:
            user.bio = bio
        user.save()

        # Return the updated user info
        return Response(
            {"message": "Profile updated successfully.", "nickname": user.nickname, "bio": user.bio},
            status=status.HTTP_200_OK
        )

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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

# http://127.0.0.1:8000/api/get-likes-id/?username=bbb
@api_view(['GET'])
def get_user_like_id(request):
    username = request.query_params.get('username', None);
    if not username:
        return Response({"error": "Username is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(username=username)

        return Response({
            "message": "User events updated successfully",
            "likes": user.events
            }, status=status.HTTP_200_OK)
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
            if int(event) not in user.events:
                user.events.append(int(event))
        elif action == "remove":
            if int(event) in user.events:
                user.events.remove(int(event))
        else:
            return Response({"error": "Action invalid."}, status=status.HTTP_400_BAD_REQUEST)
        user.save()

        return Response({"message": "User events updated successfully"}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    
# http://127.0.0.1:8000/api/send-request/?sender=8b1053ac-fffc-4a8f-b7f6-d6e3e4bba981&receiver=90950435-23f5-4ee1-b0e1-daeb2406a3ee
@api_view(['GET'])
def send_friend_request(request):
    sender_id = request.query_params.get('sender', None)
    receiver_id = request.query_params.get('receiver', None)
    receiver = get_object_or_404(User, username=receiver_id)
    sender = get_object_or_404(User, username=sender_id)

    if sender == receiver:
        return Response({"error": "You cannot send a friend request to yourself."}, status=status.HTTP_400_BAD_REQUEST)

    # Check if request already exists
    if FriendRequest.objects.filter(sender=sender, receiver=receiver).exists():
        return Response({"error": "Friend request already sent."}, status=status.HTTP_400_BAD_REQUEST)

    # Check if already friends
    if sender.friends.filter(username=receiver.id).exists():
        return Response({"error": "You are already friends."}, status=status.HTTP_400_BAD_REQUEST)

    # Create and save the friend request
    FriendRequest.objects.create(sender=sender, receiver=receiver)
    return Response({"success": f"Friend request sent to {receiver.username}."}, status=status.HTTP_201_CREATED)