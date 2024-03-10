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
import { Login } from "../Services/AuthService";
import { AppContext } from "../App";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string({
    message: "Please enter a valid password.",
  }),
});

export function LoginForm() {

  const { setIsLoggedIn } = React.useContext(AppContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    if (values.email && values.password) {
      const data = {
        username: values.email,
        password: values.password,
      };
      await Login(data).then((response) => {
        console.log(response);
        if (response?.success) {
          setIsLoggedIn(true);
        }
        else
        {
          form.setError("password", {
            type: "deps",
            message: response?.message,
          });
          // console.log(response?.message);
          setIsLoggedIn(false);
        }
      });
    }
  }

  const time = new Date().getHours() < 12 ? "Morning" : "Afternoon";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Good {time}, User! Ready to log in?
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-1.5">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="demo@gmail.com" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-1.5">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="********"
                          type={"password"}
                          {...field}
                        />
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
  );
}
