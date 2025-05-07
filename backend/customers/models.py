from django.db import models
from django.core.validators import MinLengthValidator
from django.conf import settings

class Customer(models.Model):
  user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  first_name = models.CharField(max_length=50)
  middle_name = models.CharField(max_length=50, null=True, blank=True)
  last_name = models.CharField(max_length=50)
  date_of_birth = models.DateField()
  address_line_1 = models.CharField(max_length=100)
  address_line_2 = models.CharField(max_length=100, null=True, blank=True)
  city = models.CharField(max_length=50)
  province = models.CharField(max_length=50)
  postal_code = models.CharField(max_length=20)
  phone_number = models.CharField(validators=[MinLengthValidator(11)], max_length=13, unique=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f"{self.first_name} {self.middle_name} {self.last_name}"

