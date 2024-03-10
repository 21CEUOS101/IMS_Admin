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
import { getEmployeeById } from "../Services/EmployeeProfile";
import Axios from "axios";

// get ongoing order of delivery man 
async function getOngoingOrder(delivery_man_id)
{
  // make a request to get ongoing order
  return await Axios.get(`http://localhost:3001/deliveryman/${delivery_man_id}/current-order`).then((response) => {
    let ongoing_order = null;
    for (const [key, value] of Object.entries(response.data)) {
      console.log(key, value);
      if(value.length >= 1)
      {
        ongoing_order = {
          type: key,
          id: value[0]
        }
        break;
      }
    }
    return ongoing_order;
  });
    
}

export function EmployeeProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = React.useState(null);

  const getData = async () => {
    await getEmployeeById(id).then((response) => {
      setEmployee(response);
    });
  };

  // Iterate over all properties of employee object and make label and value pairs
  const data = Object.entries(employee || {}).map(([key, value]) => {
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

  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>{employee?.name}</CardTitle>
              <CardDescription>{employee?.role}</CardDescription>
            </CardHeader>
            <CardContent>{data}</CardContent>
            {employee?.role !== "Customer" && employee?.role !== "Admin" && (
              <CardFooter className="flex justify-center space-x-2">
                {employee?.role === "wmanager" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate(`/view/warehouse/${employee?.warehouse_id}`);
                    }}
                  >
                    Go to WareHouse
                  </Button>
                )}
                {(employee?.role === "deliveryman" ||
                  employee?.role === "customer") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate(`/view/${employee?.role}/${id}/orders`);
                    }}
                  >
                    Check Orders
                  </Button>
                  )}
                {
                  employee?.role === "deliveryman" && (
                    <Button
                      variant="outline"
                      onClick={async() => {
                        let ongoing_order = await getOngoingOrder(id).then((response) => {
                          navigate(`/view-order/${response?.type}/${response?.id}`);
                        });
                      }}
                    >
                      Check Ongoing Order
                    </Button>
                  )
                }
                {(employee?.role === "customer") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate(`/view/${employee?.role}/${id}/return-orders`);
                    }}
                  >
                    Check Return Orders
                  </Button>
                )}
                {employee?.role === "supplier" && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigate(`/view/${employee?.role}/${id}/supply-orders`);
                      }}
                      className="text-wrap h-fit"
                    >
                      Check Supply Orders
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigate(`/view/${employee?.role}/${id}/return-supply-orders`);
                      }}
                      className="w-32 text-wrap h-fit"
                    >
                      Check Return Supply Orders
                    </Button>
                  </>
                )}
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
