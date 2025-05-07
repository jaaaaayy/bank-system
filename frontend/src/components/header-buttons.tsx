"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { logout } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const HeaderButtons = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const data = await logout();

      router.replace("/login");
      toast.success("Success", {
        description: data.message,
        style: {
          color: "white",
          backgroundColor: "green",
        },
      });
    } catch (error) {
      toast.error("Error", {
        description: error as string,
        style: {
          color: "white",
          backgroundColor: "red",
        },
      });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={"ghost"} size={"icon"} onClick={handleLogout}>
            <LogOut />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Logout</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HeaderButtons;
