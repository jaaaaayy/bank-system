"use client";

import { useUserContext } from "@/hooks/use-user-context";
import { SidebarMenuItem } from "./ui/sidebar";

const LoginHistory = () => {
  const { lastLogin, lastFailedLogin } = useUserContext();

  return (
    <>
      <SidebarMenuItem>
        <p className="text-muted-foreground">
          Last login was: <br />
          {lastLogin ? (
            <span className="font-medium text-foreground">
              {new Date(lastLogin).toLocaleString()}
            </span>
          ) : (
            <span className="font-medium text-foreground">
              Loading last login...
            </span>
          )}
        </p>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <p className="text-muted-foreground">
          Last failed login was: <br />
          {lastFailedLogin ? (
            <span className="font-medium text-foreground">
              {new Date(lastFailedLogin).toLocaleString()}
            </span>
          ) : (
            <span className="font-medium text-foreground">
              Loading last failed login...
            </span>
          )}
        </p>
      </SidebarMenuItem>
    </>
  );
};

export default LoginHistory;
