"use client";

import { UserContextProps } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [fullName, setFullName] = useState<string | null>(null);
  const [lastLogin, setLastLogin] = useState<string | null>(null);
  const [lastFailedLogin, setLastFailedLogin] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullName(localStorage.getItem("fullName"));
      setLastLogin(localStorage.getItem("lastLogin"));
      setLastFailedLogin(localStorage.getItem("lastFailedLogin"));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && fullName) {
      localStorage.setItem("fullName", fullName);
    }
  }, [lastLogin]);

  useEffect(() => {
    if (typeof window !== "undefined" && lastLogin) {
      localStorage.setItem("lastLogin", lastLogin);
    }
  }, [lastLogin]);

  useEffect(() => {
    if (typeof window !== "undefined" && lastFailedLogin) {
      localStorage.setItem("lastFailedLogin", lastFailedLogin);
    }
  }, [lastFailedLogin]);

  return (
    <UserContext.Provider
      value={{
        fullName,
        setFullName,
        lastLogin,
        lastFailedLogin,
        setLastLogin,
        setLastFailedLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
