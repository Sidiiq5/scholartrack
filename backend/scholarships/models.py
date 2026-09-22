from django.contrib.postgres.fields import ArrayField
from django.db import models


class DegreeLevel(models.TextChoices):
    BACHELORS = "BACHELORS", "Bachelor's"
    MASTERS = "MASTERS", "Master's"
    PHD = "PHD", "PhD"


class FundingType(models.TextChoices):
    FULLY_FUNDED = "FULLY_FUNDED", "Fully funded"
    PARTIALLY_FUNDED = "PARTIALLY_FUNDED", "Partially funded"
    TUITION_ONLY = "TUITION_ONLY", "Tuition only"
    STIPEND = "STIPEND", "Stipend"


class ScholarshipStatus(models.TextChoices):
    DRAFT = "DRAFT", "Draft"
    VERIFIED = "VERIFIED", "Verified"
    PUBLISHED = "PUBLISHED", "Published"
    CLOSED = "CLOSED", "Closed"


class RequirementType(models.TextChoices):
    ACADEMIC = "ACADEMIC", "Academic"
    LANGUAGE = "LANGUAGE", "Language"
    DOCUMENT = "DOCUMENT", "Document"
    ELIGIBILITY = "ELIGIBILITY", "Eligibility"
    FINANCIAL = "FINANCIAL", "Financial"
    OTHER = "OTHER", "Other"


class Country(models.Model):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=2, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.code})"


class Provider(models.Model):
    name = models.CharField(max_length=255)
    country = models.ForeignKey(Country, on_delete=models.PROTECT, related_name="providers")
    website_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Field(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Scholarship(models.Model):
    provider = models.ForeignKey(Provider, on_delete=models.PROTECT, related_name="scholarships")
    name = models.CharField(max_length=255)
    description = models.TextField()
    degree_levels = ArrayField(
        models.CharField(max_length=20, choices=DegreeLevel.choices),
        default=list,
    )
    funding_type = models.CharField(max_length=30, choices=FundingType.choices)
    tuition_info = models.TextField(blank=True)
    stipend_info = models.TextField(blank=True)
    other_funding_info = models.TextField(blank=True)
    eligibility = models.TextField()
    academic_requirements = models.TextField(blank=True)
    language_requirements = models.TextField(blank=True)
    opening_date = models.DateField(null=True, blank=True)
    deadline = models.DateField()
    official_application_url = models.URLField()
    official_source_url = models.URLField()
    programme_catalogue_url = models.URLField(blank=True)
    last_verified_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=ScholarshipStatus.choices,
        default=ScholarshipStatus.DRAFT,
    )
    fields = models.ManyToManyField(Field, related_name="scholarships", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["deadline", "name"]
        indexes = [
            models.Index(fields=["status"]),
            models.Index(fields=["deadline"]),
            models.Index(fields=["opening_date"]),
        ]

    def __str__(self):
        return self.name


class Requirement(models.Model):
    scholarship = models.ForeignKey(
        Scholarship,
        on_delete=models.CASCADE,
        related_name="requirements",
    )
    type = models.CharField(max_length=20, choices=RequirementType.choices)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    required = models.BooleanField(default=True)

    class Meta:
        ordering = ["type", "title"]
        indexes = [models.Index(fields=["scholarship", "type"])]

    def __str__(self):
        return self.title


class Program(models.Model):
    scholarship = models.ForeignKey(
        Scholarship,
        on_delete=models.CASCADE,
        related_name="programs",
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    university = models.CharField(max_length=255)
    country = models.ForeignKey(Country, on_delete=models.PROTECT, related_name="programs")
    official_url = models.URLField()

    class Meta:
        ordering = ["university", "name"]

    def __str__(self):
        return f"{self.name} — {self.university}"
