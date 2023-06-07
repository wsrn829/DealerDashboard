from django.urls import path

from .views import (api_list_technicians,
                    api_technician_details,
                    api_list_appointments,
                    api_appointment_details,
                    update_appt_status_cancel,
                    update_appt_status_finish)

urlpatterns = [
    path("technicians/", api_list_technicians, name="list_technician"),
    path(
        "technicians/<int:id>/",
        api_technician_details,
        name="technician_details"
    ),
    path("appointments/", api_list_appointments, name="list_appointment"),
    path("appointments/", api_appointment_details, name="appointment_details"),
    path("appointments/<int:id>/cancel/", update_appt_status_cancel),
    path("appointments/<int:id>/finish/", update_appt_status_finish)
]
