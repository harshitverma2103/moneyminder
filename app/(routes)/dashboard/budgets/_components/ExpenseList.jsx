"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/dbCofing";
import { Expenss } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const ExpenseList = ({ budgetId }) => {
  const [expenses, setExpenses] = useState([]);
  const [editExpense, setEditExpense] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getExpenses = async () => {
    if (!budgetId) return;
    setLoading(true);
    setError("");
    try {
      const result = await db
        .select()
        .from(Expenss)
        .where(eq(Expenss.budgetId, budgetId));
      setExpenses(result);
    } catch (err) {
      setError("Failed to load expenses.");
      toast.error("Failed to load expenses.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (expense) => {
    setEditExpense(expense);
    setEditName(expense.name);
    setEditAmount(expense.amount);
  };

  const handleEditSave = async () => {
    if (!editExpense) return;
    try {
      await db.update(Expenss)
        .set({ name: editName, amount: Number(editAmount) })
        .where(eq(Expenss.id, editExpense.id));
      toast.success("Expense updated!");
      setEditExpense(null);
      getExpenses();
    } catch (err) {
      toast.error("Failed to update expense.");
    }
  };

  useEffect(() => {
    getExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budgetId]);

  if (!budgetId) return null;

  return (
    <div className="mt-4">
      <h3 className="font-bold text-lg mb-2">Expenses</h3>
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mb-4">{error}</div>
      ) : expenses.length === 0 ? (
        <div className="text-gray-500">No expenses found for this budget.</div>
      ) : (
        <ul className="space-y-2">
          {expenses.map((expense) => (
            <li key={expense.id} className="border p-2 rounded flex justify-between items-center gap-2">
              <span>{expense.name}</span>
              <span className="font-semibold">{expense.amount}</span>
              <Button size="sm" variant="outline" onClick={() => handleEdit(expense)}>Edit</Button>
            </li>
          ))}
        </ul>
      )}
      <Dialog open={!!editExpense} onOpenChange={(open) => !open && setEditExpense(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <Input
              placeholder="Expense Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="mb-2"
            />
            <Input
              type="number"
              placeholder="Amount"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
              className="mb-2"
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={handleEditSave} disabled={!editName || !editAmount}>Save</Button>
              <Button variant="secondary" onClick={() => setEditExpense(null)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpenseList; 