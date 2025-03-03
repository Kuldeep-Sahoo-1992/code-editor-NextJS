import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Define the schema for the database
export default defineSchema({
  // Define the 'users' table with various fields
  users: defineTable({
    userId: v.string(), // Unique identifier for the user
    email: v.string(), // User's email address
    name: v.string(), // User's name
    isPro: v.boolean(), // Boolean indicating if the user is a pro member
    proSince: v.optional(v.number()), // Optional field for the date since the user became a pro member
    lemonSqueezyCustomerId: v.optional(v.string()), // Optional field for Lemon Squeezy customer ID
    lemonSqueezyOrderId: v.optional(v.string()), // Optional field for Lemon Squeezy order ID
  }).index("by_user_id", ["userId"]), // Index the table by userId for quick lookup

  // Define the 'codeExecutions' table to store code execution details
  codeExecutions: defineTable({
    userId: v.string(), // ID of the user who executed the code
    language: v.string(), // Programming language of the code
    code: v.string(), // The code that was executed
    output: v.optional(v.string()), // Optional field for the output of the code execution
    error: v.optional(v.string()), // Optional field for any error messages from the code execution
  }).index("by_user_id", ["userId"]), // Index the table by userId for quick lookup

  // Define the 'snippets' table to store code snippets
  snippets: defineTable({
    userId: v.string(), // ID of the user who created the snippet
    title: v.string(), // Title of the snippet
    language: v.string(), // Programming language of the snippet
    code: v.string(), // The code of the snippet
    userName: v.string(), // Store user's name for easy access
  }).index("by_user_id", ["userId"]), // Index the table by userId for quick lookup

  // Define the 'snippetComments' table to store comments on snippets
  snippetComments: defineTable({
    snippetId: v.id("snippets"), // ID of the snippet being commented on
    userId: v.string(), // ID of the user who made the comment
    userName: v.string(), // Name of the user who made the comment
    content: v.string(), // Store HTML content of the comment
  }).index("by_snippet_id", ["snippetId"]), // Index the table by snippetId for quick lookup

  // Define the 'stars' table to store user-starred snippets
  stars: defineTable({
    userId: v.id("users"), // ID of the user who starred the snippet
    snippetId: v.id("snippets"), // ID of the snippet that was starred
  })
    .index("by_user_id", ["userId"]) // Index the table by userId for quick lookup
    .index("by_snippet_id", ["snippetId"]) // Index the table by snippetId for quick lookup
    .index("bu_user_id_and_snippet_id", ["userId", "snippetId"]), // Index by both userId and snippetId for quick lookup
});
