import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import {api} from "./_generated/api";
const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",

  handler: httpAction(async (ctx, request) => {
    const webHookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webHookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
    }

    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("Missing required headers in webhook request", {
        status: 400,
      });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webHookSecret);
    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-signature": svix_signature,
        "svix-timestamp": svix_timestamp,
      }) as WebhookEvent;
    } catch (error) {
      console.error("Error verifying webhook signature:", error);
      return new Response("Invalid webhook signature", { status: 401 });
    }

    const eventType = evt.type;
    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name } = evt.data;
      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();
      try {
          // save user to your database
          await ctx.runMutation(api.users.syncUser, {
            userId:id,
            email,
            name,
          });
      } catch (error) {
        console.error("Error saving user to database:", error);
        return new Response("Error saving user to database", { status: 500 });
      }
    }



    return new Response("Webhook received successfully...", { status: 200 });
  }),
});

export default http;