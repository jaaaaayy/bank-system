"use server";

import { baseUrl } from "@/lib/constants";
import {
  addAccountFormSchema,
  AddAccountFormState,
  updateAccountFormSchema,
  UpdateAccountFormState,
} from "@/lib/definitions";
import { revalidateTag } from "next/cache";
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

export const setAccountId = async (id: number) => {
  const cookieStore = await cookies();
  cookieStore.set("account_id", id.toString());
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

export const addAccount = async (
  state: AddAccountFormState,
  formData: FormData
) => {
  const validatedFields = addAccountFormSchema.safeParse({
    account_type: formData.get("account_type"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  const customerId = cookieStore.get("customer_id")?.value;

  const response = await fetch(`${baseUrl}/accounts/${customerId}/add/`, {
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
      message: error.detail || "Failed to add account.",
      success: false,
    };
  }

  const data = await response.json();

  return {
    message: data.message,
    success: true,
  };
};

export const updateAccount = async (
  state: UpdateAccountFormState,
  formData: FormData
) => {
  console.log("FormData raw entries:");
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }
  const accountId = formData.get("id") as string;

  const validatedFields = updateAccountFormSchema.safeParse({
    account_name: formData.get("account_name") || undefined,
    is_active:
      formData.get("is_active") === "true"
        ? true
        : formData.get("is_active") === "false"
        ? false
        : undefined,
  });

  console.log("data", validatedFields.data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  const response = await fetch(`${baseUrl}/accounts/${accountId}/update/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      message: error.detail || "Failed to update account.",
      success: false,
    };
  }

  const data = await response.json();
  console.log("success", data);
  revalidateTag("accounts");

  return {
    message: data.message,
    success: true,
  };
};
