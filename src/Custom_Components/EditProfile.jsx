import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { updateAdminProfile } from "../Services/EmployeeProfile";
import { ChangePassword } from "./ChangePassword";

const schema = z.object({
  name: z.string({
    message: "Name is required",
  }).min(1),
  email: z
    .string({
      message: "Email is required",
    })
    .email(),
  phone: z.string({
    message: "Phone is required",
  }).length(10),
});

export function EditProfile({ employee , setRefresh , refresh }) {

  const id = localStorage.getItem("id");
  const password = localStorage.getItem("password");

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    data.id = id;
    data.password = password;
    await updateAdminProfile(data , id).then((response) => {
      setRefresh((prev) => !prev);
      form.reset();
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <div className=" w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4 w-full">
              <div>
                  <FormField
                    control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={employee?.name}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={employee?.email}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={employee?.phone}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <SheetFooter>
                <div className="flex justify-between w-full">
                  <Button type="submit">Save changes</Button>
                </div>
                
            </SheetFooter>
          </form>
        </Form>
          <div className=" p-4 flex justify-center">
          <ChangePassword />
        </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
