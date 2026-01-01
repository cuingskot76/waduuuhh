import * as p from "drizzle-orm/pg-core";
import { timestamps } from "./db/columns.helpers";
import { user } from "./auth-schema";

export const wallets = p.pgTable("wallets", {
  id: p.uuid("id").defaultRandom().primaryKey(),
  userId: p
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

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
    .references(() => user.id, { onDelete: "cascade" }),

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
    .references(() => user.id, { onDelete: "cascade" }),
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
    .references(() => user.id, { onDelete: "cascade" }),

  amountLimit: p.decimal("amount_limit", { precision: 15, scale: 2 }).notNull(),
  periodMonth: p.date("period_month").notNull(),

  ...timestamps,
});

export const savingsGoals = p.pgTable("savings_goals", {
  id: p.uuid("id").defaultRandom().primaryKey(),
  userId: p
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  linkedWalletId: p
    .uuid("linked_wallet_id")
    .references(() => wallets.id, { onDelete: "set null" }),

  name: p.varchar("name", { length: 100 }).notNull(),
  targetAmount: p
    .decimal("target_amount", { precision: 15, scale: 2 })
    .notNull(),

  ...timestamps,
});
