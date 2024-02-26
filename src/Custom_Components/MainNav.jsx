import * as React from "react"

import { cn } from "../lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu"
import { Link } from "react-router-dom"

const employees = [
  {
    title: "Admins",
    href: "/all/admin",
  },
  {
    title: "Customer",
    href: "/all/customer",
  },
  {
    title: "Delivery Mans",
    href: "/all/deliveryman",
  },
  {
    title: "Suppliers",
    href: "/all/supplier",
  },
  {
    title: "Warehouse Managers",
    href: "/all/wmanager",
  },
]

const orders = [
  {
    title: "Retail Order",
    href: "/all/order",
  },
  {
    title: "Return Order",
    href: "/all/return-order",
  },
  {
    title: "Supply Order",
    href: "/all/supply-order",
  },
  {
    title: "Return Supply Order",
    href: "/all/return-supply-order",
  },
  {
    title: "WareHouse to WareHouse Order",
    href: "/all/w2wOrder",
  },
]

export function MainNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Dashboard
              </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Employees</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-3 p-4 md:w-[350px] md:grid-cols-2 lg:w-[450px] font-mono">
              {employees?.map((employee,key) => (
                <div key={key} className=" border-2 rounded-md group inline-flex h-10 items-center justify-center bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  <Link to={employee.href} legacyBehavior passHref>
                    {employee.title}
                  </Link>
                </div>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Orders</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-3 p-4 md:w-[350px] md:grid-cols-2 lg:w-[450px] font-mono">
              {orders?.map((order,key) => (
                <div key={key} className=" border-2 rounded-md group inline-flex h-10 items-center justify-center bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  <Link to={order.href} legacyBehavior passHref>
                    {order.title}
                  </Link>
                </div>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/all/products">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Products
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
