import React, { useEffect, useState } from "react";

export const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function getAppointments() {
      const appointmentsUrl = "http://localhost:8080/api/appointments/";
      const response = await fetch(appointmentsUrl);
      if (response.ok) {
        const responseData = await response.json();
        const appointments = responseData.appointments;
        setAppointments(
          appointments.filter((appt) => appt.status === "created")
        );
      }
    }
    getAppointments();
  }, [appointments]);

  const handleCancel = async (apptId) => {
    const cancelUrl = `http://localhost:8080/api/appointments/${apptId}/cancel/`;

    const fetchConfig = {
      method: "put",
    };

    const response = await fetch(cancelUrl, fetchConfig);
    // if (response.ok) {
    //   alert("Appointment Updated!");
    //   setAppointments(appointments.filter((appt) => appt.status === "created"));
    // }
  };

  const handleFinish = async (apptId) => {
    const finishUrl = `http://localhost:8080/api/appointments/${apptId}/finish/`;

    const fetchConfig = {
      method: "put",
    };

    const response = await fetch(finishUrl, fetchConfig);
    // if (response.ok) {
    //   alert("Appointment Updated!");
    //   setAppointments(appointments.filter((appt) => appt.status === "created"));
    // }
  };

  return (
    <>
      <h1>Appointments</h1>
      <p>
        NOTE: If your appointment is canceled or finished, it will NOT show up
        on this list
      </p>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date + time</th>
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => {
            return (
              <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{appointment.is_vip ? "Yes" : "No"}</td>
                <td>{appointment.customer}</td>
                <td>{appointment.date_time}</td>
                <td>{appointment.technician.first_name}</td>
                <td>{appointment.reason}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleCancel(appointment.id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => handleFinish(appointment.id)}
                  >
                    Finish
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
