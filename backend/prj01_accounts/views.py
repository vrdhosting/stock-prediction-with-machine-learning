from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import status,generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
#from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny

# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Allow anyone to register


