import { getAccounts } from "@/actions/account";
import { Account } from "@/types";
import TransferForm from "./forms/transfer-form";

const Transfer = async () => {
  const accounts = await getAccounts();

  const activeAccounts = accounts.filter(
    (account: Account) => account.is_active
  );

  return <TransferForm activeAccounts={activeAccounts} />;
};

export default Transfer;
