import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
// import SalesPersonList from "./sales/SalesPersonList";
// import SalesPersonForm from "./sales/SalesPersonForm";
// import CustomersList from "./sales/CustomersList";
// import CustomerForm from "./sales/CustomersForms";
// import SalesList from "./sales/SalesList";
// import SalesForm from "./sales/SalesForms";
// import SalesHistory from "./sales/SalesHistory";
import ManufacturerList from "./ManufacturerList";
import ManufacturerForm from "./ManufacturerForm";
import ModelForm from "./ModelForm";
import { ModelList } from "./ModelList";
import { TechnicianForm } from "./TechnicianForm";
import { TechnicianList } from "./TechnicianList";
import { AppointmentForm } from "./AppointmentForm";
import { AppointmentList } from "./AppointmentList";
import { ServiceHistory } from "./ServiceHistory";
import { AutoList } from "./AutoList";
import { AutoForm } from "./AutoForm";

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="automobiles">
            <Route index element={<AutoList />}></Route>
            <Route path="create" element={<AutoForm />}></Route>
          </Route>
          <Route path="technicians">
            <Route index element={<TechnicianList />} />
            <Route path="create" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route index element={<AppointmentList />} />
            <Route path="create" element={<AppointmentForm />} />
            <Route path="history" element={<ServiceHistory />} />
          </Route>
          {/* <Route path="salesperson/" element={<SalesPersonList />} />
          <Route path="salesperson/create" element={<SalesPersonForm />} />
          <Route path="customers/" element={<CustomersList />} />
          <Route path="customers/create" element={<CustomerForm />} /> */}
          <Route path="manufacturers/" element={<ManufacturerList />} />
          <Route path="manufacturers/create" element={<ManufacturerForm />} />
          <Route path="models/create" element={<ModelForm />} />
          <Route path="models" element={<ModelList />} />
          {/* <Route path="sales/" element={<SalesList />} />
          <Route path="sales/create" element={<SalesForm />} />
          <Route path="sales/history" element={<SalesHistory />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
