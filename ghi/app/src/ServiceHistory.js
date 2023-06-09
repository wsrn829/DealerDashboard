import React, { useState, useEffect } from "react";

export const ServiceHistory = () => {
  const [vin, setVin] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function getAppointments() {
      const appointmentsUrl = "http://localhost:8080/api/appointments/";
      const response = await fetch(appointmentsUrl);
      if (response.ok) {
        const responseData = await response.json();
        setAppointments(responseData.appointments);
      }
    }
    getAppointments();
  }, []);

  const changeVin = (e) => {
    setVin(e.target.value);
  };

  const filterByVin = () => {
    // if (vin === "") {
    //   alert("Please enter a VIN");
    // }
    setAppointments(
      appointments.filter((appt) => {
        return appt.vin === vin;
      })
    );
  };
  return (
    <>
      <div>
        <h1>Service History</h1>
        <input
          type="text"
          value={vin}
          placeholder="Search by VIN"
          onChange={changeVin}
        />
        <button className="btn btn-outline-secondary" onClick={filterByVin}>
          Search
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date + Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.id}>
              <td>{appt.vin}</td>
              <td>{appt.is_vip ? "Yes" : "No"}</td>
              <td>{appt.customer}</td>
              <td>{appt.date_time}</td>
              <td>{appt.technician.first_name}</td>
              <td>{appt.reason}</td>
              <td>{appt.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
