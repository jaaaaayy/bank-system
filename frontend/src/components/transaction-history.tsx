import { getTransactions } from "@/actions/transaction";
import TransactionHistoryTable from "@/app/(banking)/accounts/details/transaction-history-table";

const TransactionHistory = async () => {
  const transactions = await getTransactions();

  return <TransactionHistoryTable transactions={transactions} />;
};

export default TransactionHistory;
