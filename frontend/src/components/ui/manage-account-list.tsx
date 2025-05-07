"use client";

import { Account } from "@/types";
import { PenLine } from "lucide-react";
import { useState } from "react";
import RenameAccountNameForm from "../forms/rename-account-name-form";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Switch } from "./switch";
import UseThisAccountForm from "../forms/use-this-account-form";

const ManageAccountlist = ({ depositAccounts }: { depositAccounts: any }) => {
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState<Account | null>(null);

  return (
    <>
      <h2 className="font-medium text-lg mb-2 lg:mb-4 flex items-center gap-2">
        Deposits <Badge variant={"outline"}>{depositAccounts.length}</Badge>
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {depositAccounts.map((account: Account) => (
          <Card key={account.id}>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="font-medium">{account.account_name}</p>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setAccount(account);
                    setOpen(true);
                  }}
                >
                  <PenLine className="size-4" />
                </Button>
              </div>
              <p className="font-medium">{account.account_number}</p>
              <UseThisAccountForm account={account} />
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename account name</DialogTitle>
          </DialogHeader>
          {account && (
            <RenameAccountNameForm setOpen={setOpen} account={account} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageAccountlist;
