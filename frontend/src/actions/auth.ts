"use server";

import { baseUrl } from "@/lib/constants";
import { loginFormSchema, LoginFormState } from "@/lib/definitions";
import { cookies } from "next/headers";

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

  return data;
};
