import React, { useEffect, useState } from "react";

export const AppointmentForm = () => {
  // Declaring our state
  const [vin, setVin] = useState("");
  const [customer, setCustomer] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [technician, setTechnician] = useState("");
  const [technicians, setTechnicians] = useState([]);
  const [reason, setReason] = useState([]);

  // Getting data from technicians list
  useEffect(() => {
    async function getTechnicians() {
      const techniciansUrl = "http://localhost:8080/api/technicians/";
      const response = await fetch(techniciansUrl);
      if (response.ok) {
        const responseData = await response.json();
        setTechnicians(responseData.technicians);
      }
    }
    getTechnicians();
  }, []);

  //   Handling state change
  const changeVin = (e) => {
    setVin(e.target.value);
  };

  const changeCustomer = (e) => {
    setCustomer(e.target.value);
  };

  const changeDateTime = (e) => {
    setDateTime(e.target.value);
  };

  const changeTechnician = (e) => {
    setTechnician(e.target.value);
  };

  const changeReason = (e) => {
    setReason(e.target.value);
  };

  //   Submitting form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAppointmentData = {
      date_time: dateTime,
      reason,
      vin,
      customer,
      technician,
    };

    const createAppointmentUrl = "http://localhost:8080/api/appointments/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(newAppointmentData),
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await fetch(createAppointmentUrl, fetchConfig);
    // if (response.ok) {
    //   alert("New Appointment has been reated.");
    // } else {
    //   alert("Car is already scheduled");
    // }

    setVin("");
    setCustomer("");
    setDateTime("");
    setTechnician("");
    setReason("");
  };

  return (
            <>
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create an appointment</h1>
            <form onSubmit={handleSubmit} id="create-appointment-form">
              <div className="form-floating mb-3">
                <input
                onChange={changeVin}
                placeholder="VIN"
                required value ={vin}
                type="text" name="vin" id="vin" className="form-control"/>
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input
                onChange={changeCustomer}
                placeholder="Customer"
                required value ={customer}
                type="text" name="customer" id="customer" className="form-control"/>
                <label htmlFor="customer">Customer</label>
              </div>
              <div className="form-floating mb-3">
                <input
                onChange={changeDateTime}
                placeholder="Date & Time"
                required value ={dateTime}
                type="datetime-local" name="dateTime" id="dateTime" className="form-control"/>
                <label htmlFor="dateTime">Date & Time</label>
              </div>
              <div className="mb-3">
                <select
                  onChange={changeTechnician}
                  required
                  value={technician}
                  name="technician"
                  id="technician"
                  className="form-select">
                  <option value="">Choose a technician</option>
                  {technicians.map(technician=>{
                    return (
                        <option key={technician.employee_id} value={technician.employee_id}>
                          {technician.first_name} {technician.last_name}
                        </option>
                    )
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input
                onChange={changeReason}
                placeholder="Reason"
                required value ={reason}
                type="text" name="reason" id="reason" className="form-control"/>
                <label htmlFor="reason">Reason</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
        </div>
        </>
    )
}
