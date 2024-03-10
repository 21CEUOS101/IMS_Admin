import Table from '../../Custom_Components/Table'
import React, { useEffect, useState } from 'react'
import { getOrders } from '../../Services/OrderService'
import { getRSOs } from '../../Services/RSOService'
import { ArrowUpDown } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";


export const columns = [
  {
    accessorKey: "id",
    header: "Id",
    cell: (row) => {
      return (
        <div className="font-mono hover:underline">
          {row.getValue("id")}
        </div>
      );
    },
  },
  {
    accessorKey: "product_id",
    header: "Product Id",
    cell: (row) => {
      return (
        <div className="font-mono text-gray-700">
          {row.getValue("product_id")}
        </div>
      );
    },
  },
  {
    accessorKey: "supplierId",
    header: "Supplier Id",
    cell: (row) => {
      return (
        <div className="font-mono text-gray-700">
          {row.getValue("customerId")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button variant="ghost" className="font-mono" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Status
        <ArrowUpDown />
      </Button>
    ),
    cell: (row) => {
      return (
        <div className="font-mono text-gray-800">
          {row.getValue("status")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { original } = row;
      const { id } = original;
      return (
        <div className=" p-0 m-0 flex items-center justify-center gap-x-4">
          <Link className="font-mono inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" to={`/view-order/return-supply-order/${row.getValue("id")}`}>
            View
          </Link>
        </div>
      );
    },
  },
];

const RSOTable = () => {

    const [data, setData] = useState([])

    const getAllOrders = async () => {
        const response = await getRSOs().then((response) => {
            setData(response);
        }).catch((err) => {
            console.log(err);
        });
    }
  
    useEffect(() => {
        getAllOrders();
    }, [])

    return (
        <>
            {data !== null && (<Table columns={columns} data={data} filterField={"status"}/>)}
        </>
  );
}

export default RSOTable