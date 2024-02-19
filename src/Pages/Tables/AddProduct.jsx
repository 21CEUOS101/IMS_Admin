import * as React from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormMessage } from "../../components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { createProduct } from "../../Services/ProductService";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  expiry_date: z.string().refine((value) => {
    return new Date(value) > new Date();
  }),
  price: z.string().refine((value) => {
    return value > 0;
  }),
  supplier_id: z.string().min(2),
});

export function AddProduct() {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      expiry_date: "",
      price: "",
      supplier_id: "",
    },
  });

  function onSubmit(values) {
    createProduct(values).then((response) => {
      if (response.success) {
        form.reset();
      }
    });
  }

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
                    Good {time}, User! Let's add new Product to your website.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="grid w-full items-center gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col space-y-1.5">
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <FormControl id="name">
                              <Input placeholder="MacBook Air" {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="expiry_date"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col space-y-1.5">
                            <FormLabel htmlFor="expiry_date">
                              Expiry Date
                            </FormLabel>
                            <FormControl id="expiry_date">
                              <Input placeholder="2024-01-29" {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/*phone number*/}

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col space-y-1.5">
                            <FormLabel htmlFor="price">Price</FormLabel>
                            <FormControl id="price">
                              <Input placeholder="75000" {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="supplier_id"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col space-y-1.5">
                            <FormLabel htmlFor="supplier_id">
                              Supplier Id
                            </FormLabel>
                            <FormControl id="supplier_id">
                              <Input placeholder="s1234" {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
