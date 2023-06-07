from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True, null=True)
    vin=models.CharField(max_length=150, unique=True, null=True)
    color = models.CharField(max_length=50, null=True)
    year = models.PositiveSmallIntegerField(null=True)
    sold=models.BooleanField(max_length=150, default=False, null=True)

    def __str__(self):
        return f"{self.import_href} {self.vin} {self.color} {self.year} {self.sold}"

class Salesperson(models.Model):
    first_name=models.CharField(max_length=150, null=True)
    last_name=models.CharField(max_length=150, null=True)
    employee_id=models.CharField(max_length=150, unique=True, null=True)

    def get_api_url(self):
        return reverse("api_list_sales_person", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.employee_id}"


class Customer(models.Model):
    first_name=models.CharField(max_length=150, null=True)
    last_name=models.CharField(max_length=150, null=True)
    address=models.CharField(max_length=150, null=True)
    phone_number=models.CharField(max_length=150, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}  {self.address} {self.phone_number}"


class Sale(models.Model):
    price=models.PositiveBigIntegerField(null=True)

    automobile=models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE,
        null=True
    )

    salesperson=models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.CASCADE,
        null=True
    )

    customer=models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return f"{self.price} {self.automobile} {self.salesperson}  {self.customer}"
