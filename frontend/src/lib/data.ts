import "server-only";

import { baseUrl } from "@/lib/constants";
import { cookies } from "next/headers";

export const getAccount = async () => {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  const accountId = cookieStore.get("account_id")?.value;

  const response = await fetch(`${baseUrl}/accounts/${accountId}/get/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to fetch account!");
  }

  const data = await response.json();
  return data.account;
};

export const getAccounts = async () => {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  const customerId = cookieStore.get("customer_id")?.value;

  const response = await fetch(`${baseUrl}/accounts/${customerId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    next: {
      tags: ["accounts"],
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to fetch accounts!");
  }

  const data = await response.json();
  return data.accounts;
};

export const getTransactions = async () => {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  const accountId = cookieStore.get("account_id")?.value;

  const response = await fetch(`${baseUrl}transactions/${accountId}/get/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to fetch transactions!");
  }

  const data = await response.json();
  return data.transactions;
};
