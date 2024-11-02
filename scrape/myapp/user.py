from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User
from .serializers import UserSerializer
from django.contrib.auth.hashers import check_password

# http://127.0.0.1:8000/api/create-account/
@api_view(['POST'])
def create_user_account(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid(): # serializer helps to validate data
        serializer.save()
        return Response({"message": "User account created successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) # username collision, no pw, etc.

# http://127.0.0.1:8000/api/check-account?username=user&password=password
@api_view(['GET'])
def check_user_account(request):
    username = request.query_params.get('username', None);
    password = request.query_params.get('password', None);
    
    try:
        user = User.objects.get(username=username);
    except User.DoesNotExist:
        return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)

    if check_password(password, user.password): # django's dehashing function
        return Response({"message": "Login successful!"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

#http://127.0.0.1:8000/api/update-preference/?username=bbb&preference=travel&preference=music&preference={%22travel%22,%22music%22}
@api_view(['GET'])
def update_user_preference(request):
    username = request.query_params.get('username', None);
    preference = request.query_params.get('preference', []);
    print(preference)

    if not username:
        return Response({"error": "Username is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(username=username)
        user.preference = preference
        user.save()

        return Response({"message": "User preference updated successfully"}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)