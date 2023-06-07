from django.urls import path

from .views import (api_list_technicians,
                    api_technician_details,
                    api_list_appointments,
                    api_appointment_details,
                    api_update_appt_status_cancel,
                    api_update_appt_status_finish,
                    api_appointment_history
                    )

urlpatterns = [
    path("technicians/", api_list_technicians, name="list_technician"),
    path(
        "technicians/<int:id>/",
        api_technician_details,
        name="technician_details"
    ),
    path("appointments/", api_list_appointments, name="list_appointment"),
    path("appointments/<int:id>/", api_appointment_details, name="appointment_details"),
    path("appointments/<int:id>/cancel/", api_update_appt_status_cancel),
    path("appointments/<int:id>/finish/", api_update_appt_status_finish),
    path("appointments/history/", api_appointment_history, name="appointment_history"),
]
