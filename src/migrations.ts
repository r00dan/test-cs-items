import { sql } from "./core/database";

async function createUUIDExtension() {
  await sql`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
  `;
}

async function createUsersTable() {
  await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        username VARCHAR(16) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        balance DECIMAL(10, 2) DEFAULT 100,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
}

async function createItemsTable() {
  await sql`
      CREATE TABLE IF NOT EXISTS items (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        market_hash_name VARCHAR(255) NOT NULL,
        currency VARCHAR(10) NOT NULL,
        suggested_price DECIMAL(10, 2) NOT NULL,
        item_page VARCHAR(255) NOT NULL,
        market_page VARCHAR(255) NOT NULL,
        min_price DECIMAL(10, 2) NOT NULL,
        max_price DECIMAL(10, 2) NOT NULL,
        mean_price DECIMAL(10, 2) NOT NULL,
        median_price DECIMAL(10, 2) NOT NULL,
        quantity INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;
}

async function createPurchasesTable() {
  await sql`
      CREATE TABLE IF NOT EXISTS purchases (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        item_id UUID NOT NULL,
        user_id UUID NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (item_id) REFERENCES items (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `;
}

export async function runMigrations() {
  await createUUIDExtension();
  await createUsersTable();
  await createItemsTable();
  await createPurchasesTable();
}
