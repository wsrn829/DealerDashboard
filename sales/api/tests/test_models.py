from django.test import TestCase, Client

class Tests(TestCase):
    def test_automobileVO(self):
        try:
            from sales_rest.models import AutomobileVO
        except ModuleNotFoundError:
            self.fail("Could not find 'AutoMobileVO Model'")

    def test_sale(self):
        try:
            from sales_rest.models import Sale
        except ModuleNotFoundError:
            self.fail("Could not find 'Sale Model'")

    def test_salesperson(self):
        try:
            from sales_rest.models import Salesperson
        except ModuleNotFoundError:
            self.fail("Could not find 'Salesperson Model'")

    def test_customer(self):
        try:
            from sales_rest.models import Customer
        except ModuleNotFoundError:
            self.fail("Could not find 'Customer Model'")
