
import React, { useEffect, useState } from "react";
import { columns } from "../../Orders/columns";
import { getOrders } from "../../Services/OrderService";
import { DataTable } from "../../Orders/data-table";

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
      {data !== null && (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="container mx-auto py-10">
              <DataTable columns={columns} data={data} filterField={"status"} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderTable;
