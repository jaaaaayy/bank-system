"use client";

import { addAccount } from "@/actions/account";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { accountTypes } from "@/lib/constants";

const AddAccountForm = () => {
  const [showAccountTypes, setShowAccountTypes] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const router = useRouter();
  const [state, action, pending] = useActionState(addAccount, undefined);

  useEffect(() => {
    if (state?.success === true) {
      router.replace("/accounts");

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
    <form action={action} className="space-y-4">
      <div className="grid gap-2">
        <Label
          htmlFor="account_type"
          className={`${state?.errors?.account_type && "text-destructive"}`}
        >
          Account_type
        </Label>
        <div className="relative">
          <div
            className="h-10 p-2 px-3 border rounded-md shadow-xs flex items-center justify-between"
            onClick={() => setShowAccountTypes(!showAccountTypes)}
          >
            <p>
              {selectedAccountType
                ? selectedAccountType
                : "Select an account type"}
            </p>
            {showAccountTypes ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </div>
          {showAccountTypes && (
            <div className="p-2 rounded-md mt-1 border space-y-1">
              {accountTypes.map((accountType) => (
                <div
                  className={`${
                    selectedAccountType === accountType
                      ? "bg-muted"
                      : "hover:bg-muted"
                  } p-2 px-3 rounded-md`}
                  onClick={() => {
                    setSelectedAccountType(accountType);
                    setShowAccountTypes(false);
                  }}
                >
                  {accountType}
                </div>
              ))}
            </div>
          )}
        </div>
        {state?.errors?.account_type && (
          <p className="text-destructive">{state.errors.account_type}</p>
        )}
        <input type="hidden" name="account_type" value={selectedAccountType} />
      </div>
      <Button disabled={pending} type="submit" tabIndex={2}>
        {pending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default AddAccountForm;
