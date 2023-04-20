import json
from sales_rest.models import Salesperson, Customer, Sale, AutomobileVO
from django.test import TransactionTestCase, Client

class Tests(TransactionTestCase):
    ####SALESPEOPLE ENDPOINTS
    def test_sales_people_list(self):
        Salesperson.objects.create(first_name="first", last_name="last", employee_id=1111)

        client = Client()
        response = client.get("/api/salespeople/")
        data = response.json()

        self.assertEqual(response.status_code, 200, msg="Did not get a 200 OK for list salespeople.")
        self.assertTrue('salespeople' in data, msg="Did not give response with salespeople field.")
        self.assertEqual(len(data['salespeople']), 1, msg="Did not return correct number of salespeople.")

    def test_sales_people_create(self):
        client = Client()
        body = {
            "first_name": "first",
            "last_name": "last",
            "employee_id": 1
        }
        response = client.post("/api/salespeople/", json.dumps(body), content_type='application/json')
        data = response.json()

        self.assertEqual(response.status_code, 200, msg="Did not get a 200 OK for the path projects/")

    def test_sales_people_delete(self):
        Salesperson.objects.create(first_name="first", last_name="last", employee_id=1)

        client = Client()
        response = client.delete("/api/salespeople/1/")
        self.assertEqual(response.status_code, 200, msg="Did not get a 200 OK for salespeople delete.")

        response = client.delete("/api/salespeople/1/")
        self.assertEqual(response.status_code, 404, msg="Did not get a 404 OK salespeople delete of an unknown id.")

    ####CUSTOMER ENDPOINTS
    def test_customer_list(self):
        Customer.objects.create(first_name="first", last_name="last", address="222 22nd Street", phone_number="222-222 2222")

        client = Client()
        response = client.get("/api/customers/")
        data = response.json()

        self.assertEqual(response.status_code, 200, msg="Did not get a 200 OK for list customer.")
        self.assertTrue('customers' in data, msg="Did not give response with customer field.")
        self.assertEqual(len(data['customers']), 1, msg="Did not return correct number of customer.")

    def test_customer_create(self):
        client = Client()
        body = {
            "first_name": "first",
            "last_name": "last",
            "address": "222 22nd Street",
            "phone_number": "222-222 2222"
        }
        response = client.post("/api/customers/", json.dumps(body), content_type='application/json')
        data = response.json()

        self.assertEqual(response.status_code, 200, msg="Did not get a 200 OK for the path projects/")

    def test_customer_delete(self):
        customer = Customer.objects.create(first_name="first", last_name="last", address="222 22nd Street", phone_number="222-222 2222")

        client = Client()
        response = client.delete(f"/api/customers/{customer.id}/")
        self.assertEqual(response.status_code, 200, msg="Did not get a 200 OK for customer delete.")

        response = client.delete(f"/api/customers/{customer.id}/")
        self.assertEqual(response.status_code, 404, msg="Did not get a 404 OK customer delete of an unknown id.")

    ####SALES ENDPOINTS
    def test_sales_list(self):
        salesperson = Salesperson.objects.create(first_name="first", last_name="last", employee_id=1)
        customer = Customer.objects.create(first_name="first", last_name="last", address="111 1st Street", phone_number="111-111 1111")
        auto = AutomobileVO.objects.create(vin="1")
        Sale.objects.create(automobile=auto, salesperson=salesperson, customer=customer, price=1000)

        client = Client()
        response = client.get("/api/sales/")
        data = response.json()

        self.assertEqual(response.status_code, 200, msg="Did not get a 200 OK for list sales.")
        self.assertTrue('sales' in data, msg="Did not give response with sales field.")
        self.assertEqual(len(data['sales']), 1, msg="Did not return correct number of sales.")

    def test_sales_create(self):
        salesperson = Salesperson.objects.create(first_name="first", last_name="last", employee_id=2)
        customer = Customer.objects.create(first_name="first", last_name="last", address="222 2nd Street", phone_number="222-222 2222")
        auto = AutomobileVO.objects.create(vin="2")

        client = Client()
        body = {
            "automobile": auto.vin,
            "salesperson": salesperson.employee_id,
            "customer": customer.id,
            "price": 1000
        }

        response = client.post("/api/sales/", json.dumps(body), content_type='application/json')
        data = response.json()
        self.assertEqual(response.status_code, 200, msg="Did not get a 200 OK for the path projects/")

        response = client.post("/api/sales/", json.dumps({**body, "automobile": 999}), content_type='application/json')
        data = response.json()
        self.assertTrue(response.status_code == 404 or response.status_code == 400, msg="Did not get a 404 OK for non-existent auto/")

        response = client.post("/api/sales/", json.dumps({**body, "salesperson": 999}), content_type='application/json')
        data = response.json()
        self.assertTrue(response.status_code == 404 or response.status_code == 400, msg="Did not get a 404 OK for non-existent salesperson/")

        response = client.post("/api/sales/", json.dumps({**body, "customer": 999}), content_type='application/json')
        data = response.json()
        self.assertTrue(response.status_code == 404 or response.status_code == 400, msg="Did not get a 404 OK for non-existent customer/")

    def test_sale_delete(self):
        salesperson = Salesperson.objects.create(first_name="first", last_name="last", employee_id=3)
        customer = Customer.objects.create(first_name="first", last_name="last", address="333 3rd Street", phone_number="333-333 3333")
        auto = AutomobileVO.objects.create(vin="3")
        sale = Sale.objects.create(automobile=auto, salesperson=salesperson, customer=customer, price=1000)

        client = Client()
        response = client.delete(f"/api/sales/{sale.id}/")
        self.assertEqual(response.status_code, 200, msg="Did not get a 200 OK for sales delete.")

        response = client.delete(f"/api/sales/{sale.id}/")
        self.assertTrue(response.status_code == 404 or response.status_code == 400, msg="Did not get a 404 OK sales delete of an unknown id.")
