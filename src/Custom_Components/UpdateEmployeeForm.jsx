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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
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
import { useParams } from "react-router-dom";
import { getEmployeeById, updateEmployeeById } from "../Services/EmployeeProfile";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Please enter a valid phone number.",
  }),
  role: z.string({
    message: "Please select a role.",
  }),
  pincode: z.string({
    message: "Please enter a valid pincode.",
    }).optional(),
  warehouseId: z.string().optional(),
});

export function UpdateEmployeeForm() {

    const id = useParams().id;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      pincode: "",
      warehouseId: "",
    },
  });
    
    const updateEmployee = async (values) => {
        await updateEmployeeById(id, values).then((response) => {
            if (response.success) {
                form.reset();
            }
        });
    };

    function onSubmit(values) {

        if (values.role === "supplier") {
            delete values.warehouseId;

            if(values.pincode.length !== 6) {
                // show error
                return;
            }
          } else if (values.role === "deliveryman" || values.role === "wmanager") {
            delete values.pincode;
          }
      
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
        updateEmployee(values);
        form.reset();
  }
    
    const getData = async () => {
        await getEmployeeById(id).then((response) => {
            // set form values only if data is available for each field also make it conditional using ternary operator
            form.setValue("name", response?.name ? response.name : "");
            form.setValue("email", response?.email ? response.email : "");
            form.setValue("phone", response?.phone ? response.phone : "");
            form.setValue("role", response?.role ? response.role : "");
            form.setValue("pincode", response?.pincode ? response.pincode : "");
            form.setValue("warehouseId", response?.warehouseId ? response.warehouseId : "");
        });
    };

    React.useEffect(() => {
        getData();
    }, []);

  const time = new Date().getHours() < 12 ? "Morning" : "Afternoon";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Update {form.getValues("role")}</CardTitle>
            <CardDescription>
              Good {time}, User! Let's create your account.
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
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-1.5">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl id="email">
                        <Input placeholder="demo@gmail.com" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*phone number*/}

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-1.5">
                      <FormLabel htmlFor="phone">Phone Number</FormLabel>
                      <FormControl id="phone">
                        <Input placeholder="1234567890" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-1.5">
                      <FormLabel htmlFor="role">Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl id="role">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent position="popper">
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="deliveryman">
                            DeliveryMan
                          </SelectItem>
                          <SelectItem value="supplier">Supplier</SelectItem>
                          <SelectItem value="wmanager">
                            WareHouse Manager
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("role") === "supplier" && (
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col space-y-1.5">
                        <FormLabel htmlFor="pincode">Pin Code</FormLabel>
                        <FormControl id="pincode">
                          <Input placeholder="Enter Pin Code" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* warehouseId */}
              {(form.watch("role") === "deliveryman" ||
                form.watch("role") === "wmanager") && (
                <FormField
                  control={form.control}
                  name="warehouseId"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col space-y-1.5">
                        <FormLabel htmlFor="warehouseId">
                          WareHouse Id
                        </FormLabel>
                        <FormControl id="warehouseId">
                          <Input placeholder="Enter WarehouseId" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
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
  );
}
