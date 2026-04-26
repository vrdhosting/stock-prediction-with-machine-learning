from django.urls import path
from . import views as UserViews

urlpatterns = [
    path('register/', UserViews.RegisterView.as_view(), name='register'),
    
]   