"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const ManageAccountButton = () => {
  const router = useRouter();

  return (
    <Button variant="outline" onClick={() => router.push("/accounts/manage")}>
      Manage Accounts
    </Button>
  );
};

export default ManageAccountButton;
