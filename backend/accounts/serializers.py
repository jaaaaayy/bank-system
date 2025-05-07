from rest_framework import serializers
from .models import Account
from .utils import generate_account_number
from branches.models import Branch

class AccountSerializer(serializers.ModelSerializer):
  branch = serializers.PrimaryKeyRelatedField(queryset=Branch.objects.all())

  class Meta:
    model = Account
    fields = '__all__'
    
  def to_representation(self, instance):
    representation = super().to_representation(instance)
    representation['branch'] = {
      'branch_name': instance.branch.branch_name
    }
    return representation
  
  def create(self, validated_data):
    account_type = validated_data.get('account_type')
    validated_data['account_name'] = account_type
    validated_data['account_number'] = generate_account_number()

    if account_type in ["Savings", "Checking"]:
      validated_data['product'] = "Deposit"
    
    account = Account.objects.create(**validated_data)
    return account