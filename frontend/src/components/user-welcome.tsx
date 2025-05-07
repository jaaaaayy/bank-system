"use client";

import { useUserContext } from "@/hooks/use-user-context";

const UserWelcome = () => {
  const { fullName } = useUserContext();

  return (
    <h1 className="text-xl font-semibold">
      Welcome, {fullName ? fullName : "Loading full name..."}
    </h1>
  );
};

export default UserWelcome;
