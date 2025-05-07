"use client";

import { createTransaction } from "@/actions/transaction";
import { Account } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const TransferForm = ({ activeAccounts }: { activeAccounts: Account[] }) => {
  const [selectedAccount, setSelectedAccount] = useState<Account>(
    activeAccounts[0]
  );
  const [showAccounts, setShowAccounts] = useState(false);
  const [state, action, pending] = useActionState(createTransaction, undefined);

  const handleSelectAccount = (account: Account) => {
    setSelectedAccount(account);
    setShowAccounts(false);
  };

  useEffect(() => {
    if (state?.success === true) {
      toast.success("Success", {
        description: state.message,
        style: {
          color: "white",
          backgroundColor: "green",
        },
      });
    } else if (state?.success === false) {
      toast.error("Error", {
        description: state.message,
        style: {
          color: "white",
          backgroundColor: "red",
        },
      });
    }
  }, [state]);

  return (
    <form action={action} className="grid gap-6">
      <Input type="hidden" name="account" value={selectedAccount.id} />
      <Input type="hidden" name="from_account" value={selectedAccount.id} />
      <Input type="hidden" name="transaction_type" value="Fund Transfer" />
      <div className="grid gap-2">
        <div className="border rounded-md shadow-xs">
          <div
            className="flex justify-between items-center cursor-pointer p-4 py-2 lg:p-6 border-b"
            onClick={() => setShowAccounts(!showAccounts)}
          >
            <Label
              htmlFor="from_account"
              className={`${state?.errors?.from_account && "text-destructive"}`}
            >
              Transfer from
            </Label>
            {showAccounts ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {showAccounts ? (
            <div>
              {activeAccounts?.map((account) => (
                <div
                  key={account.id}
                  className={`p-4 lg:p-6 border-b flex justify-between items-center cursor-pointer h-14 lg:h-16 ${
                    selectedAccount.id === account.id
                      ? "bg-muted"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleSelectAccount(account)}
                >
                  <div>
                    <p className="font-medium">{account.account_type}</p>
                    <p className="font-medium">{account.account_number}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Available balance</p>
                    <p className="font-medium">{account.current_balance}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 lg:p-6 flex justify-between items-center h-14 lg:h-16">
              <div>
                <p className="font-medium">{selectedAccount.account_type}</p>
                <p className="font-medium">{selectedAccount.account_number}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Current balance</p>
                <p className="font-medium">{selectedAccount.current_balance}</p>
              </div>
            </div>
          )}
        </div>
        {state?.errors?.from_account && (
          <p className="text-destructive">{state.errors.from_account}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label
          htmlFor="to_account_number"
          className={`${
            state?.errors?.to_account_number && "text-destructive"
          }`}
        >
          Transfer to
        </Label>
        <Input
          type="number"
          id="to_account_number"
          name="to_account_number"
          placeholder="Enter account number"
          required
          autoComplete="off"
          className={`${
            state?.errors?.to_account_number &&
            "focus-visible:border-destructive/50 focus-visible:ring-destructive/50 border-destructive/50"
          }`}
        />
        {state?.errors?.to_account_number && (
          <p className="text-destructive">{state?.errors?.to_account_number}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label
          htmlFor="amount"
          className={`${state?.errors?.amount && "text-destructive"}`}
        >
          Amount
        </Label>
        <Input
          type="number"
          id="amount"
          name="amount"
          className={`${
            state?.errors?.amount &&
            "focus-visible:border-destructive/50 focus-visible:ring-destructive/50 border-destructive/50"
          }`}
          required
        />
        {state?.errors?.amount && (
          <p className="text-destructive">{state?.errors?.amount}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label
          htmlFor="note"
          className={`${state?.errors?.note && "text-destructive"}`}
        >
          Note (optional)
        </Label>
        <Textarea
          id="note"
          name="note"
          autoComplete="off"
          className={`${
            state?.errors?.note &&
            "focus-visible:border-destructive/50 focus-visible:ring-destructive/50 border-destructive/50"
          }`}
        />
        {state?.errors?.note && (
          <p className="text-destructive">{state?.errors?.note}</p>
        )}
      </div>
      <Button className="w-fit" type="submit" disabled={pending}>
        {pending ? "Transferring..." : "Transfer"}
      </Button>
    </form>
  );
};

export default TransferForm;
