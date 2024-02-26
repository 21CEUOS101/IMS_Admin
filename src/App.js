import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./Custom_Components/Navbar";
import "./styles/globals.css";
import { createContext, useEffect, useState } from "react";
import AdminTable from "./Pages/Tables/AdminTable";
import SupplierTable from "./Pages/Tables/SupplierTable";
import DeliveryManTable from "./Pages/Tables/DeliveryManTable";
import CustomerTable from "./Pages/Tables/CustomerTable";
import WMangerTable from "./Pages/Tables/WManagerTable";
import OrderTable from "./Pages/Tables/OrderTable";
import ReturnOrderTable from "./Pages/Tables/ReturnOrderTable";
import SupplyOrderTable from "./Pages/Tables/SupplyOrderTable";
import RSOTable from "./Pages/Tables/RSOTable";
import W2WOrderTable from "./Pages/Tables/W2WOrderTable";
import ProductsTable from "./Pages/Tables/ProductsTable";
import { EmployeeProfile } from "./Pages/EmployeeProfile";
import { Login as Login_F } from "./Services/AuthService";
import Login from "./Pages/Login";
import AddEmployee from "./Pages/AddEmployee";
import { AddProduct } from "./Pages/AddProduct";
import UpdateEmployee from "./Pages/UpdateEmployee";
import NotFound from "./Pages/NotFound";
import { ProductPage } from "./Pages/ProductPage";
import { UpdateProduct } from "./Custom_Components/UpdateProduct";
import AllCustomerOrders from "./Pages/Customer/AllCustomerOrders";

export const AppContext = createContext();

const checkLogin = async () => {

  const username = localStorage.getItem("email") || null;
  const password = localStorage.getItem("password") || null;

  const response = await Login_F({ username, password }).then((response) => {
    return response;
  });
  return response;
};

function App() {
  // to check if the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLogin().then((response) => {
      if (response.success) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Router>
        {isLoggedIn ? (
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/all">
                <Route path="admin" element={<AdminTable />} />
                <Route path="deliveryMan" element={<DeliveryManTable />} />
                <Route path="supplier" element={<SupplierTable />} />
                <Route path="wmanager" element={<WMangerTable />} />
                <Route path="customer" element={<CustomerTable />} />
                <Route path="order" element={<OrderTable />} />
                <Route path="return-order" element={<ReturnOrderTable />} />
                <Route path="supply-order" element={<SupplyOrderTable />} />
                <Route path="return-supply-order" element={<RSOTable />} />
                <Route path="w2wOrder" element={<W2WOrderTable />} />
                <Route path="products" element={<ProductsTable />} />
              </Route>
              <Route path="/employee/add" element={<AddEmployee />} />
              <Route path="/product/add" element={<AddProduct />} />
              <Route path="/update">
                <Route path="employee/:id" element={<UpdateEmployee />} />
                <Route path="order/:id" element={<h1>Update Order</h1>} />
                <Route path="return-order/:id" element={<h1>Update Return Order</h1>} />
                <Route path="supply-order/:id" element={<h1>Update Supply Order</h1>} />
                <Route path="return-supply-order/:id" element={<h1>Update Return Supply Order</h1>} />
                <Route path="w2wOrder/:id" element={<h1>Update W2W Order</h1>} />
                <Route path="product/:id" element={<UpdateProduct/>} />
              </Route>
              <Route path="/view" >
                <Route path="supplier" >
                  <Route path=":id" element={<EmployeeProfile />} >
                    <Route path="supply-orders" element={<h1>Supplier Supply Orders</h1>} />
                    <Route path="return-supply-orders" element={<h1>Supplier Return Supply Orders</h1>} />
                  </Route>
                </Route>
                <Route path="delivery-man" >
                  <Route path=":id" element={<EmployeeProfile />} >
                    <Route path="orders" element={<h1>Delivery Man Orders</h1>} />
                  </Route>
                </Route>
                <Route path="wmanager" >
                  <Route path=":id" element={<EmployeeProfile />} >
                    <Route path="orders" element={<h1>Warehouse Manager Orders</h1>} />
                    <Route path="return-orders" element={<h1>Warehouse Manager Return Orders</h1>} />
                    <Route path="w2w-orders" element={<h1>Warehouse Manager W2W Orders</h1>} />
                    <Route path="products" element={<h1>Warehouse Manager Products</h1>} />
                    <Route path="supply-orders" element={<h1>Warehouse Manager Supply Orders</h1>} />
                    <Route path="return-supply-orders" element={<h1>Warehouse Manager Return Supply Orders</h1>} />
                  </Route>
                </Route>
                <Route path="customer" >
                    <Route path=":id" element={<EmployeeProfile />} />
                    <Route path=":id/orders" element={<AllCustomerOrders/>} />
                    <Route path=":id/return-orders" element={<h1>Customer Return Orders</h1>} />
                </Route>
                <Route path="admin" >
                  <Route path=":id" element={<EmployeeProfile />} />
                </Route>
              </Route>
              <Route path="/profile/:id" element={<EmployeeProfile />} />
              <Route path="/product/:id" element={< ProductPage/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
        ) :
        (<Login />)
        }
      </Router>
    </AppContext.Provider>
  );
}

export default App;
