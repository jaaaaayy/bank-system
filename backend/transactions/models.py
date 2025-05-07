from django.db import models
from accounts.models import Account
from branches.models import Branch

class Transaction(models.Model):
  TRANSACTION_TYPE_CHOICES = (
    ('ATM Deposit', 'ATM Deposit'),
    ('ATM Withdrawal', 'ATM Withdrawal'),
    ('Fund Transfer', 'Fund Transfer'),
  )
  
  account = models.ForeignKey(Account, related_name='transaction_owner', on_delete=models.CASCADE)
  branch = models.ForeignKey(Branch, on_delete=models.CASCADE, blank=True, null=True)
  transaction_type = models.CharField(max_length=50, choices=TRANSACTION_TYPE_CHOICES)
  transaction_date = models.DateTimeField(auto_now_add=True)
  amount = models.DecimalField(max_digits=15, decimal_places=2)
  from_account = models.ForeignKey(Account, related_name='sender', on_delete=models.CASCADE, null=True, blank=True)
  to_account = models.ForeignKey(Account, related_name='recipient', on_delete=models.CASCADE, null=True, blank=True)
  running_balance = models.DecimalField(max_digits=15, decimal_places=2, blank=True)
  note = models.TextField(blank=True, null=True)

  def __str__(self):
    return self.transaction_type