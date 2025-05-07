from rest_framework.decorators import api_view
from customers.serializers import CustomerSerializer
from accounts.serializers import AccountSerializer
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from cards.serializers import CardSerializer
from .models import Account
from users.serializers import UserSerializer
from card_linked_accounts.serializers import CardLinkedAccountSerializer
from cards.models import Card

@api_view(['POST'])
def open_account(request):
  try:
    with transaction.atomic():
      user_data = {
        'username': request.data.get('username'),
        'email': request.data.get('email'),
        'password': request.data.get('password'),
      }
      
      user_serializer = UserSerializer(data=user_data)
      
      if not user_serializer.is_valid():
        raise Exception(user_serializer.errors)
      
      user = user_serializer.save()
      
      customer_data = {
        'user': user.id,
        'first_name': request.data.get('first_name'),
        'middle_name': request.data.get('middle_name'),
        'last_name': request.data.get('last_name'),
        'date_of_birth': request.data.get('date_of_birth'),
        'address_line_1': request.data.get('address_line_1'),
        'address_line_2': request.data.get('address_line_2'),
        'city': request.data.get('city'),
        'province': request.data.get('province'),
        'postal_code': request.data.get('postal_code'),
        'phone_number': request.data.get('phone_number'),
      }
      
      customer_serializer = CustomerSerializer(data=customer_data)
      
      if not customer_serializer.is_valid():
        raise Exception(customer_serializer.errors)
      
      customer = customer_serializer.save()

      account_data = {
        'account_holder': customer.id,
        'branch': request.data.get('branch'),
        'account_type': request.data.get('account_type'),
        'current_balance': request.data.get('initial_balance'),
      }
      
      account_serializer = AccountSerializer(data=account_data)
      
      if not account_serializer.is_valid():
        raise Exception(account_serializer.errors)
      
      account = account_serializer.save()
      
      card_data = {
        'main_account': account.id
      }
      
      card_serializer = CardSerializer(data=card_data)
      
      if not card_serializer.is_valid():
        raise Exception(card_serializer.errors)
      
      card_serializer.save()
      
      return Response({
        'message' : 'Account opened successfully.', 
        'user': user_serializer.data, 
        'customer': customer_serializer.data, 
        'account': account_serializer.data, 
        'card': card_serializer.data
        }, status=status.HTTP_201_CREATED)
  except Exception as e:
    return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_account(request, account_id):
  try:
    account = Account.objects.get(pk=account_id)
  except Account.DoesNotExist:
    return Response({'detail': 'Account not found.'}, status=status.HTTP_404_NOT_FOUND)
  
  serializer = AccountSerializer(account)
  return Response({'account': serializer.data})
  
@api_view(['PATCH'])
def update_account(request, account_id):
  try:
    account = Account.objects.get(pk=account_id)
  except Account.DoesNotExist:
    return Response({'detail': 'Account not found.'}, status=status.HTTP_404_NOT_FOUND)
  
  serializer = AccountSerializer(account, data=request.data, partial=True)
    
  if serializer.is_valid():
    serializer.save()
    return Response({'message': 'Account updated successfully.', 'account': serializer.data})
  
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['POST'])
def add_account(request, customer_id):
  try:
    with transaction.atomic():
      card = Card.objects.filter(main_account__account_holder_id=customer_id).first()
      
      if not card:
        return Response({'detail': 'Card not found.'}, status=status.HTTP_404_NOT_FOUND)
      
      main_account = card.main_account

      account_data = {
        'account_holder': customer_id,
        'account_type': request.data.get('account_type'),
        'branch': main_account.branch.id,
        'current_balance': 0,
      }
      
      account_serializer = AccountSerializer(data=account_data)
      
      if not account_serializer.is_valid():
        raise Exception(account_serializer.errors)
      
      account = account_serializer.save()

      card_linked_account_data = {
        'card': card.id,
        'account': account.id
      }
      
      card_linked_account_serializer = CardLinkedAccountSerializer(data=card_linked_account_data)
      
      if not card_linked_account_serializer.is_valid():
        raise Exception(card_linked_account_serializer.errors)
      
      card_linked_account_serializer.save()
      
      return Response({
        'message': 'Account created successfully.', 
        'account': account_serializer.data,
        'card linked account': card_linked_account_serializer.data
        }, status=status.HTTP_201_CREATED)
  except Exception as e:
    return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['GET'])
def get_accounts(request, customer_id):
  accounts = Account.objects.filter(account_holder=customer_id).select_related('branch')
  
  if not accounts.exists():
    return Response({'detail': 'No accounts found for this customer.'}, status=status.HTTP_404_NOT_FOUND)

  serializer = AccountSerializer(accounts, many=True)
  return Response({'accounts': serializer.data})