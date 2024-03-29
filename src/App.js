/*
 * @file App.js
 * @author Ashish H. Prajapati (prajapatiashish40567@gmail.com)
 * @brief Main file for the application to handle routing and context API 
 * 
 * @details This file is the main file for the application. It handles the routing and context API for the application.
 *          It also checks if the user is logged in or not and then renders the components accordingly.
 *          If the user is not logged in, it will redirect the user to the login page.
 *
 * @version 0.1
 * @date 14th March 2024
 *
 * @history 14th March 2021 Finalized the file for version 0.1
 */

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
import { ViewWarehouse } from "./Pages/ViewWarehouse";
import ReturnOrderByWManager from "./Pages/Tables/ReturnOrderByWManager";
import ReturnOrderByCustomer from "./Pages/Tables/ReturnOrderByCustomer";
import OrderByWManager from "./Pages/Tables/OrderByWManager";
import SupplyOrderBySupplier from "./Pages/Supplier/SupplyOrderBySupplier";
import RSOBySupplier from "./Pages/Supplier/RSOBySupplier";
import W2WOrderByWManager from "./Pages/WManager/W2WOrderByWManager";
import { ViewOrder } from "./Pages/ViewOrder";

// context API to check if the user is logged in or not
export const AppContext = createContext();

// function to check if the user is logged in or not
const checkLogin = async () => {

  const username = localStorage.getItem("email") || null;
  const password = localStorage.getItem("password") || null;

  let response = { success: false };

  if (username!==null && password!==null) {
    response = await Login_F({ username, password }).then((response) => {
      return response;
    });
  }

  return response;
};

function App() {
  // to check if the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLogin().then((response) => {
      if (response?.success)
        setIsLoggedIn(true);
      else
        setIsLoggedIn(false);
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
                <Route path="product/:id" element={<UpdateProduct/>} />
              </Route>
              <Route path="/view" >
                <Route path="warehouse/:id" element={<ViewWarehouse/>} />
                <Route path="supplier" >
                  <Route path=":id" element={<EmployeeProfile />} />
                  <Route path=":id/supply-orders" element={<SupplyOrderBySupplier/>} />
                  <Route path=":id/return-supply-orders" element={<RSOBySupplier/>} />
                </Route>
                <Route path="delivery-man" >
                  <Route path=":id" element={<EmployeeProfile />} />
                </Route>
                <Route path="wmanager" >
                  <Route path=":id" element={<EmployeeProfile />} />
                  <Route path=":id/orders" element={<OrderByWManager/>} />
                  <Route path=":id/w2w-orders" element={<W2WOrderByWManager/>} />
                  <Route path=":id/return-orders" element={<ReturnOrderByWManager/>} />
                </Route>
                <Route path="customer" >
                    <Route path=":id" element={<EmployeeProfile />} />
                    <Route path=":id/orders" element={<AllCustomerOrders/>} />
                    <Route path=":id/return-orders" element={<ReturnOrderByCustomer/>} />
                </Route>
                <Route path="admin" >
                  <Route path=":id" element={<EmployeeProfile />} />
                </Route>
              </Route>
              <Route path="/view-order/:type/:id" element={<ViewOrder/>} />
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
