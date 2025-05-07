import Accounts from "@/components/accounts";
import Header from "@/components/header";
import { buttonVariants } from "@/components/ui/button";
import UserWelcome from "@/components/user-welcome";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

const AccountsPage = () => {
  return (
    <>
      <Header title="Account" />
      <div className="p-4 lg:p-6">
        <div className="mb-4 lg:mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <UserWelcome />
          <div className="space-x-2">
            <Link
              href="/accounts/manage"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Manage Accounts
            </Link>
            <Link
              href="/accounts/add"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Add Account
            </Link>
          </div>
        </div>
        <Suspense fallback={<p>Loading accounts...</p>}>
          <Accounts />
        </Suspense>
      </div>
    </>
  );
};

export default AccountsPage;
