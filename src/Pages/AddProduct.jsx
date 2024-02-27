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
import { Input } from "../components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormMessage } from "../components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { createProduct } from "../Services/ProductService";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  expiry_date: z.string().optional(),
  supplierId: z.string().min(2, {
    message: "Supplier Id must be at least 2 characters.",
  }),
  tax: z.coerce.number().positive().int(),
  whole_sale_price: z.coerce.number().positive().int(),
  profit: z.coerce.number().positive().int(),
});

export function AddProduct() {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      expiry_date: "",
      supplierId: "",
      tax: 0,
      whole_sale_price: 0,
      profit: 0,
    },
  });

  const addProduct = async (values) => {
    await createProduct(values).then((response) => {
      console.log(response);
    });
  };

  function onSubmit(values) {

    // also remove empty fields
    for (const key in values) {
      if (values[key] === "") {
        delete values[key];
      }
    }

    // remove null values
    for (let key in values) {
      if (values[key] === "") {
        delete values[key];
      }
    }
    console.log(values);
    addProduct(values);
    form.reset();
  }

  // Iterate over all formSchema and make FormField for each
  const formFields = Object.entries(formSchema.shape).map(([key, value]) => {
    const label = key.charAt(0).toUpperCase() + key.slice(1);

    // prepare placeholder
    let placeholder = "";
    placeholder = `Enter ${label}`;

    let type = "text";

    // for tax , whole_sale_price and profit
    if (key === "tax" || key === "whole_sale_price" || key === "profit") {
      type = "number";
    }

    return (
      <FormField
        control={form.control}
        name={key}
        render={({ field }) => (
          <FormItem>
            <div className="flex flex-col space-y-1.5">
              <FormLabel htmlFor={key}>{label}</FormLabel>
              <FormControl id={key}>
                <Input type={type} placeholder={placeholder} {...field} />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  });

  const time = new Date().getHours() < 12 ? "Morning" : "Afternoon";

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle>Add Product</CardTitle>
                  <CardDescription>
                    Good {time}, User! Let's add the product.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="grid w-full items-center gap-4">
                    {formFields}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  {form.formState.isLoading || form.formState.isSubmitting ? (
                    <Button disabled className="w-full">
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
