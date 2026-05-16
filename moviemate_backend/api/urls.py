from rest_framework.routers import DefaultRouter
from .views import MediaItemViewSet

router = DefaultRouter()
router.register(r'items', MediaItemViewSet, basename='mediaitem')
urlpatterns = router.urls