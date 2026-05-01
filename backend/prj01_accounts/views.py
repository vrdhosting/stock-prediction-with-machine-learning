from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import status,generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
#from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.views import APIView

# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Allow anyone to register
    

class SecuredView(APIView):
    permission_classes = [IsAuthenticated]  # Change to appropriate permissions for secured access

    def get(self, request):
        response = {
            'status': 'success',
            'message': 'This is a secured view accessible only to authenticated users.'
        }
        return Response(response)


