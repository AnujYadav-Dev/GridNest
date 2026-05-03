from rest_framework import serializers
from .models import Component, SavedComponent, ThemeConfig

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = ['id', 'slug', 'name', 'category', 'description', 'is_new', 'created_at']

class SavedComponentSerializer(serializers.ModelSerializer):
    component = ComponentSerializer(read_only=True)
    component_id = serializers.PrimaryKeyRelatedField(
        queryset=Component.objects.all(), source='component', write_only=True
    )

    class Meta:
        model = SavedComponent
        fields = ['id', 'component', 'component_id', 'saved_at']

class ThemeConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThemeConfig
        fields = ['id', 'name', 'config', 'is_default', 'created_at', 'updated_at']
