from rest_framework import permissions


class isRecruiterOrAdmin(permissions.IsAdminUser):

    def has_permission(self, request, view):
        is_admin = super().has_permission(request, view)
        is_recruiter = request.user.is_recruiter
        if (is_admin or is_recruiter):
            return True
        return False
