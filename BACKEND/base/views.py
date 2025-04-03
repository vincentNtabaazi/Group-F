from django.contrib.auth import authenticate, login, get_user_model
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Student, Lecturer, Registrar, Issue, Notification
from .serializers import (
    UserSerializer, StudentSerializer, LecturerSerializer, RegistrarSerializer,
    IssueSerializer, IssueCreateSerializer, NotificationSerializer
)

User = get_user_model()

# --- USER REGISTRATION & AUTHENTICATION ---

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """Register a new user with a role-based serializer"""
    role = request.data.get('role')
    
    serializer_mapping = {
        'student': StudentSerializer,
        'lecturer': LecturerSerializer,
        'registrar': RegistrarSerializer
    }
    
    serializer_class = serializer_mapping.get(role)
    if not serializer_class:
        return Response({"error": "Invalid role specified."}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = serializer_class(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    """Authenticate user and return JWT tokens"""
    email = request.data.get('email')
    password = request.data.get('password')
    
    user = authenticate(request, email=email, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Login successful",
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),
            "user": UserSerializer(user).data
        }, status=status.HTTP_200_OK)
    
    return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    """Blacklist the refresh token on logout"""
    try:
        refresh_token = request.data.get('refresh_token')
        if not refresh_token:
            return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"message": "Successfully logged out"}, status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# --- PROFILE RETRIEVAL ---

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    """Retrieve profile based on user role"""
    if hasattr(request.user, 'student'):
        serializer = StudentSerializer(request.user.student)
    elif hasattr(request.user, 'lecturer'):
        serializer = LecturerSerializer(request.user.lecturer)
    elif hasattr(request.user, 'registrar'):
        serializer = RegistrarSerializer(request.user.registrar)
    else:
        return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
    
    return Response(serializer.data, status=status.HTTP_200_OK)

# --- ISSUE MANAGEMENT ---

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_issue(request):
    data = request.data.copy()
    data['submitted_by'] = request.user.id
    """Allow students to submit issues"""
    if request.user.role != 'student':
        return Response({"error": "Only students can submit issues."}, status=status.HTTP_403_FORBIDDEN)
    
    serializer = IssueCreateSerializer(data=data)
    if serializer.is_valid():
        issue = serializer.save()
        return Response(IssueSerializer(issue).data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def issue_list(request):
    print(request.user.role)
    # at the moment for the lecturer am fectching all issues but after you set up lecturers with departments and courses well
    # you can further improve this query to filter depending on department or course
    if request.user.role == "lecturer":
        issues = Issue.objects.all()
    else:
        issues = Issue.objects.filter(submitted_by=request.user.id)
    try:
        serializerData = IssueSerializer(issues, many=True).data
        return Response(serializerData, status=status.HTTP_200_OK)
    except:
        return Response({"error": "Error while fetching issues"}, status=status.HTTP_404_NOT_FOUND)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def assign_issue(request, issue_id):
    """Allow registrars to assign issues to lecturers"""
    if request.user.role != 'registrar':
        return Response({"error": "Only registrars can assign issues."}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        issue = Issue.objects.get(id=issue_id)
        lecturer = Lecturer.objects.get(user__id=request.data.get('lecturer_id'))
        
        issue.assigned_to = lecturer
        issue.status = 'in_progress'
        issue.save()
        
        return Response(IssueSerializer(issue).data, status=status.HTTP_200_OK)
    except Issue.DoesNotExist:
        return Response({"error": "Issue not found."}, status=status.HTTP_404_NOT_FOUND)
    except Lecturer.DoesNotExist:
        return Response({"error": "Lecturer not found."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def resolve_issue(request, issue_id):
    """Allow assigned lecturers to resolve issues"""
    if request.user.role != 'lecturer':
        return Response({"error": "Only lecturers can resolve issues."}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        issue = Issue.objects.get(id=issue_id)
        if issue.assigned_to != request.user:
            return Response({"error": "You can only resolve issues assigned to you."}, status=status.HTTP_403_FORBIDDEN)
        
        issue.status = 'resolved'
        issue.resolved_at = timezone.now()
        issue.save()
        
        return Response(IssueSerializer(issue).data, status=status.HTTP_200_OK)
    except Issue.DoesNotExist:
        return Response({"error": "Issue not found."}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_issue(request, pk):
    print(request.data)
    print(pk)
    try:
        issue = Issue.objects.get(id=pk)
        print(issue)
    except Issue.DoesNotExist:
        return Response({"error": "Issue not found or not submitted by you."}, status=status.HTTP_404_NOT_FOUND)

    serializer = IssueSerializer(issue, data=request.data, partial=True)
    print(serializer.initial_data)
    
    if serializer.is_valid():
        serializer.save()
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_issue(request, issue_id):
    """Allow registrars to delete an issue"""
    if request.user.role != 'registrar':
        return Response({"error": "Only registrars can delete issues."}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        issue = Issue.objects.get(id=issue_id)
        issue.delete()
        return Response({"message": "Issue deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except Issue.DoesNotExist:
        return Response({"error": "Issue not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET']) 
@permission_classes([IsAuthenticated])
def get_user (request, id):
    user = User.objects.get(id=id)
    user_data = UserSerializer(user).data
    return Response(user_data, status=status.HTTP_200_OK)
