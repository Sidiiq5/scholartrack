from django.utils import timezone
from rest_framework import serializers

from .models import Program, Requirement, Scholarship


class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = ("id", "type", "title", "description", "required")


class ProgramSerializer(serializers.ModelSerializer):
    country = serializers.CharField(source="country.name", read_only=True)
    country_code = serializers.CharField(source="country.code", read_only=True)

    class Meta:
        model = Program
        fields = ("id", "name", "description", "university", "country", "country_code", "official_url")


class ScholarshipListSerializer(serializers.ModelSerializer):
    provider = serializers.CharField(source="provider.name", read_only=True)
    country = serializers.CharField(source="provider.country.name", read_only=True)
    country_code = serializers.CharField(source="provider.country.code", read_only=True)
    field_names = serializers.SlugRelatedField(source="fields", many=True, read_only=True, slug_field="name")
    days_remaining = serializers.SerializerMethodField()

    class Meta:
        model = Scholarship
        fields = (
            "id",
            "name",
            "provider",
            "country",
            "country_code",
            "field_names",
            "degree_levels",
            "funding_type",
            "description",
            "deadline",
            "days_remaining",
            "status",
            "last_verified_at",
        )

    def get_days_remaining(self, obj):
        if obj.status == "CLOSED":
            return None
        return max((obj.deadline - timezone.localdate()).days, 0)


class ScholarshipDetailSerializer(ScholarshipListSerializer):
    requirements = RequirementSerializer(many=True, read_only=True)
    programs = ProgramSerializer(many=True, read_only=True)
    tuition_info = serializers.CharField(read_only=True)
    stipend_info = serializers.CharField(read_only=True)
    other_funding_info = serializers.CharField(read_only=True)
    eligibility = serializers.CharField(read_only=True)
    academic_requirements = serializers.CharField(read_only=True)
    language_requirements = serializers.CharField(read_only=True)
    opening_date = serializers.DateField(read_only=True)
    official_application_url = serializers.URLField(read_only=True)
    official_source_url = serializers.URLField(read_only=True)
    programme_catalogue_url = serializers.URLField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta(ScholarshipListSerializer.Meta):
        fields = ScholarshipListSerializer.Meta.fields + (
            "tuition_info",
            "stipend_info",
            "other_funding_info",
            "eligibility",
            "academic_requirements",
            "language_requirements",
            "opening_date",
            "official_application_url",
            "official_source_url",
            "programme_catalogue_url",
            "requirements",
            "programs",
            "created_at",
            "updated_at",
        )
