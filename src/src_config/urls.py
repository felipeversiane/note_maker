from django.urls import re_path, path, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from myapp.views import MyTokenObtainPairView
from myapp.urls import router as router_myapp
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
    TokenBlacklistView
)


router = routers.DefaultRouter()    

urlpatterns = [
    re_path('admin/', admin.site.urls),
    path('', include('myapp.urls')),
    re_path(r'api/', include(router.urls)),
    re_path(r'api/myapp/', include(router_myapp.urls)),
    re_path(r'api-auth/', include('rest_framework.urls', namespace='rest_framework')),

     #SIMPLE JWT
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
]



urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)