from django.urls import path
from  prj01_accounts import views as UserViews


urlpatterns = [
    path('register/', UserViews.RegisterView.as_view(), name='register'),
    #path('login/', UserViews.LoginView.as_view(), name='login'),
    
]