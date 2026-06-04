import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

let _pool: Pool | null = null;
let _db: NodePgDatabase | null = null;

function init() {
  if (_db) return;
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  // Parse the DATABASE_URL to handle URL-encoded characters in password
  // and ensure SSL is configured for Supabase on Vercel serverless
  const connectionString = process.env.DATABASE_URL;

  _pool = new Pool({
    connectionString,
    // SSL is required for Supabase connections in production
    ssl: process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
    // Serverless-safe pool settings: keep connections minimal
    max: 3,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 10000,
    // Disable prepared statements — required for Supabase session/transaction poolers
    // PgBouncer in session mode doesn't support named prepared statements
    allowExitOnIdle: true,
  });

  _db = drizzle(_pool);
}

// Proxy that lazily initializes the pool on first use so that pages which
// don't actually touch the DB can still SSR when DATABASE_URL is missing.
export const db = new Proxy({} as NodePgDatabase, {
  get(_t, prop) {
    init();
    return (_db as any)[prop];
  },
});

export const pool = new Proxy({} as Pool, {
  get(_t, prop) {
    init();
    return (_pool as any)[prop];
  },
});

export const isDbConfigured = () => Boolean(process.env.DATABASE_URL);
