"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbCofing";
import { Budgets, Expenss } from "@/utils/schema";
import { sql, eq, desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

const Dashboard = () => {
  const { user } = useUser();
  const [summary, setSummary] = useState({
    totalBudgets: 0,
    totalSpend: 0,
    recentExpenses: [],
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSummary = async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      // Get budgets
      const budgets = await db
        .select({
          id: Budgets.id,
          name: Budgets.name,
          amount: Budgets.amount,
        })
        .from(Budgets)
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
      // Get total spend
      const spendResult = await db
        .select({
          total: sql`COALESCE(SUM(${Expenss.amount}), 0)`.mapWith(Number),
        })
        .from(Expenss)
        .where(eq(Expenss.createdBy, user?.primaryEmailAddress?.emailAddress));
      // Get recent expenses
      const recentExpenses = await db
        .select()
        .from(Expenss)
        .where(eq(Expenss.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Expenss.id))
        .limit(5);
      setSummary({
        totalBudgets: budgets.length,
        totalSpend: spendResult[0]?.total || 0,
        recentExpenses,
      });
    } catch (err) {
      setError("Failed to load dashboard data.");
      toast.error("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Filter recent expenses by search
  const filteredExpenses = summary.recentExpenses.filter((expense) => {
    return (
      expense.name.toLowerCase().includes(search.toLowerCase()) ||
      String(expense.amount).toLowerCase().includes(search.toLowerCase())
    );
  });

  // Prepare data for analytics
  const pieData = summary.recentExpenses.map((expense) => ({
    name: expense.name,
    value: expense.amount,
  }));
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57", "#ffc0cb"];

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl mb-4">
        Welcome{user?.firstName ? `, ${user.firstName}` : ""}!
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mb-4">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-md p-6 shadow border flex flex-col items-center">
              <div className="text-2xl font-bold">{summary.totalBudgets}</div>
              <div className="text-gray-600">Budgets</div>
            </div>
            <div className="bg-white rounded-md p-6 shadow border flex flex-col items-center">
              <div className="text-2xl font-bold">{summary.totalSpend}</div>
              <div className="text-gray-600">Total Spend</div>
            </div>
            <div className="bg-white rounded-md p-6 shadow border flex flex-col items-center">
              <div className="text-2xl font-bold">{summary.recentExpenses.length}</div>
              <div className="text-gray-600">Recent Expenses</div>
            </div>
          </div>
          <div className="mb-8 flex gap-4">
            <Link href="/dashboard/budgets">
              <Button>Add New Budget</Button>
            </Link>
          </div>
    <div>
            <h3 className="font-bold text-xl mb-2">Recent Expenses</h3>
            <input
              type="text"
              placeholder="Search recent expenses by name or amount..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4 px-4 py-2 border rounded w-full max-w-xl"
            />
            {filteredExpenses.length === 0 ? (
              <div className="text-gray-500">No recent expenses.</div>
            ) : (
              <ul className="space-y-2">
                {filteredExpenses.map((expense) => (
                  <li key={expense.id} className="border p-2 rounded flex justify-between items-center">
                    <span>{expense.name}</span>
                    <span className="font-semibold">{expense.amount}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
