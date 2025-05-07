from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from permissions import isSuperuser
from rest_framework.response import Response
from rest_framework import status
from branches.serializers import BranchSerializer
from .models import Branch

@api_view(['POST'])
@permission_classes([IsAuthenticated, isSuperuser])
def create_branch(request):
  serializer = BranchSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response({'message': 'Branch created successfully.', 'branch': serializer.data}, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)