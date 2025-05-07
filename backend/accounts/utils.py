import random
from django.apps import apps

def generate_account_number():
  Account = apps.get_model('accounts', 'Account')
  while True:
    account_number = ''.join([str(random.randint(0, 9)) for _ in range(10)])
    if not Account.objects.filter(account_number=account_number).exists():
      return account_number