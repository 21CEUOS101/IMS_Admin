import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getRecentSales } from "../Services/AdminService";
import { useEffect, useState } from "react";

  
export function RecentSales() {
    
  const [recentSales, setRecentSales] = useState([]);

  const getData = async () => {
    await getRecentSales().then((response) => {
      setRecentSales(response);
    });
  };

  useEffect(() => {
    try {
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

    return (
      <div className="space-y-8">
        {recentSales.map((sale, index) => {
          return (
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{sale?.customerId ? sale.customerId : "N/A"}</p>
                <p className="text-sm text-muted-foreground">
                  {sale?.date ? sale.date : "N/A"}
                </p>
              </div>
              <div className="ml-auto font-medium">{sale?.totalAmount ? sale.totalAmount : "N?A"}</div>
              <div className="ml-auto font-medium">{sale?.profit ? sale.profit : "N?A"}</div>
            </div>
          ); 
        })}
      </div>
    )
  }