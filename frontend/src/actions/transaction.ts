"use server";

import { baseUrl } from "@/lib/constants";
import { transferFormSchema, TransferFormState } from "@/lib/definitions";
import { cookies } from "next/headers";

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

export const createTransaction = async (
  state: TransferFormState,
  formData: FormData
) => {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  const validatedFields = transferFormSchema.safeParse({
    account: parseInt(formData.get("account") as string),
    transaction_type: formData.get("transaction_type") as string,
    from_account: parseInt(formData.get("from_account") as string),
    to_account_number: formData.get("to_account_number"),
    amount: parseInt(formData.get("amount") as string),
    note: formData.get("note"),
  });

  console.log(validatedFields.data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${baseUrl}transactions/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      message: error.detail || "Failed to create transaction!",
      success: false,
    };
  }

  const data = await response.json();

  return {
    message: data.message,
    success: true,
  };
};
