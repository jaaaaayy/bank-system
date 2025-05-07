from rest_framework import serializers
from .models import Card
from .utils import generate_card_number, generate_card_pin, generate_card_cvv

class CardSerializer(serializers.ModelSerializer):
  class Meta:
    model = Card
    fields = '__all__'
    
  def create(self, validated_data):
    main_account = validated_data.get('main_account')
    validated_data['card_number'] = generate_card_number()
    validated_data['card_pin'] = generate_card_pin()
    validated_data['card_cvv'] = generate_card_cvv()
    
    if main_account.account_type in ['Savings', 'Checking']:
      validated_data['card_type'] = 'Debit'
      
    card = Card.objects.create(**validated_data)
    return card