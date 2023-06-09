import React, { useState } from "react";

export const TechnicianForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  //   Handle change within input
  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
  };

  const changeEmployeeId = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTechData = {
        employee_id: employeeId,
        first_name: firstName,
        last_name: lastName,
    };


    const createTechUrl = "http://localhost:8080/api/technicians/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(newTechData),
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(createTechUrl, fetchConfig);

    // if (response.ok) {
    //   alert("Created a new technician");
    // } else {
    //   alert("Failed to create a new technician");
    // }

    // Reset form
    setFirstName("");
    setLastName("");
    setEmployeeId("");
  };

  return (
    <>
    <div className="row">
    <div className="offset-3 col-6">
      <div className="shadow p-4 mt-4">
        <h1>Add a Technician</h1>
        <form onSubmit={handleSubmit} id="create-technician-form">
          <div className="form-floating mb-3">
             <input
             onChange={changeEmployeeId}
             placeholder="Employee ID"
             required value ={employeeId}
             type="text" name="employee_id" id="employee_id" className="form-control"/>
             <label htmlFor="employee_id">Employee ID</label>
          </div>
          <div className="form-floating mb-3">
            <input
            onChange={changeFirstName}
            placeholder="First name"
            required value ={firstName}
            type="text" name="first_name" id="first_name" className="form-control"/>
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
            onChange={changeLastName}
            placeholder="Last name"
            required value ={lastName}
            type="text" name="last_name" id="last_name" className="form-control"/>
            <label htmlFor="last_name">Last name</label>
          </div>
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  </div>
  </>
  );
}
