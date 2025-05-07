"use client";

import { updateAccount } from "@/actions/account";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Account } from "@/types";

const RenameAccountNameForm = ({
  setOpen,
  account,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  account: Account;
}) => {
  const [state, action, pending] = useActionState(updateAccount, undefined);

  useEffect(() => {
    if (state?.success === true) {
      setOpen(false);
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
    <form action={action} className="grid gap-4">
      <input type="hidden" name="id" value={account.id} required />
      {state?.errors?.id && (
        <p className="text-destructive">{state.errors.id}</p>
      )}
      <div className="grid gap-2">
        <Label
          htmlFor="account_name"
          className={`${state?.errors?.account_name && "text-destructive"}`}
        >
          Account name
        </Label>
        <Input
          id="account_name"
          name="account_name"
          placeholder="Account name"
          defaultValue={account.account_name}
          autoComplete="off"
          required
          tabIndex={1}
          autoFocus
          className={`${
            state?.errors?.account_name &&
            "focus-visible:border-destructive/50 focus-visible:ring-destructive/50 border-destructive/50"
          }`}
        />
        {state?.errors?.account_name && (
          <p className="text-destructive">{state.errors.account_name}</p>
        )}
      </div>
      <Button disabled={pending} type="submit" tabIndex={3}>
        {pending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default RenameAccountNameForm;
