"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Account } from "@/types";
import { setAccountId } from "@/actions/account";

const AccountButton = ({ account }: { account: Account }) => {
  const router = useRouter();

  const handleAccountClick = () => {
    setAccountId(account.id);
    router.push("/accounts/details");
  };

  return (
    <Button
      variant="ghost"
      className="w-full rounded-none h-10 text-sm justify-between has-[>svg]:px-6 border-t cursor-pointer"
      onClick={handleAccountClick}
    >
      <span>View Details</span>
      <ArrowUpRight className="transition-transform group-hover:translate-y-[-2px] group-hover:translate-x-[2px] duration-300" />
    </Button>
  );
};

export default AccountButton;
