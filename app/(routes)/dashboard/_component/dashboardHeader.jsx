import { UserButton } from "@clerk/nextjs";
import React from "react";

const dashboardHeader = () => {
  return (
    <div className="p-5 shadow-sm border-b flex justify-between">
      <div>search bar</div>
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default dashboardHeader;
