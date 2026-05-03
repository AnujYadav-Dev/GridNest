from django.contrib import admin
from .models import Component, SavedComponent, ThemeConfig

admin.site.register(Component)
admin.site.register(SavedComponent)
admin.site.register(ThemeConfig)
