from rest_framework.decorators import api_view
from transactions.serializers import TransactionSerializer
from rest_framework import status
from rest_framework.response import Response
from .models import Transaction

@api_view(['POST'])
def create_transaction(request):
  serializer = TransactionSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response({ 
      'message': 'Transaction created successfully.', 
      'transaction': serializer.data
      }, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_transactions(request, account_id):
  transactions = Transaction.objects.filter(account=account_id).order_by('-transaction_date')

  serializer = TransactionSerializer(transactions, many=True)
  return Response({'transactions': serializer.data})