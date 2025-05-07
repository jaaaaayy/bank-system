from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.core.validators import MinLengthValidator

class UserManager(BaseUserManager):
  def create_user(self, email, password=None, **extra_fields):
    if not email:
      raise ValueError('The email field must be set')

    email = self.normalize_email(email)
    user = self.model(email=email,  **extra_fields)
    user.set_password(password)
    user.save()
    return user
  
  def create_superuser(self, email, password=None, **extra_fields):
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)

    user = self.create_user(email=email, password=password, **extra_fields)
    user.save()
    return user

class User(AbstractBaseUser, PermissionsMixin):
  STATUS_CHOICES = (
    ('Active', 'Active'),
    ('Inactive', 'Inactive'),
    ('Closed', 'Closed'),
  )
  
  username = models.CharField(validators=[MinLengthValidator(6)], max_length=30, unique=True)
  email = models.EmailField(unique=True)
  password = models.CharField(validators=[MinLengthValidator(8)], max_length=255)
  status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Active')
  is_staff = models.BooleanField(default=False)
  last_login = models.DateTimeField(null=True, blank=True)
  last_failed_login = models.DateTimeField(null=True, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  objects = UserManager()

  USERNAME_FIELD = 'username'
  REQUIRED_FIELDS = ['email']

  def __str__(self):
    return self.username