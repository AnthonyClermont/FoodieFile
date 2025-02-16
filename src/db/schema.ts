import { pgTable, serial, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users'; // Assuming you have a `users` table linked with Supabase

// Define the meals table
export const meals = pgTable('meals', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  ingredients: text('ingredients').notNull(),
  instructions: text('instructions').notNull(),
  user_id: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }), // FK to auth.users table
  created_at: timestamp('created_at').defaultNow(),
});
