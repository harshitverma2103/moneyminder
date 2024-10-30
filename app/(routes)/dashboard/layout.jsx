import React from "react";
import SideNav from "./_component/sidenav";
import DashboardHeader from "./_component/dashboardHeader";

const dashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};

export default dashboardLayout;
