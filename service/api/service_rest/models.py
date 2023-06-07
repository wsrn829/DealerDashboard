from django.db import models
from django.urls import reverse


class Technician(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    employee_id = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} [Employee ID: {self.employee_id}]"

    def get_api_url(self):
        return reverse("api_show_technician", kwargs={"pk": self.pk})


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)
    color = models.CharField(max_length=50, default=False)
    year = models.PositiveSmallIntegerField(default=False)

    def get_api_url(self):
        return reverse("api_show_automobile", kwargs={"pk": self.vin})


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=150, default="created")
    vin = models.CharField(max_length=150, unique=True)
    customer = models.CharField(max_length=150)
    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.CASCADE
        )
    vip_status = models.BooleanField(default=False)

    def get_api_url(self):
        return reverse("api_show_appointment", kwargs={"pk": self.pk})

    def update_vip_status(self, *args, **kwargs):
        if AutomobileVO.objects.filter(vin=self.vin).exists():
            self.vip_status = True
        super().save(*args, **kwargs)
