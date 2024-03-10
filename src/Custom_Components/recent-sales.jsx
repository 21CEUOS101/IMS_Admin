import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getRecentSales } from "../Services/AdminService";
import { useEffect, useState } from "react";

  
export function RecentSales() {
    
  const [recentSales, setRecentSales] = useState([]);

  const getData = async () => {
    await getRecentSales().then((response) => {
      console.log(response?.data);
      if(response?.success){
        setRecentSales(response?.data);
      }
    });
  };

  useEffect(() => {
    try {
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

    return recentSales.length!==0 && (
      <div className="space-y-8">
        {recentSales?.map((sale, index) => {
          return (
            <div className=" shadow-md rounded-lg p-4" key={index}>
              <div className="flex items-center">
                <div className="border-gray-200 bg-blue-50 text-black font-semibold px-3 py-1 rounded-t-lg">Order Id: {sale?.orderId ? sale.orderId : "N/A"}</div>
              </div>
              <div className="border-b my-2"></div>
              <div className="flex items-center">
                <div className="flex-grow space-y-1">
                  <p className="text-sm font-mono leading-none">Customer Id: {sale?.customerId ? sale.customerId : "N/A"}</p>
                  <p className="text-sm text-muted-foreground">{sale?.date ? sale.date : "N/A"}</p>
                </div>
                <div className="flex flex-col items-end ml-4">
                  <p className="font-mono text-sm">Amount: {sale?.totalAmount ? sale.totalAmount : "N/A"}</p>
                  <p className="font-mono text-sm">Profit: {sale?.profit ? sale.profit : "N/A"}</p>
                </div>
                </div>
            </div>
          ); 
        })}
      </div>
    )
  }