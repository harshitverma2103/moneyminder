"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { db } from "@/utils/dbCofing";
import { Budgets, Expenss } from "@/utils/schema";
import { eq, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import AddExpense from "./AddExpense";
import ExpenseList from "./ExpenseList";
import { toast } from "sonner";

const BudgetList = () => {
  const [budgets, setBudgets] = useState([]);
  const { user } = useUser();
  const [expandedBudgetId, setExpandedBudgetId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getBudgetList = async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      const result = await db
        .select({
          id: Budgets.id,
          name: Budgets.name,
          amount: Budgets.amount,
          icon: Budgets.icon,
          totalSpend: sql`COALESCE(SUM(${Expenss.amount}), 0)`.mapWith(Number),
          totalItem: sql`COUNT(${Expenss.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenss, eq(Budgets.id, Expenss.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id);
      setBudgets(result);
    } catch (err) {
      setError("Failed to load budgets.");
      toast.error("Failed to load budgets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBudgetList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Filter budgets by search
  const filteredBudgets = budgets.filter((budget) => {
    return (
      budget.name.toLowerCase().includes(search.toLowerCase()) ||
      String(budget.amount).toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="mt-8">
      <input
        type="text"
        placeholder="Search by budget name or amount..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 px-4 py-2 border rounded w-full max-w-2xl block mx-auto"
      />
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mb-4">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CreateBudget />
          {filteredBudgets.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 mt-8">No budgets found. Create one!</div>
          ) : (
            filteredBudgets.map((budget) => (
              <div key={budget.id} className="bg-white rounded-md p-6 shadow border flex flex-col gap-2">
                <div className="flex items-center gap-2 text-3xl">{budget.icon || "💰"} <span className="text-lg font-bold">{budget.name}</span></div>
                <div className="text-gray-700">Budget Amount: <span className="font-semibold">{budget.amount}</span></div>
                <div className="text-gray-700">Total Spend: <span className="font-semibold">{budget.totalSpend}</span></div>
                <div className="text-gray-700">Items: <span className="font-semibold">{budget.totalItem}</span></div>
                <button
                  className="mt-2 text-blue-600 underline text-left"
                  onClick={() => setExpandedBudgetId(expandedBudgetId === budget.id ? null : budget.id)}
                >
                  {expandedBudgetId === budget.id ? "Hide Expenses" : "Show Expenses"}
                </button>
                {expandedBudgetId === budget.id && (
                  <>
                    <AddExpense budgetId={budget.id} onExpenseAdded={getBudgetList} />
                    <ExpenseList budgetId={budget.id} />
                  </>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BudgetList;
