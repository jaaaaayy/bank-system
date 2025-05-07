from django.db import models
from accounts.models import Account
from django.core.validators import MinLengthValidator

class Card(models.Model):
  CARD_TYPE_CHOICES = {
    ('Debit', 'Debit'),
  }
  
  STATUS_CHOICES = {
    ('Active', 'Active'),
    ('Inactive', 'Inactive'),
    ('Blocked', 'Blocked'),
    ('Expired', 'Expired'),
    ('Cancelled', 'Cancelled'),
    ('Pending', 'Pending'),
  }
  
  main_account = models.OneToOneField(Account, on_delete=models.CASCADE)
  card_number = models.CharField(max_length=16, unique=True, blank=True)
  card_pin = models.CharField(validators=[MinLengthValidator(6)], max_length=6, unique=True, blank=True)
  card_type = models.CharField(max_length=10, choices=CARD_TYPE_CHOICES, blank=True)
  card_cvv = models.CharField(validators=[MinLengthValidator(4)], max_length=4, unique=True, blank=True)
  status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Active')
  issued_at = models.DateField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.card_type