from django.urls import path
from branches import views

urlpatterns = [
  path('create/', views.create_branch),
]