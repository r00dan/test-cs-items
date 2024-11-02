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
        tradable BOOL NOT NULL,
        market_hash_name VARCHAR(255) NOT NULL,
        currency VARCHAR(5) NOT NULL,
        min_price DECIMAL(10, 2) NULL,
        max_price DECIMAL(10, 2) NULL,
        mean_price DECIMAL(10, 2) NULL,
        quantity INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
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

async function checkIndexesNotExist(indexName: string) {
  const index = await sql`
  SELECT EXISTS (
    SELECT 1 
    FROM pg_indexes 
    WHERE tablename = 'items' AND indexname = ${indexName}
  ) AS exists;`;

  return index[0].exists;
}

async function addItemsIndexes() {
  const indexName = "idx_items_market_hash_tradable";
  try {
    const isIndexExists = await checkIndexesNotExist(indexName);

    if (!isIndexExists) {
      console.log("creating indexes...");
      await sql`create index idx_items_market_hash_tradable on items (market_hash_name, tradable);`;
      console.log("indexes successfully created!");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function runMigrations() {
  await createUUIDExtension();
  await createUsersTable();
  await createItemsTable();
  await createPurchasesTable();
  await addItemsIndexes();
}
