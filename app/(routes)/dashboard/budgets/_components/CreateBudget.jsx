"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { db } from "@/utils/dbCofing";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const CreateBudget = () => {
  const [emojiIcon, setEmojiIcon] = useState("😊");
  const [openEmojiDialog, setOpenEmojiDialog] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useUser();

  const onCreateBudget = async () => {
    const data = await db
      .insert(Budgets)
      .values({
        name,
        amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon,
      })
      .returning({ insertedId: Budgets.id });

    if (data) {
      toast("New Budget Created!");
      setDialogOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <div
            onClick={() => setDialogOpen(true)}
            className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md"
          >
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
          </DialogHeader>
          <div className="mt-5">
            <DialogDescription>
              <Button
                onClick={() => setOpenEmojiDialog(!openEmojiDialog)}
                variant="outline"
                className="text-lg"
              >
                {emojiIcon}
              </Button>
            </DialogDescription>
            {openEmojiDialog && (
              <div className="absolute mt-2">
                <EmojiPicker
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji);
                    setOpenEmojiDialog(false);
                  }}
                />
              </div>
            )}
            <div className="mt-2">
              <h2 className="text-black font-medium my-1">Budget Name</h2>
              <Input
                placeholder="e.g. Home Decor"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <h2 className="text-black font-medium my-1">Budget Amount</h2>
              <Input
                type="number"
                placeholder="e.g. 5000$"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <Button
              disabled={!name || !amount}
              onClick={onCreateBudget}
              className="mt-4 w-full"
            >
              Create Budget
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudget;
