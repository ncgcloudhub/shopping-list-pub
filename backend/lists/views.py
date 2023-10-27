from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Item, Category
from .forms import ItemForm  # We'll create this form next
from django.contrib.auth.decorators import login_required



@login_required
def home(request):
    if request.method == "POST":
        name = request.POST.get('name')
        category_name = request.POST.get('category')
        category, _ = Category.objects.get_or_create(name=category_name)
        Item.objects.create(name=name, category=category, user=request.user)
        return redirect('home')
    
    items = Item.objects.filter(user=request.user)
    return render(request, 'lists/home.html', {'items': items})

@login_required
def delete_item(request, item_id):
    item = Item.objects.get(id=item_id, user=request.user)
    item.delete()
    return redirect('home')


# Create your views here.
def home(request):
    return HttpResponse("Welcome to the Shopping List App!")

def all_items(request):
    items = Item.objects.all()
    return render(request, 'lists/all_items.html', {'items': items})

def add_item(request):
    if request.method == 'POST':
        form = ItemForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('all_items')
    else:
        form = ItemForm()
    return render(request, 'lists/add_item.html', {'form': form})