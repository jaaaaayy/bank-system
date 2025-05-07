from django.urls import path
from accounts import views

urlpatterns = [
  path('open/', views.open_account),
  path('<int:account_id>/get/', views.get_account),
  path('<int:account_id>/update/', views.update_account),
  path('<int:customer_id>/add/', views.add_account),
  path('<int:customer_id>/', views.get_accounts),
]