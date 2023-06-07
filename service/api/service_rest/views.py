from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name", "last_name", "employee_id", "id"]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
        "id",
        "vip_status"
    ]

    encoders = {
        "technician": TechnicianEncoder(),
    }

    # def get_extra_data(self, o):
    #     count = AutomobileVO.objects.filter(vin=o.vin).count()
    #     return {"is_vip": count > 0}


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    # Listing all Technicians
    if request.method == "GET":
        technicians = Technician.objects.all()

        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder
        )
    else:
        # Creating a new Technician
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)

        except:
            return JsonResponse({"message": "Invalid Technician"}, status=400)


@require_http_methods(["GET", "DELETE"])
def api_technician_details(request, id):
    try:
        technician = Technician.objects.get(id=id)
    except Technician.DoesNotExist:
        return JsonResponse({"message": "Technician does not exist"}, status=400)

    # Getting details on the specific Technician
    if request.method == "GET":
        return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)

    # Deleting one Technician
    else:
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    # Listing all Appointments
    if(request.method == "GET"):
        appointments = Appointment.objects.all()
        return JsonResponse({"appointments": appointments}, encoder=AppointmentEncoder)
    # Create a new Appointment
    else:
        content = json.loads(request.body)
        try:
            employee_id = content["technician"]
            technician = Technician.objects.get(employee_id=employee_id)
            content["technician"] = technician

        except Technician.DoesNotExist:
            return JsonResponse({"message": "Invalid Appointment"}, status=400)

        appointment = Appointment.objects.create(**content)

        return JsonResponse(appointment, encoder=AppointmentEncoder, safe=False)


@require_http_methods(["GET", "DELETE"])
def api_appointment_details(request, id):
    # Check if Appointment exists
    try:
        appointment = Appointment.objects.get(id=id)
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment does not exist"}, status=400)

    # Appointment details
    if request.method == "GET":
        return JsonResponse(appointment, encoder=AppointmentEncoder, safe=False)

    # Delete an Appointment
    else:
        count, _ = Appointment.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["PUT"])
def api_update_appt_status_cancel(request, id):
    appointment = Appointment.objects.get(id=id)
    appointment.status = "canceled"
    appointment.save()

    return JsonResponse(appointment, encoder=AppointmentEncoder, safe=False)


@require_http_methods(["PUT"])
def api_update_appt_status_finish(request, id):
    appointment = Appointment.objects.get(id=id)
    appointment.status = "finished"
    appointment.save()

    return JsonResponse(appointment, encoder=AppointmentEncoder, safe=False)

@require_http_methods(["GET"])
def api_appointment_history(request, vin):
    appointments = Appointment.objects.filter(vin=vin)
    return JsonResponse(
        {"appointments": appointments},
        encoder=AppointmentEncoder
    )
