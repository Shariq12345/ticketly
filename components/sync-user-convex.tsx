"use client";
import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const SyncUserConvex = () => {
  const { user } = useUser();

  const updateUser = useMutation(api.users.updateUser);

  useEffect(() => {
    if (!user) return;

    const syncuser = async () => {
      try {
        await updateUser({
          userId: user.id,
          name: `${user.firstName ?? ""} ${user.lastName ?? ""}`,
          email: user.emailAddresses[0].emailAddress ?? "",
        });
      } catch (error) {
        console.log("Error syncing user", error);
      }
    };

    syncuser();
  }, [user, updateUser]);

  return null;
};

export default SyncUserConvex;
