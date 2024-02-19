import React from "react";
import { UserProfile } from "./UserProfile";
import {MainNav} from "./MainNav";


const Navbar = () => {
  return (
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserProfile />
          </div>
        </div>
      </div>
  );
};

export default Navbar;
