"use client"; // Ensure this is at the top of your component
import React, { useEffect } from "react";
import SideNav from "./_component/sidenav";
import DashboardHeader from "./_component/dashboardHeader";
import { db } from "../../../utils/dbCofing";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const DashboardLayout = ({ children }) => {
  const { user } = useUser();

  useEffect(() => {
    if (user) checkBudget();
  }, [user]);

  const checkBudget = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
    console.log(result);
    if (result.length === 0) {
      redirect("/dashboard/budgets");
    }
  };

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

export default DashboardLayout;
