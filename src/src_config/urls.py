from django.urls import re_path, path, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.utils.translation import ugettext as _
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from myapp.urls import router as router_myapp

router = routers.DefaultRouter()

urlpatterns = [
    re_path(_('admin/'), admin.site.urls),
    path('', include('myapp.urls')),
    re_path(r'api/', include(router.urls)),
    re_path(r'api/myapp/', include(router_myapp.urls)),
    re_path(r'api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    re_path(r'auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    re_path(r'auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)