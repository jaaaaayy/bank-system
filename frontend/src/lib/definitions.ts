import { z } from "zod";

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(6, "Username must be at least 6 characters long.")
    .max(30, "Username must be at most 30 characters long.")
    .trim(),
  password: z
    .string()
    .min(8, "Be at least 8 characters long.")
    .max(255, "Be at most 255 characters long.")
    .regex(/[a-z]/, "Contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Contain at least one uppercase letter.")
    .regex(/[0-9]/, "Contain at least one number.")
    .regex(/[^a-zA-Z0-9]/, "Contain at least one special character.")
    .trim(),
});

export type LoginFormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
      success?: boolean;
      fullname?: string;
      lastLogin?: string;
      lastFailedLogin?: string;
    }
  | undefined;

export const registerFormSchema = z
  .object({
    email: z.string().email(),
    first_name: z.string(),
    middle_name: z.string().optional(),
    last_name: z.string(),
    date_of_birth: z.string(),
    address_line_1: z.string(),
    address_line_2: z.string().optional(),
    city: z.string(),
    province: z.string(),
    postal_code: z.string(),
    phone_number: z.string(),
  })
  .merge(loginFormSchema);

export type RegisterFormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
        email?: string[];
        first_name?: string[];
        middle_name?: string[];
        last_name?: string[];
        date_of_birth?: string[];
        address_line_1?: string[];
        address_line_2?: string[];
        city?: string[];
        province?: string[];
        postal_code?: string[];
        phone_number?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;

export const transferFormSchema = z.object({
  account: z.number(),
  amount: z.number().min(300, "Amount should be at least 300."),
  transaction_type: z.string(),
  from_account: z.number(),
  to_account_number: z.coerce.number({
    message: "Account number is invalid.",
  }),
  note: z.string().optional(),
});

export type TransferFormState =
  | {
      errors?: {
        account?: string[];
        amount?: string[];
        transaction_type?: string[];
        from_account?: string[];
        to_account_number?: string[];
        note?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;

export const addAccountFormSchema = z.object({
  account_type: z.string(),
});

export type AddAccountFormState =
  | {
      errors?: {
        account_type?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;

export const updateAccountFormSchema = z.object({
  id: z.number().optional(),
  account_name: z.string().optional(),
  is_active: z.boolean().optional(),
});

export type UpdateAccountFormState =
  | {
      errors?: {
        id?: string[];
        account_name?: string[];
        is_active?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;
