import { getAccounts } from "@/actions/account";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Account } from "@/types";
import { ChevronRight, PhilippinePeso } from "lucide-react";
import AccountButton from "./account-button";
import { Badge } from "./ui/badge";

const Accounts = async () => {
  const accounts = await getAccounts();

  const depositAccounts = accounts.filter(
    (account: Account) => account.product === "Deposit" && account.is_active
  );

  return (
    <>
      <h2 className="font-medium text-lg mb-2 lg:mb-4 flex items-center gap-2">
        Deposits <Badge variant={"outline"}>{depositAccounts.length}</Badge>
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {depositAccounts.map((account: Account) => (
          <Card key={account.id} className="pb-0 gap-0 group">
            <CardContent>
              <div className="flex items-start justify-between gap-2">
                <div className="pb-6">
                  <p className="font-medium">{account.account_name}</p>
                  <p className="font-medium">{account.account_number}</p>
                </div>
                <ChevronRight className="size-5 text-muted opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300" />
              </div>
              <Separator />
              <div className="py-6">
                <p className="font-medium text-muted-foreground">
                  Current balance
                </p>
                <p className="flex items-center text-lg font-semibold gap-1">
                  <PhilippinePeso className="size-4" />
                  <span>{account.current_balance}</span>
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-0">
              <AccountButton account={account} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Accounts;
