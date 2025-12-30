import * as p from "drizzle-orm/pg-core";
import { timestamps } from "@/lib/db/columns.helpers";

export const users = p.pgTable("users", {
  id: p.text("id").primaryKey(),
  name: p.text("name").notNull(),
  email: p.text("email").notNull().unique(),
  emailVerified: p.boolean("email_verified").default(false).notNull(),
  image: p.text("image"),
  ...timestamps,
});

export const sessions = p.pgTable("session", {
  id: p.text("id").primaryKey(),
  token: p.text("token").notNull().unique(),
  expiresAt: p.timestamp("expires_at").notNull(),
  ipAddress: p.text("ip_address"),
  userAgent: p.text("user_agent"),
  userId: p
    .text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  ...timestamps,
});

export const accounts = p.pgTable("account", {
  id: p.text("id").primaryKey(),
  accountId: p.text("account_id").notNull(),
  providerId: p.text("provider_id").notNull(),
  userId: p
    .text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: p.text("access_token"),
  refreshToken: p.text("refresh_token"),
  idToken: p.text("id_token"),
  expiresAt: p.timestamp("expires_at"),
  password: p.text("password"),
  ...timestamps,
});

export const verifications = p.pgTable("verification", {
  id: p.text("id").primaryKey(),
  identifier: p.text("identifier").notNull(),
  value: p.text("value").notNull(),
  expiresAt: p.timestamp("expires_at").notNull(),
  ...timestamps,
});

export const wallets = p.pgTable("wallets", {
  id: p.uuid("id").defaultRandom().primaryKey(),
  userId: p
    .text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  name: p.varchar("name", { length: 50 }).notNull(),
  type: p.varchar("type", { length: 20 }).notNull(),
  balance: p
    .decimal("balance", { precision: 15, scale: 2 })
    .default("0")
    .notNull(),
  currency: p.varchar("currency", { length: 3 }).default("IDR").notNull(),
  isMain: p.boolean("is_main").default(false).notNull(),
  ...timestamps,
});

export const categories = p.pgTable("categories", {
  id: p.uuid("id").defaultRandom().primaryKey(),
  userId: p
    .text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  name: p.varchar("name", { length: 50 }).notNull(),
  type: p.varchar("type", { length: 20 }).notNull(),
  budgetLimit: p.decimal("budget_limit", { precision: 15, scale: 2 }),
  ...timestamps,
});

export const transactions = p.pgTable("transactions", {
  id: p.uuid("id").defaultRandom().primaryKey(),
  userId: p
    .text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  walletId: p
    .uuid("wallet_id")
    .references(() => wallets.id, { onDelete: "set null" }),
  categoryId: p
    .uuid("category_id")
    .references(() => categories.id, { onDelete: "set null" }),

  amount: p.decimal("amount", { precision: 15, scale: 2 }).notNull(),
  description: p.text("description"),
  transactionDate: p.timestamp("transaction_date").defaultNow().notNull(),

  ...timestamps,
});

export const monthlyBudgets = p.pgTable("monthly_budgets", {
  id: p.uuid("id").defaultRandom().primaryKey(),
  userId: p
    .text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  amountLimit: p.decimal("amount_limit", { precision: 15, scale: 2 }).notNull(),
  periodMonth: p.date("period_month").notNull(),

  ...timestamps,
});

export const savingsGoals = p.pgTable("savings_goals", {
  id: p.uuid("id").defaultRandom().primaryKey(),
  userId: p
    .text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  linkedWalletId: p
    .uuid("linked_wallet_id")
    .references(() => wallets.id, { onDelete: "set null" }),

  name: p.varchar("name", { length: 100 }).notNull(),
  targetAmount: p
    .decimal("target_amount", { precision: 15, scale: 2 })
    .notNull(),

  ...timestamps,
});
