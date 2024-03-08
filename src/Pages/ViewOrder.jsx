import * as React from "react";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useParams } from "react-router-dom";
import { getCommonOrderById } from "../Services/CommonOrderService";

export function ViewOrder() {

  const { type , id } = useParams();

  const [order, setOrder] = React.useState(null);

  const getData = async () => {
    await getCommonOrderById(type , id).then((response) => {
      setOrder(response);
    });
  };

  // Iterate over all properties of employee object and make label and value pairs
  const data = Object.entries(order || {}).map(([key, value]) => {
    // skip password
    if (key === "password") {
      return;
    }

    // Capitalize first letter of label
    key = key.charAt(0).toUpperCase() + key.slice(1);

    // replace underscore with space
    key = key.replace(/_/g, " ");

    // If value is an object, stringify it
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }

    // If value is null, display "N/A"
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      value === "null" ||
      value === "undefined" ||
      value === "N/A"
    ) {
      value = "N/A";
    }

    // If value is boolean, display "Yes" or "No"
    if (typeof value === "boolean") {
      value = value ? "Yes" : "No";
    }

    // Capitalize all first letters of words in key
    key = key.replace(/\b\w/g, (l) => l.toUpperCase());

    return (
      <div key={key} className="flex items-center justify-between p-2">
        <p className="text-sm font-medium leading-none">{key}</p>
        <p className="text-sm text-muted-foreground text-right">{value}</p>
      </div>
    );
  });

  React.useEffect(() => {
    getData();
  }, []);

  // display type of order properly in title types of orders are - order , w2worder , supply-order, return-supply-order , return-order
  let title = "";
  if (type === "order") {
    title = "Order";
  } else if (type === "w2worder") {
    title = "Warehouse to Warehouse Order";
  } else if (type === "supply-order") {
    title = "Supply Order";
  } else if (type === "return-supply-order") {
    title = "Return Supply Order";
  } else if (type === "return-order") {
    title = "Return Order";
  }

  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>{order?.id}</CardTitle>
              <CardDescription>{title}</CardDescription>
            </CardHeader>
            <CardContent>{data}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
