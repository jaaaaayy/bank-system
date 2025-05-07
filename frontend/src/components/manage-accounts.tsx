import { getAccounts } from "@/actions/account";
import { Account } from "@/types";
import ManageAccountlist from "./ui/manage-account-list";

const ManageAccounts = async () => {
  const accounts = await getAccounts();

  const depositAccounts = accounts.filter(
    (account: Account) => account.product === "Deposit"
  );

  return <ManageAccountlist depositAccounts={depositAccounts} />;
};

export default ManageAccounts;
