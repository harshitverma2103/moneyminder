"use client";
import React, { useState } from "react";
import { db } from "@/utils/dbCofing";
import { Expenss } from "@/utils/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const AddExpense = ({ budgetId, onExpenseAdded }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { user } = useUser();

  const handleAddExpense = async () => {
    if (!name || !amount || !budgetId) return;
    await db.insert(Expenss).values({
      name,
      amount: Number(amount),
      budgetId,
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });
    toast("Expense added!");
    setName("");
    setAmount("");
    if (onExpenseAdded) onExpenseAdded();
  };

  if (!budgetId) return null;

  return (
    <div className="mt-4">
      <h3 className="font-bold text-lg mb-2">Add Expense</h3>
      <Input
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2"
      />
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-2"
      />
      <Button onClick={handleAddExpense} disabled={!name || !amount}>
        Add Expense
      </Button>
    </div>
  );
};

export default AddExpense; 