"use server";

import { api } from "@/convex/_generated/api";
import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error("Please provide a Convex URL");
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function createStripeConnectCustomer() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }

  const existingStripeConnectId = await convex.query(
    api.users.getUsersStripeConnectId,
    {
      userId,
    }
  );

  if (existingStripeConnectId) {
    return {
      account: existingStripeConnectId,
    };
  }

  const account = await stripe.accounts.create({
    type: "express",
    capabilities: {
      card_payments: {
        requested: true,
      },
      transfers: {
        requested: true,
      },
    },
  });

  await convex.mutation(api.users.updateUserStripeConnectId, {
    userId,
    stripeConnectId: account.id,
  });

  return {
    account: account.id,
  };
}