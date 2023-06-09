import React, { useState, useEffect }  from "react";


function CustomersList() {
    const [customer, setCustomer] = useState([]);
    async function LoadCustomers() {
      const response = await fetch("http://localhost:8090/api/customers/");
      if (response.ok) {
          const data = await response.json()
          setCustomer(data.customer)
      }
    }

  useEffect(() => {
      LoadCustomers();
  }, []);

  return (
    <div>
    <h1>Customers</h1>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone Number</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
      {customer.map((customerData) => {
        return (
          <tr key={customerData.id}>
            <td>{ customerData.first_name }</td>
            <td>{ customerData.last_name }</td>
            <td>{ customerData.phone_number }</td>
            <td>{ customerData.address }</td>
          </tr>
        );
      })}
      </tbody>
    </table>
    </div>
  )
}

export default CustomersList;
