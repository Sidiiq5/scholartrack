from django.test import SimpleTestCase


class BackendConfigurationTests(SimpleTestCase):
    def test_api_health_route_is_registered(self):
        response = self.client.get("/api/health/")
        self.assertIn(response.status_code, {200, 503})
        self.assertIn("status", response.json())
        self.assertIn("database", response.json())
