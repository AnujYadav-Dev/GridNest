from rest_framework import viewsets, permissions, generics
from .models import Component, SavedComponent, ThemeConfig
from .serializers import ComponentSerializer, SavedComponentSerializer, ThemeConfigSerializer

class ComponentListView(generics.ListAPIView):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer
    permission_classes = [permissions.AllowAny]

class ComponentDetailView(generics.RetrieveAPIView):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

class SavedComponentViewSet(viewsets.ModelViewSet):
    serializer_class = SavedComponentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedComponent.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ThemeConfigViewSet(viewsets.ModelViewSet):
    serializer_class = ThemeConfigSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ThemeConfig.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
