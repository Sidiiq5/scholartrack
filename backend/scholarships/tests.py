import pytest
from django.core.exceptions import ValidationError
from django.db import IntegrityError

from .models import (
    Country,
    DegreeLevel,
    Field,
    FundingType,
    Program,
    Provider,
    Requirement,
    RequirementType,
    Scholarship,
    ScholarshipStatus,
)


@pytest.fixture
def country(db):
    return Country.objects.create(name="Hungary", code="HU")


@pytest.fixture
def provider(country):
    return Provider.objects.create(
        name="Tempus Public Foundation",
        country=country,
        website_url="https://example.com/provider",
    )


@pytest.fixture
def scholarship(provider):
    return Scholarship.objects.create(
        provider=provider,
        name="Example Scholarship",
        description="A test scholarship.",
        degree_levels=[DegreeLevel.MASTERS],
        funding_type=FundingType.FULLY_FUNDED,
        eligibility="Eligible applicants only.",
        deadline="2027-01-15",
        official_application_url="https://example.com/apply",
        official_source_url="https://example.com/source",
    )


def test_country_code_is_unique(country):
    with pytest.raises(IntegrityError):
        Country.objects.create(name="Another Country", code="HU")


def test_field_name_and_slug_are_unique(db):
    Field.objects.create(name="Computer Science", slug="computer-science")
    with pytest.raises(IntegrityError):
        Field.objects.create(name="Computer Science", slug="computer-science-2")


def test_scholarship_defaults_to_draft(scholarship):
    assert scholarship.status == ScholarshipStatus.DRAFT


def test_scholarship_relationships(provider, scholarship):
    field = Field.objects.create(name="Artificial Intelligence", slug="artificial-intelligence")
    scholarship.fields.add(field)

    requirement = Requirement.objects.create(
        scholarship=scholarship,
        type=RequirementType.LANGUAGE,
        title="IELTS",
    )
    program = Program.objects.create(
        scholarship=scholarship,
        name="MSc Artificial Intelligence",
        university="Example University",
        country=provider.country,
        official_url="https://example.com/program",
    )

    assert scholarship.provider == provider
    assert list(scholarship.fields.all()) == [field]
    assert list(scholarship.requirements.all()) == [requirement]
    assert list(scholarship.programs.all()) == [program]


def test_invalid_controlled_value_fails_model_validation(scholarship):
    scholarship.status = "INVALID"
    with pytest.raises(ValidationError):
        scholarship.full_clean()


def test_controlled_choices_are_defined():
    assert {value for value, _ in DegreeLevel.choices} == {"BACHELORS", "MASTERS", "PHD"}
    assert {value for value, _ in FundingType.choices} == {
        "FULLY_FUNDED",
        "PARTIALLY_FUNDED",
        "TUITION_ONLY",
        "STIPEND",
    }
    assert {value for value, _ in RequirementType.choices} == {
        "ACADEMIC",
        "LANGUAGE",
        "DOCUMENT",
        "ELIGIBILITY",
        "FINANCIAL",
        "OTHER",
    }


@pytest.mark.django_db
def test_public_scholarship_list_only_returns_published_and_closed(client, provider):
    published = Scholarship.objects.create(
        provider=provider,
        name="Published Scholarship",
        description="Visible",
        degree_levels=[DegreeLevel.MASTERS],
        funding_type=FundingType.FULLY_FUNDED,
        eligibility="Eligible",
        deadline="2027-01-15",
        official_application_url="https://example.com/apply",
        official_source_url="https://example.com/source",
        status=ScholarshipStatus.PUBLISHED,
    )
    Scholarship.objects.create(
        provider=provider,
        name="Draft Scholarship",
        description="Hidden",
        degree_levels=[DegreeLevel.MASTERS],
        funding_type=FundingType.FULLY_FUNDED,
        eligibility="Eligible",
        deadline="2027-02-15",
        official_application_url="https://example.com/apply-2",
        official_source_url="https://example.com/source-2",
        status=ScholarshipStatus.DRAFT,
    )

    response = client.get("/api/scholarships/")
    assert response.status_code == 200
    assert response.data["count"] == 1
    assert response.data["results"][0]["id"] == published.id


@pytest.mark.django_db
def test_public_scholarship_search_and_filter(client, provider):
    scholarship = Scholarship.objects.create(
        provider=provider,
        name="AI Masters Fellowship",
        description="Computer science opportunity",
        degree_levels=[DegreeLevel.MASTERS],
        funding_type=FundingType.FULLY_FUNDED,
        eligibility="Eligible",
        deadline="2027-01-15",
        official_application_url="https://example.com/apply",
        official_source_url="https://example.com/source",
        status=ScholarshipStatus.PUBLISHED,
    )

    response = client.get("/api/scholarships/?q=AI&degree_level=MASTERS&funding_type=FULLY_FUNDED")
    assert response.status_code == 200
    assert response.data["results"][0]["id"] == scholarship.id


@pytest.mark.django_db
def test_scholarship_detail_is_public(client, scholarship):
    scholarship.status = ScholarshipStatus.PUBLISHED
    scholarship.save(update_fields=["status"])

    response = client.get(f"/api/scholarships/{scholarship.id}/")
    assert response.status_code == 200
    assert response.data["name"] == scholarship.name
