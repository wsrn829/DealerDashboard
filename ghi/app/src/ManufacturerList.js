import React, { useState, useEffect }  from "react";


export default function ManufacturerList() {
    const [manufacturer, setManufacturer] = useState([]);

    async function LoadManufacturer() {
        const response = await fetch("http://localhost:8100/api/manufacturers/");
        if (response.ok) {
          const data = await response.json();
          setManufacturer(data.manufacturers);
        }
      }

    useEffect(() => {
        LoadManufacturer();
    }, []);


    return (
        <div>
            <h1>Manufacturers</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturer.map((manufacturerData) => {
                        return (
                            <tr key={manufacturerData.id}>
                                <td>{ manufacturerData.name }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}
