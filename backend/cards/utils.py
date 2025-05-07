import random
from django.apps import apps

def luhn_algorithm():
  issuer_digits = '531230'
  account_digits = ''.join(str(random.randint(0, 9)) for _ in range(9))
  checksum = calculate_checksum(issuer_digits + account_digits)
  return issuer_digits + account_digits + checksum

def calculate_checksum(partial_card_number):
  def checksum(card_number):
    digits = [int(digit) for digit in card_number]
    odd_sum = sum(digits[-1::-2])
    even_sum = sum([sum(divmod(2 * digit, 10)) for digit in digits[-2::-2]])
    return (odd_sum + even_sum) % 10

  check_digit = checksum(partial_card_number + '0')
  return str((10 - check_digit) % 10)

def generate_card_number():
  Card = apps.get_model('cards', 'Card')
  while True:
    card_number = luhn_algorithm()
    if not Card.objects.filter(card_number=card_number).exists():
      return card_number
  
def generate_card_pin():
  card_pin = ''.join([str(random.randint(0, 9)) for _ in range(6)])
  return card_pin

def generate_card_cvv():
  Card = apps.get_model('cards', 'Card')
  while True:
    card_cvv = ''.join([str(random.randint(0, 9)) for _ in range(4)])
    if not Card.objects.filter(card_cvv=card_cvv).exists():
      return card_cvv