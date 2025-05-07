from django.urls import path
from transactions import views

urlpatterns = [
  path('create/', views.create_transaction),
  path('<int:account_id>/get/', views.get_transactions),
]