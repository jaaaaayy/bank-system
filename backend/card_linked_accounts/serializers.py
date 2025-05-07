from rest_framework import serializers
from .models import CardLinkedAccount

class CardLinkedAccountSerializer(serializers.ModelSerializer):
  class Meta:
    model = CardLinkedAccount
    fields = '__all__'

  def validate_card(self, card):
    if card.linked_accounts.count() == 8:
      raise serializers.ValidationError("A card can only be linked to a maximum of 8 accounts.")
    return card