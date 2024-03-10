import { CalendarIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";
import { EditProfile } from "./EditProfile";
import { useEffect, useState } from "react";
import { getEmployeeById } from "../Services/EmployeeProfile";
import { Logout } from "../Services/AuthService";

export function UserProfile() {
  const user_id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const [data, setData] = useState();
  const [refresh, setRefresh] = useState(false);

  const getData = async () => {
    await getEmployeeById(user_id).then((response) => {
      if (response?.success)
      {
        setData(response);
      }
    });
  };

  useEffect(() => {
    try {
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [refresh]);

  return data !== undefined ? (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">
          <Avatar>
            <AvatarFallback>
              {data?.name ? data?.name[0] : "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className=" w-96">
        <div className="flex justify-between space-x-4">
          <div className="space-y-2 w-96">
            <h4 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              {data?.name}
            </h4>
            <small className="text-sm font-medium leading-none">Id : </small>
            <p className="text-muted-foreground text-sm shadcn-light">
              {data?.id}
            </p>
            <small className="text-sm font-medium leading-none">
              Email address :{" "}
            </small>
            <p className="text-muted-foreground text-sm shadcn-light">
              {data?.email}
            </p>
            <small className="text-sm font-medium leading-none">
              Phone no. :{" "}
            </small>
            <p className="text-muted-foreground text-sm shadcn-light">
              {data?.phone}
            </p>
            {role !== "admin" && (
              <>
                <small className="text-sm font-medium leading-none">
                  Address :
                </small>
                <p className="text-muted-foreground text-sm shadcn-light">
                  {JSON.stringify(data)}
                </p>
              </>
            )}
            <div className="w-full">
              <EditProfile
                employee={data}
                setRefresh={setRefresh}
                refresh={refresh}
              />
            </div>
            <div className="flex justify-between w-full">
              <Button onClick={Logout}>Logout</Button>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ) : (
    <div className="flex items-center justify-center h-96">
      <CalendarIcon className="w-12 h-12 text-muted-foreground" />
    </div>
  );
}
