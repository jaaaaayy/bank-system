from django.db import models
from customers.models import Customer
from django.core.validators import MinLengthValidator
from branches.models import Branch

class Account(models.Model):
  PRODUCT_CHOICES = (
    ('Deposit', 'Deposit'),
  )

  ACCOUNT_TYPE_CHOICES = (
    ('Savings', 'Savings'),
    ('Checking', 'Checking'),
  )

  account_holder = models.ForeignKey(Customer, on_delete=models.CASCADE)
  branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
  product = models.CharField(max_length=20, blank=True)
  account_name = models.CharField(max_length=50, blank=True)
  account_number = models.CharField(validators=[MinLengthValidator(10)], max_length=10, unique=True, blank=True)
  account_type = models.CharField(max_length=20, choices=ACCOUNT_TYPE_CHOICES)
  current_balance = models.DecimalField(max_digits=15, decimal_places=2)
  is_active = models.BooleanField(default=True)
  opened_at = models.DateTimeField(auto_now_add=True)
  closed_at = models.DateTimeField(null=True, blank=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.account_name