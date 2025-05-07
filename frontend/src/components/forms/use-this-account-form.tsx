"use client";

import { updateAccount } from "@/actions/account";
import { Account } from "@/types";
import { useActionState, useRef, useState } from "react";
import { Switch } from "../ui/switch";

const UseThisAccountForm = ({ account }: { account: Account }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const isActiveInputRef = useRef<HTMLInputElement>(null);
  const [useAccount, setUseAccount] = useState(account.is_active);
  const [state, action, pending] = useActionState(updateAccount, undefined);

  const handleToggle = (checked: boolean) => {
    setUseAccount(checked);

    if (isActiveInputRef.current) {
      isActiveInputRef.current.value = checked.toString();
    }

    formRef.current?.requestSubmit();
  };

  return (
    <form
      action={action}
      ref={formRef}
      className="flex items-center gap-2 mt-4"
    >
      <input type="hidden" name="id" value={account.id} required />
      <input
        ref={isActiveInputRef}
        type="hidden"
        name="is_active"
        defaultValue={useAccount.toString()}
      />
      <Switch
        checked={useAccount}
        onCheckedChange={handleToggle}
        disabled={pending}
      />
      <p>Use this account</p>
    </form>
  );
};

export default UseThisAccountForm;
