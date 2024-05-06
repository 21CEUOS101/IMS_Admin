import Table from '../../Custom_Components/Table'
import React, { useEffect, useState } from 'react'
import { getW2WOrders } from '../../Services/W2WOrderService'
import { ArrowUpDown } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { DataTable } from '../../Orders/data-table';


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
    accessorKey: "warehouseId",
    header: "Receiver Id",
    cell: (row) => {
      return (
        <div className="font-mono text-gray-700">
          {row.getValue("warehouseId")}
        </div>
      );
    },
  },
  {
    accessorKey: "s_warehouse_id",
    header: "Sender Id",
    cell: (row) => {
      return (
        <div className="font-mono text-gray-700">
          {row.getValue("warehouseId")}
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
          <Link className="font-mono inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" to={`/view-order/w2worder/${row.getValue("id")}`}>
            View
          </Link>
        </div>
      );
    },
  },
];

const W2WOrderTable = () => {

    const [data, setData] = useState([])

    const getAllOrders = async () => {
        await getW2WOrders().then((response) => {
            console.log(response);
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
            {data !== null && (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="container mx-auto py-10">
              <DataTable columns={columns} data={data} filterField={"status"}/>
            </div>
          </div>
        </div>
      )}
        </>
  );
}

export default W2WOrderTable