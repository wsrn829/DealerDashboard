from django.test import TestCase, Client

class Tests(TestCase):
    def test_automobileVO(self):
        try:
            from service_rest.models import AutomobileVO
        except ModuleNotFoundError:
            self.fail("Could not find 'AutomobileVO Model'")

    def test_technician(self):
        try:
            from service_rest.models import Technician
        except ModuleNotFoundError:
            self.fail("Could not find 'Technician Model'")

    def test_appointment(self):
        try:
            from service_rest.models import Appointment
        except ModuleNotFoundError:
            self.fail("Could not find 'Appointment Model'")
