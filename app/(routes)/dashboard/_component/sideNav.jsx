"use client";
import { UserButton } from "@clerk/nextjs";
import { LayoutGrid, PiggyBank, ReceiptCent, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budget",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptCent,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];

  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <div className="h-screen p-5 border shadow-md">
      <Image src="/logo.svg" alt="Logo" width={160} height={100} />
      <div className="mt-5">
        {menuList.map((menu) => (
          <Link href={menu.path} key={menu.id} passHref>
            <h2
              className={`flex gap-2 mb-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md transition-colors duration-200 ${
                pathname === menu.path
                  ? "text-primary bg-blue-100"
                  : "hover:text-primary hover:bg-blue-50"
              }`}
              aria-label={menu.name}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 items-center">
        <UserButton />
        Profile
      </div>
    </div>
  );
};

export default SideNav;
