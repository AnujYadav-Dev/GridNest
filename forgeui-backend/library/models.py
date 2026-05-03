from django.db import models
from accounts.models import CustomUser

class Component(models.Model):
    """Seeded component metadata - read-only from frontend"""
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    description = models.TextField()
    is_new = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class SavedComponent(models.Model):
    """User bookmarks a component"""
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='saved_components')
    component = models.ForeignKey(Component, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'component')

    def __str__(self):
        return f"{self.user.username} → {self.component.name}"

class ThemeConfig(models.Model):
    """User-saved custom theme configurations"""
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='themes')
    name = models.CharField(max_length=100)
    config = models.JSONField()   # stores full token overrides as JSON
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.name}"
