import { Dispatch, SetStateAction } from "react";

export interface Transaction {
  id: number;
  account: number;
  branch: {
    branch_name: string;
  } | null;
  transaction_type: string;
  transaction_date: string;
  amount: string;
  currency: string;
  description: string | null;
  from_account: {
    account_numer: string;
  } | null;
  to_account: {
    account_numer: string;
  } | null;
  running_balance: string;
  note: string | null;
}

export type Account = {
  id: number;
  account_holder: number;
  branch: {
    branch_name: string;
  };
  product: string;
  account_name: string;
  account_number: string;
  account_type: string;
  current_balance: number;
  is_active: boolean;
  opened_at: string;
  closed_at: string | null;
  updated_at: string;
};

export type UserContextProps = {
  fullName: string | null;
  setFullName: Dispatch<SetStateAction<string | null>>;
  lastLogin: string | null;
  setLastLogin: Dispatch<SetStateAction<string | null>>;
  lastFailedLogin: string | null;
  setLastFailedLogin: Dispatch<SetStateAction<string | null>>;
};
