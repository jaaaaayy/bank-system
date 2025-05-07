import { getAccount } from "@/actions/account";
import { Account } from "@/types";
import { PhilippinePeso } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const AccountDetails = async () => {
  const account: Account = await getAccount();

  return (
    <Card>
      <CardContent className="text-base grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <p className="text-muted-foreground">Product</p>
          <p className="font-medium">{account.product}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Account name</p>
          <p className="font-medium">{account.account_name}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Account type</p>
          <p className="font-medium">{account.account_type}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Account number</p>
          <p className="font-medium">{account.account_number}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Current balance</p>
          <p className="font-medium flex items-center">
            <span className="text-muted-foreground">
              <PhilippinePeso size={16} />
            </span>
            {new Intl.NumberFormat("en-PH").format(account.current_balance)}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Branch</p>
          <p className="font-medium">{account.branch.branch_name}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Opened At</p>
          <p className="font-medium">
            {new Date(account.opened_at).toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountDetails;
