import React, { useState, useEffect }  from "react";


function SalespeopleList() {
    const [salesperson, setSalesperson] = useState([]);
    async function LoadSalespeople() {
        const response = await fetch("http://localhost:8090/api/salespeople/");
        if (response.ok) {
            const data = await response.json();
            setSalesperson(data.salesperson)
        }
    }

    useEffect(() => {
        LoadSalespeople();
    }, []);

    return (
        <div>
            <h1>Salespeople</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {salesperson.map((salespersonData) => {
                        return (
                            <tr key={salespersonData.id}>
                                <td>{ salespersonData.employee_id }</td>
                                <td>{ salespersonData.first_name }</td>
                                <td>{ salespersonData.last_name }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default SalespeopleList;
