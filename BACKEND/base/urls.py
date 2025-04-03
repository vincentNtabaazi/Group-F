from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from .views import (
    register_user, login_user, logout_user, get_profile, submit_issue,
    assign_issue, resolve_issue, delete_issue, get_user, issue_list, update_issue
)

urlpatterns = [
    # Authentication
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Profile
    path('profile/', get_profile, name='get_profile'),

    # Issues
    path('issues/submit/', submit_issue, name='submit_issue'),
    path('issues/list/', issue_list, name='issue_list'),
    path('issues/<int:issue_id>/assign/', assign_issue, name='assign_issue'),
    path('issues/<int:issue_id>/resolve/', resolve_issue, name='resolve_issue'),
    path('issues/<int:issue_id>/delete/', delete_issue, name='delete_issue'),
    path('issues/<int:pk>/update/', update_issue, name='delete_issue'),

    # Users
    path('user/<int:id>', get_user, name='get_user')
]
