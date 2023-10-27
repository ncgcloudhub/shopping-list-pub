from django.urls import path
from . import views
from .views import ItemList

urlpatterns = [
    path('', views.home, name='home'),
    path('add/', views.add_item, name='add_item'),
    path('delete/<int:item_id>/', views.delete_item, name='delete_item'),
    path('api/items/', views.ItemList.as_view()),
]

