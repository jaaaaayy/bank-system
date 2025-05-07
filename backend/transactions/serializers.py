from rest_framework import serializers
from .models import Transaction
from accounts.models import Account
from branches.models import Branch

class TransactionSerializer(serializers.ModelSerializer):
  to_account_number = serializers.CharField(write_only=True, required=False)
  description = serializers.SerializerMethodField()
  # transaction_type_and_branch_name = serializers.SerializerMethodField()
  # counterparty_details = serializers.SerializerMethodField()
  
  class Meta:
    model = Transaction
    fields = ['id', 'account', 'branch', 'transaction_type', 'transaction_date', 'amount', 'description', 'from_account', 'to_account', 'running_balance', 'note', 'to_account_number', 'description']

  def get_description(self, obj):
    if obj.transaction_type in ['ATM Deposit', 'ATM Withdrawal']:
      return f"{obj.transaction_type} - Jay Bank @{obj.branch.branch_name if obj.branch else ''}"
    elif obj.transaction_type == "Fund Transfer":
      if obj.account == obj.from_account:
        return f"{obj.transaction_type} - To: {obj.to_account.account_holder.first_name} {obj.to_account.account_holder.last_name} (XXXXXX{obj.to_account.account_number[-4:]})"
      elif obj.account == obj.to_account:
        return f"{obj.transaction_type} - From: {obj.from_account.account_holder.first_name} {obj.from_account.account_holder.last_name} (XXXXXX{obj.from_account.account_number[-4:]})"
    return None
  # def get_transaction_type_and_branch_name(self, obj):
  #   if obj.transaction_type in ['ATM Deposit', 'ATM Withdrawal']:
  #     return f"{obj.transaction_type} - Jay Bank @{obj.branch.branch_name if obj.branch else ''}"
  #   return obj.transaction_type
  
  # def get_counterparty_details(self, obj):
  #   if obj.transaction_type == 'Fund Transfer':
  #     if obj.counterparty:
  #       direction = 'To:' if obj.amount < 0 else 'From:'
  #       return f"{direction} {obj.counterparty.account_holder.first_name} {obj.counterparty.account_holder.last_name} (XXXXXX{obj.counterparty.account_number[-4:]})"
  #   return None
    
  def validate(self, data):
    account = data.get('account')
    amount = data.get('amount')
    
    if amount < 300:
      raise serializers.ValidationError({"detail": "Amount should be at least 300."})
    
    if data['transaction_type'] == 'ATM Withdrawal':
      if account.current_balance < amount:
        raise serializers.ValidationError({"detail": "Insufficient balance!"})
    elif data['transaction_type'] == 'Fund Transfer':
      from_account = data.get('from_account')
      to_account_number = data.get('to_account_number', None)
      
      if from_account.current_balance < amount:
        raise serializers.ValidationError({"detail": "Insufficient balance!"})
      
      if not to_account_number:
        raise serializers.ValidationError({"detail": "Recipient's account number is required for fund transfer."})
      
      try:
        to_account = Account.objects.get(account_number=to_account_number)
      except Account.DoesNotExist:
        raise serializers.ValidationError({"detail": "Recipient's account number not found."})
      
      if from_account.account_number == to_account.account_number:
        raise serializers.ValidationError({"detail": "Both sender's and recipient's account number cannot be the same."})

    return data
    
  def create(self, validated_data):
    transaction_type = validated_data.get('transaction_type')
    account = validated_data.pop('account')
    amount = validated_data.pop('amount')
    branch = validated_data.pop('branch', None)
    
    if transaction_type == 'ATM Deposit':
      account.current_balance += amount
      account.save()
    elif transaction_type == 'ATM Withdrawal':
      account.current_balance -= amount
      account.save()
      amount = -amount
    elif transaction_type == 'Fund Transfer':
      from_account = validated_data.pop('from_account')
      to_account_number = validated_data.pop('to_account_number')

      from_account.current_balance -= amount
      from_account.save()

      to_account = Account.objects.get(account_number=to_account_number)
      to_account.current_balance += amount
      to_account.save()
      
      from_account_transaction = Transaction.objects.create(account=account, amount=-amount, running_balance = from_account.current_balance, from_account=from_account, to_account=to_account, **validated_data)
      Transaction.objects.create(account=to_account, amount=amount, running_balance = to_account.current_balance, from_account=from_account, to_account=to_account, **validated_data)
      
      return from_account_transaction
      
    transaction = Transaction.objects.create(account=account, branch=branch, amount=amount, running_balance = account.current_balance, **validated_data)
    return transaction