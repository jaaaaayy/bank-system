from django.db import models
from cards.models import Card
from accounts.models import Account

class CardLinkedAccount(models.Model):
  card = models.ForeignKey(Card, on_delete=models.CASCADE, related_name="linked_accounts")
  account = models.OneToOneField(Account, on_delete=models.CASCADE)
  created_at = models.DateField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f"{self.card.card_number} - {self.account.account_name}"