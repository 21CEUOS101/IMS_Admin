
import React, { useEffect, useState } from "react";
import { getCustomerOrders} from "../../Services/OrderService";
import Table from "../../Custom_Components/Table";
import { columns } from "../../Orders/columns";
import { useParams } from "react-router-dom";

const AllCustomerOrders = () => {

  console.log("AllCustomerOrders.jsx: ")

    const id = useParams().id;

  const [data, setData] = useState([]);

  const getAllOrders = async () => {
    await getCustomerOrders(id)
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

export default AllCustomerOrders;
