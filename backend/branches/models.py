from django.db import models
from django.core.validators import MinLengthValidator

# Create your models here.
class Branch(models.Model):
  BRANCH_CHOICES = [
    ('Dumaguete Bantayan', 'Dumaguete Bantayan'),
    ('Dumaguete San Jose', 'Dumaguete San Jose'),
  ]
  
  branch_name = models.CharField(max_length=50, choices=BRANCH_CHOICES, unique=True)
  address_line_1 = models.CharField(max_length=100)
  address_line_2 = models.CharField(max_length=100, null=True, blank=True)
  city = models.CharField(max_length=50)
  province = models.CharField(max_length=50)
  postal_code = models.CharField(max_length=20)
  phone_number = models.CharField(validators=[MinLengthValidator(11)], max_length=13, unique=True)
  email = models.EmailField(unique=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.branch_name