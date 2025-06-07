"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbCofing";
import { Budgets, Expenss } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ExpensesPage = () => {
  const { user } = useUser();
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      // Get all budgets for mapping
      const budgetList = await db
        .select({ id: Budgets.id, name: Budgets.name })
        .from(Budgets)
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
      const budgetMap = {};
      budgetList.forEach((b) => (budgetMap[b.id] = b.name));
      setBudgets(budgetMap);
      // Get all expenses
      const allExpenses = await db
        .select()
        .from(Expenss)
        .where(eq(Expenss.createdBy, user?.primaryEmailAddress?.emailAddress));
      setExpenses(allExpenses);
    } catch (err) {
      setError("Failed to load expenses.");
      toast.error("Failed to load expenses.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (expenseId) => {
    await db.delete(Expenss).where(eq(Expenss.id, expenseId));
    fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Filter expenses by search
  const filteredExpenses = expenses.filter((expense) => {
    const budgetName = budgets[expense.budgetId] || "Unknown";
    return (
      expense.name.toLowerCase().includes(search.toLowerCase()) ||
      budgetName.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-10 flex flex-col items-center min-h-screen bg-gray-50">
      <h2 className="font-bold text-3xl mb-6 self-start">All Expenses</h2>
      <input
        type="text"
        placeholder="Search by expense or budget name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 px-4 py-2 border rounded w-full max-w-3xl self-center"
      />
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mb-4">{error}</div>
      ) : filteredExpenses.length === 0 ? (
        <div className="text-gray-500">No expenses found.</div>
      ) : (
        <div className="w-full max-w-3xl overflow-x-auto">
          <table className="min-w-full bg-white border rounded-md shadow">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b text-center font-bold">Budget</th>
                <th className="py-3 px-4 border-b text-center font-bold">Expense Name</th>
                <th className="py-3 px-4 border-b text-right font-bold">Amount</th>
                <th className="py-3 px-4 border-b text-center font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-100 transition-colors">
                  <td className="py-2 px-4 border-b text-center">{budgets[expense.budgetId] || "Unknown"}</td>
                  <td className="py-2 px-4 border-b text-center">{expense.name}</td>
                  <td className="py-2 px-4 border-b text-right font-semibold">{expense.amount}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(expense.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpensesPage; 