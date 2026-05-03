from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SavedComponentViewSet, ThemeConfigViewSet, ComponentListView, ComponentDetailView

router = DefaultRouter()
router.register(r'saved', SavedComponentViewSet, basename='saved-component')
router.register(r'themes', ThemeConfigViewSet, basename='theme-config')

urlpatterns = [
    path('components/', ComponentListView.as_view(), name='component-list'),
    path('components/<slug:slug>/', ComponentDetailView.as_view(), name='component-detail'),
    path('', include(router.urls)),
]
