from django.http import HttpResponse

def root_view(request):
    return HttpResponse("Welcome to our Shopping List Platform! Navigate to /lists to manage your shopping lists.")
