"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbCofing";
import { Budgets, Expenss } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57", "#ffc0cb"];

const AnalyticsPage = () => {
  const { user } = useUser();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      const allExpenses = await db
        .select()
        .from(Expenss)
        .where(eq(Expenss.createdBy, user?.primaryEmailAddress?.emailAddress));
      setExpenses(allExpenses);
    } catch (err) {
      setError("Failed to load analytics data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Prepare data for charts
  const pieData = expenses.reduce((acc, expense) => {
    const existingExpense = acc.find(item => item.name === expense.name);
    const amount = parseFloat(expense.amount);
    if (existingExpense) {
      existingExpense.value += amount;
    } else {
      acc.push({
        name: expense.name,
        value: amount
      });
    }
    return acc;
  }, []);

  console.log('Aggregated expenses:', pieData);

  return (
    <div className="p-10 flex flex-col items-center min-h-screen bg-gray-50">
      <h2 className="font-bold text-3xl mb-6 self-start">Analytics & Reporting</h2>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mb-4">{error}</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
          <div className="bg-white rounded-md shadow p-4 flex-1">
            <h4 className="font-semibold mb-2">Expenses (Pie Chart)</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-md shadow p-4 flex-1">
            <h4 className="font-semibold mb-2">Expenses (Bar Chart)</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={pieData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage; 