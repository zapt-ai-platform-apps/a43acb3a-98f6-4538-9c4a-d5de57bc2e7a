import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const fraud_logs = pgTable('fraud_logs', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  is_fraud: boolean('is_fraud').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});