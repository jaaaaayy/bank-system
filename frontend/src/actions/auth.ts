"use server";

import { baseUrl } from "@/lib/constants";
import {
  loginFormSchema,
  LoginFormState,
  registerFormSchema,
  RegisterFormState,
} from "@/lib/definitions";
import { cookies } from "next/headers";

export const register = async (
  state: RegisterFormState,
  formData: FormData
) => {
  const validatedFields = registerFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
    first_name: formData.get("first_name"),
    middle_name: formData.get("middle_name"),
    last_name: formData.get("last_name"),
    date_of_birth: formData.get("date_of_birth"),
    address_line_1: formData.get("address_line_1"),
    address_line_2: formData.get("address_line_2"),
    city: formData.get("city"),
    province: formData.get("province"),
    postal_code: formData.get("postal_code"),
    phone_number: formData.get("phone_number"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${baseUrl}auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      message: error.detail || "Failed to register.",
      success: false,
    };
  }

  const data = await response.json();

  return {
    message: data.message,
    success: true,
  };
};

export const login = async (state: LoginFormState, formData: FormData) => {
  const validatedFields = loginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${baseUrl}auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      message: error.detail || "Failed to login.",
      success: false,
    };
  }

  const data = await response.json();

  const cookieStore = await cookies();

  cookieStore.set("access", data.user.access, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: data.user.access_lifetime,
    path: "/",
  });

  cookieStore.set("refresh", data.user.refresh, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: data.user.refresh_lifetime,
    path: "/",
  });

  cookieStore.set("customer_id", data.user.customer_id, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: data.user.refresh_lifetime,
    path: "/",
  });

  return {
    message: data.message,
    success: true,
    fullName: data.user.full_name,
    lastLogin: data.user.last_login,
    lastFailedLogin: data.user.last_failed_login,
  };
};

export const logout = async () => {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  const response = await fetch(`${baseUrl}auth/logout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to logout.");
  }

  const data = await response.json();

  cookieStore.delete("access");
  cookieStore.delete("refresh");
  cookieStore.delete("customer_id");
  cookieStore.delete("account_id");

  return data;
};
