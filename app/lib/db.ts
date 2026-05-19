import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

let _pool: Pool | null = null;
let _db: NodePgDatabase | null = null;

function init() {
  if (_db) return;
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  _pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
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
