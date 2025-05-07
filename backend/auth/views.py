from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login
from django.utils.timezone import now
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from rest_framework.response import Response
from users.models import User
from rest_framework import status
from customers.models import Customer

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
  username = request.data.get('username')
  password = request.data.get('password')

  user = authenticate(request, username=username, password=password)

  if user is not None:
    login(request, user)
    user.last_login = now()
    user.save(update_fields=['last_login'])

    refresh = RefreshToken.for_user(user)
    access = str(refresh.access_token)
    refresh = str(refresh)
    access_lifetime = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()
    refresh_lifetime = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds()

    try:
      customer = Customer.objects.get(user=user.id)
      customer_id = customer.id
      customer_full_name = f"{customer.first_name} {customer.last_name}"
    except Customer.DoesNotExist:
      customer_id = None
      customer_full_name = None

    user = {
      'customer_id': customer_id,
      'full_name': customer_full_name,
      'last_login': user.last_login,
      'last_failed_login': user.last_failed_login,
      'access': access,
      'refresh': refresh,
      'access_lifetime': access_lifetime,
      'refresh_lifetime': refresh_lifetime,
    }

    return Response({'message': 'Login successful.', 'user': user})
  else:
    try:
      user = User.objects.get(username=username)
      user.last_failed_login = now()
      user.save(update_fields=['last_failed_login'])
    except User.DoesNotExist:
      pass

    return Response({'detail': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)
  
@api_view(['POST'])
def logout(request):
  try:
    refresh = request.data.get('refresh')
    token = RefreshToken(refresh)
    token.blacklist()
    return Response({'message': 'Logout successful.'})
  except Exception as e:
    return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)