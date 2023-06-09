import React, {useEffect, useState} from 'react';



function SalesForm({ getSales }) {

    const [price, setPrice] = useState('');
    const [customer, setCustomer] = useState("");
    const [customers, setCustomers] = useState([]);
    const [automobile, setAutomobile] = useState('');
    const [automobiles, setAutomobiles] = useState([]);
    const [salesperson, setSalesperson] = useState("");
    const [salespeople, setSalespeople] = useState([]);
    const [sales, setSales] = useState([]);
    const [formSubmitted, setformSubmitted] = useState(false);


    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
      }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
      }

    const handleAutomobileChange = (event) => {
        const value = event.target.value;
        setAutomobile(value);
      }

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
      }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.price = price;
        data.customer = customer;
        data.automobile = automobile;
        data.salesperson = salesperson;
        console.log(data)


        const saleUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(saleUrl, fetchConfig);
        if (response.ok) {
          const newSale = await response.json();
          console.log(newSale);

          setPrice('');
          setCustomer('');
          setAutomobile('');
          setSalesperson('');
          setformSubmitted(true);
        }
      }


    const fetchData = async () => {
    const url = 'http://localhost:8090/api/salespeople/';
    const url1 = 'http://localhost:8090/api/customers/';
    const url2 = 'http://localhost:8100/api/automobiles/';
    const url3 = 'http://localhost:8090/api/sales/';

    const response = await fetch(url);
    const response1 = await fetch(url1);
    const response2 = await fetch(url2);
    const response3 = await fetch(url3);

    if (response.ok) {
        const data = await response.json();
        setSalespeople(data.salesperson)
    }
    if (response1.ok) {
        const data1 = await response1.json();
        setCustomers(data1.customer)
      }
    if (response2.ok) {
        const data2 = await response2.json();
        setAutomobiles(data2.autos)
      }
      if (response3.ok) {
        const data3 = await response3.json();
        setSales(data3.sale)
      }
  }

  useEffect(() => {
    fetchData();
  }, []);


  let soldVinList = []
  let newAutomobiles = []


  for (let i = 0; i < sales.length; i++)

          soldVinList.push(sales[i]["automobile"]["vin"])

  for (let i = 0; i < automobiles.length; i++)

      if (soldVinList.includes(automobiles[i]["vin"]) === false)

          newAutomobiles.push(automobiles[i])

  let messageClasses = 'alert alert-success d-none mb-0';
  let formClasses = '';

  if (formSubmitted) {
    messageClasses = 'alert alert-success mb-0';
    formClasses = 'd-none';
  }


    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Record a new sale</h1>
            <form className={formClasses} onSubmit={handleSubmit} id="create-sale-form">
                <div className="mb-3">
                  Automobile VIN
                    <select onChange = {handleAutomobileChange} value={automobile} required id="automobile" name="automobile" className="form-select">
                    <option value="">Choose an automobile VIN...</option>
                    {newAutomobiles.map(automobile => {
                        return (
                        <option key={automobile.id} value={automobile.vin}>
                        {automobile.vin}
                        </option>
                        );
                        })}
                    </select>
                </div>

                <div className="mb-3">
                  Salesperson
                    <select onChange = {handleSalespersonChange} value={salesperson} required id="salesperson" name="salesperson" className="form-select">
                    <option value="">Choose a salesperson...</option>
                    {salespeople.map(salesperson => {
                        return (
                        <option key={salesperson.id} value={salesperson.id}>
                        {salesperson.first_name}
                        </option>
                        );
                        })}
                    </select>
                </div>

                <div className="mb-3">
                  Customer
                    <select onChange = {handleCustomerChange} value={customer} required id="customer" name="customer" className="form-select">
                    <option value="">Choose a customer...</option>
                    {customers.map(customer => {
                        return (
                        <option key={customer.id} value={customer.id}>
                        {customer.first_name}
                        </option>
                        );
                        })}
                    </select>
                </div>

                <div className="form-floating mb-3">
                Price
                <input onChange = {handlePriceChange} value={price} placeholder="price" required type="number" name="price" id="price" className="form-control"/>
                <label htmlFor="Price"></label>
              </div>

              <button className="btn btn-primary">Create</button>
            </form>
              <div className={messageClasses} id="success-message">
                  Congratulations!
                </div>
          </div>
        </div>
      </div>
    );
  }


export default SalesForm;
