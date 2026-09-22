from django.contrib import admin

from .models import Country, Field, Program, Provider, Requirement, Scholarship


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ("name", "code")
    search_fields = ("name", "code")
    ordering = ("name",)


@admin.register(Provider)
class ProviderAdmin(admin.ModelAdmin):
    list_display = ("name", "country", "website_url")
    list_filter = ("country",)
    search_fields = ("name",)


@admin.register(Field)
class FieldAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name", "slug")


class RequirementInline(admin.TabularInline):
    model = Requirement
    extra = 0


class ProgramInline(admin.TabularInline):
    model = Program
    extra = 0


@admin.register(Scholarship)
class ScholarshipAdmin(admin.ModelAdmin):
    list_display = ("name", "provider", "status", "funding_type", "deadline", "last_verified_at")
    list_filter = ("status", "funding_type", "degree_levels", "provider")
    search_fields = ("name", "provider__name", "description", "fields__name")
    filter_horizontal = ("fields",)
    inlines = (RequirementInline, ProgramInline)
    date_hierarchy = "deadline"
    readonly_fields = ("created_at", "updated_at")


@admin.register(Requirement)
class RequirementAdmin(admin.ModelAdmin):
    list_display = ("title", "scholarship", "type", "required")
    list_filter = ("type", "required")
    search_fields = ("title", "scholarship__name")


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ("name", "university", "country", "scholarship")
    list_filter = ("country",)
    search_fields = ("name", "university", "scholarship__name")
