import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db";
import { storage } from "./storage";
import type { Admin } from "@shared/schema";

declare module "express-session" {
  interface SessionData {
    adminId?: string;
    adminEmail?: string;
    adminName?: string;
    adminRole?: string;
  }
}

export const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session?.adminId) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

export function getSessionConfig() {
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    throw new Error("SESSION_SECRET must be set");
  }

  const PgSession = connectPgSimple(session);
  const isProduction = process.env.NODE_ENV === "production";

  return session({
    store: new PgSession({
      pool: pool,
      tableName: "session",
      createTableIfMissing: true,
    }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    name: 'asthawaani.sid',
    cookie: {
      secure: isProduction,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    },
  });
}

export async function loginAdmin(email: string, password: string): Promise<Admin | null> {
  const admin = await storage.getAdminByEmail(email);
  if (!admin) {
    return null;
  }

  const isValid = await verifyPassword(password, admin.password);
  if (!isValid) {
    return null;
  }

  return admin;
}
