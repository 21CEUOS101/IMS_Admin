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
import { useNavigate, useParams } from "react-router-dom";
import { getWarehouseById } from "../Services/WarehouseService";

export function ViewWarehouse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [warehouse, setWarehouse] = React.useState();

  const getData = async () => {
    await getWarehouseById(id).then((response) => {
      setWarehouse(response);
    });
  };

  // Iterate over all properties of warehouse object and make label and value pairs
  const data = Object.entries(warehouse || {}).map(([key, value]) => {
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
      
      // if value is an array, display it as a string with comma separated values 
      if (Array.isArray(value)) {
            value = value.join(', ');
      }

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

  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>{warehouse?.name}</CardTitle>
              <CardDescription>{warehouse?.role}</CardDescription>
            </CardHeader>
            <CardContent>{data}</CardContent>
            {warehouse?.role !== "Customer" && warehouse?.role !== "Admin" && (
              <CardFooter className="flex justify-center space-x-2">
                {warehouse?.role === "supplier" && (
                  <Button variant="outline">Check Supply Orders</Button>
                )}
                {warehouse?.role === "wmanager" && (
                  <Button variant="outline">Go to WareHouse</Button>
                )}
                {(warehouse?.role === "deliveryMan" ||
                  warehouse?.role === "customer") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate(`/view/${warehouse?.role}/${id}/orders`);
                    }}
                  >
                    Check Orders
                  </Button>
                )}
                {(warehouse?.role === "deliveryMan" ||
                  warehouse?.role === "customer") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate(`/view/${warehouse?.role}/${id}/return-orders`);
                    }}
                  >
                    Check Return Orders
                  </Button>
                )}
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
