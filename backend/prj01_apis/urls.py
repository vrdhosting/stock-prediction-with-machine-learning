from django.urls import path
from prj01_accounts import views as UserViews
from .views import StockPredictionAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)



urlpatterns = [
    path('register/', UserViews.RegisterView.as_view(), name='register'),
    #path('login/', UserViews.LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('secured-view/', UserViews.SecuredView.as_view(), name='secured_view'),
    
    # Prediction API View
    path('predict/', StockPredictionAPIView.as_view(),name='predict'),
    
]