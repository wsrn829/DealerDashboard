import React, { useState, useEffect } from "react";

export default function SalesHistory() {
  const [sales, setSales] = useState([]);
  const [salesPerson, setSalesPerson] = useState("");
  const [salesPeople, setSalesPeople] = useState([]);

  const handleSalesPerson = (event) => {
    const value = event.target.value;
    setSalesPerson(value);


    const selectSales = sales.filter(
      (sale) => sale.salesperson.first_name === value);
    setSales(selectSales);
  };

  const data = {
    salesPerson: salesPerson,
  };

  async function LoadSales() {
    const response = await fetch("http://localhost:8090/api/sales/");
    if (response.ok) {
      const data = await response.json();
      setSales(data.sale);
    }
  }

  async function getSalesPeople() {
    const url = "http://localhost:8090/api/salespeople/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSalesPeople(data.salesperson);
    }
  }

  useEffect(() => {
    LoadSales();
    getSalesPeople();
  }, []);

  return (
    <div>
      <h1>Salesperson History</h1>
      <div className="form-floating mb-3">
        <select
          value={salesPerson}
          onChange={handleSalesPerson}
          placeholder="salesPerson"
          required
          type="text"
          name="salesPerson"
          id="salesPerson"
          className="form-select"
        >
          <option value="">Choose a salesperson</option>
          {salesPeople.map((salesperson) => {
            return (
              <option key={salesperson.id} value={salesperson.first_name}>
                {salesperson.first_name}
              </option>
            );
          })}
        </select>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((salesData) => {
            return (
              <tr key={salesData.id}>
                <td>{salesData.salesperson.first_name}</td>
                <td>{salesData.customer.first_name}</td>
                <td>{salesData.automobile.vin}</td>
                <td>{salesData.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
