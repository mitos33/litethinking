from django.contrib import admin
from .models import Business

# Register your models here.


class TodoAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'nit', 'phone')


admin.site.register(Business, TodoAdmin)
