
import React, { useEffect, useState } from "react";
import { getOrders } from "../../Services/OrderService";
import Table from "../Custom_Components/Table";
import { columns } from "../Orders/columns";

const OrderTable = () => {
  const [data, setData] = useState([]);

  const getAllOrders = async () => {
    const response = await getOrders()
      .then((response) => {
        setData(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <Table data={data} columns={columns} filterField={"status"} />
    </>
  );
};

export default OrderTable;
