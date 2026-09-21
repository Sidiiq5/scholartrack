from django.db import connection
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


class HealthView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            connection.ensure_connection()
            database_status = "ok"
            status_code = 200
        except Exception:
            database_status = "error"
            status_code = 503

        return Response(
            {
                "status": "ok" if status_code == 200 else "degraded",
                "database": database_status,
            },
            status=status_code,
        )
