import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useParams } from "react-router-dom";
import { getProductById } from "../Services/ProductService";

export function ProductPage() {
    const { id } = useParams();
    
    const [product, setProduct] = React.useState(null);

  const getData = async () => {
    await getProductById(id).then((response) => {
      setProduct(response);
    });
  };

  // Iterate over all properties of product object and make label and value pairs
  // make first letter of label uppercase and display it
  const data = Object.entries(product || {}).map(([key, value]) => {

    // Capitalize first letter of label
    key = key.charAt(0).toUpperCase() + key.slice(1);

    // replace underscore with space
    key = key.replace(/_/g, " ");

    // If value is an object, stringify it
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }

    // If value is null, display "N/A"
    if (value === null || value === undefined || value === "" || value === "null" || value === "undefined" || value === "N/A") {
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
        <p className="text-sm text-muted-foreground">{value}</p>
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
                <CardTitle>{product?.name}</CardTitle>
              <CardDescription>
                {product?.role}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {data}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
