import React, { useState, useEffect } from "react";

export const AutoForm = () => {
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [vin, setVin] = useState("");
  const [model, setModel] = useState("");
  const [models, setModels] = useState([]);

  //   Fetch model data
  useEffect(() => {
    const getModels = async () => {
      const modelUrl = "http://localhost:8100/api/models/";
      const response = await fetch(modelUrl);

      if (response.ok) {
        const modelData = await response.json();
        setModels(modelData.models);
      }
    };
    getModels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAutoData = { color, year, vin, model_id: model };

    const createAutomobileUrl = "http://localhost:8100/api/automobiles/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(newAutoData),
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await fetch(createAutomobileUrl, fetchConfig);
    // if (response.ok) {
    //   alert("New Automobile Created!");
    // } else {
    //   alert("Invalid  Car: Possible already in inventory");
    // }

    setColor("");
    setYear("");
    setModel("");
    setVin("");
  };
  return (
      <>
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add an automobile to inventory</h1>
              <form onSubmit={handleSubmit} id="add-automobile-form">
                <div className="form-floating mb-3">
                  <input
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="Color"
                  required value ={color}
                  type="text" name="color" id="color" className="form-control"/>
                  <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Year"
                  required value ={year}
                  type="text" name="year" id="year" className="form-control"/>
                  <label htmlFor="year">Year</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                  onChange={(e) => setVin(e.target.value)}
                  placeholder="VIN"
                  required value ={vin}
                  type="text" name="vin" id="vin" className="form-control"/>
                  <label htmlFor="vin">VIN</label>
                </div>
                <div className=" mb-3">
                  <select
                    onChange={(e) => setModel(e.target.value)}
                    required
                    value={model}
                    name="model"
                    id="model"
                    className="form-select">
                    <option value="">Choose a model</option>
                    {models?.map(model=>{
                      return (
                        <option key={model.id} value={model.id}>
                          {model.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
}
