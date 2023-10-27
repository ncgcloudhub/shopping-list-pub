from django.contrib import admin
from .models import Item, Category

# Register your models here.

from django.contrib import admin
from .models import Item, Category

class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'added_date')
    search_fields = ['name']
    list_filter = ('category',)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ['name']

admin.site.register(Item, ItemAdmin)
admin.site.register(Category, CategoryAdmin)
