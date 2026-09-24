from datetime import date

from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Scholarship, ScholarshipStatus
from .serializers import ScholarshipDetailSerializer, ScholarshipListSerializer


class ScholarshipPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 50


class ScholarshipListView(APIView):
    permission_classes = [AllowAny]
    pagination_class = ScholarshipPagination

    def get(self, request):
        queryset = (
            Scholarship.objects.filter(status__in=[ScholarshipStatus.PUBLISHED, ScholarshipStatus.CLOSED])
            .select_related("provider", "provider__country")
            .prefetch_related("fields")
        )

        query = request.query_params.get("q", "").strip()
        if query:
            queryset = queryset.filter(
                Q(name__icontains=query)
                | Q(provider__name__icontains=query)
                | Q(description__icontains=query)
                | Q(fields__name__icontains=query)
                | Q(language_requirements__icontains=query)
            )

        degree_level = request.query_params.get("degree_level")
        if degree_level:
            queryset = queryset.filter(degree_levels__contains=[degree_level])

        field = request.query_params.get("field")
        if field:
            queryset = queryset.filter(fields__slug=field)

        country = request.query_params.get("country")
        if country:
            queryset = queryset.filter(provider__country__code=country.upper())

        funding_type = request.query_params.get("funding_type")
        if funding_type:
            queryset = queryset.filter(funding_type=funding_type)

        language_requirement = request.query_params.get("language_requirement")
        if language_requirement:
            queryset = queryset.filter(language_requirements__icontains=language_requirement)

        deadline_after = request.query_params.get("deadline_after")
        if deadline_after:
            queryset = queryset.filter(deadline__gte=deadline_after)

        deadline_before = request.query_params.get("deadline_before")
        if deadline_before:
            queryset = queryset.filter(deadline__lte=deadline_before)

        sort = request.query_params.get("sort", "deadline_soonest")
        if sort == "deadline_latest":
            queryset = queryset.order_by("-deadline", "name")
        elif sort == "recently_added":
            queryset = queryset.order_by("-created_at", "name")
        elif sort == "recently_verified":
            queryset = queryset.order_by("-last_verified_at", "name")
        else:
            queryset = queryset.order_by("deadline", "name")

        paginator = self.pagination_class()
        page = paginator.paginate_queryset(queryset.distinct(), request)
        serializer = ScholarshipListSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)


class ScholarshipDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        scholarship = get_object_or_404(
            Scholarship.objects.filter(
                status__in=[ScholarshipStatus.PUBLISHED, ScholarshipStatus.CLOSED]
            )
            .select_related("provider", "provider__country")
            .prefetch_related("fields", "requirements", "programs__country"),
            pk=pk,
        )
        return Response(ScholarshipDetailSerializer(scholarship).data)
