import Stripe from "stripe";
import { types } from "util";

const stripeApiKey = process.env.STRIPE_API_KEY || ""; // Set a default value if STRIPE_API_KEY is undefined

export const stripe = new Stripe(stripeApiKey, {
   apiVersion: "2024-04-10",
   typescript: true,
});
