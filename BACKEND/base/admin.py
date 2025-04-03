from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Student, Lecturer, Registrar, Issue, Notification, Department

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'role', 'is_active', 'is_verified')
    list_filter = ('role', 'is_verified', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('role', 'is_verified', 'verification_token')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_active', 'is_staff')
        }),
    )
    search_fields = ('email',)
    ordering = ('email',)
    readonly_fields = ('verification_token',)

admin.site.register(User, CustomUserAdmin)
admin.site.register(Student)
admin.site.register(Lecturer)
admin.site.register(Registrar)
admin.site.register(Issue)
admin.site.register(Notification)
admin.site.register(Department)
