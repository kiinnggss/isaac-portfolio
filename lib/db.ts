import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

export interface MessageRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "pending" | "replied" | "flagged";
  ipHash?: string | null;
  userAgent?: string | null;
  referrer?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsRecord {
  id: string;
  eventType: string;
  path?: string | null;
  meta?: string | null;
  ipHash?: string | null;
  createdAt: string;
}

// Global reference to retain single instance in Next.js development hot reload
declare global {
  // eslint-disable-next-line no-var
  var __portfolioDb: DatabaseSync | undefined;
}

function getDatabase(): DatabaseSync {
  if (global.__portfolioDb) {
    return global.__portfolioDb;
  }

  const dbDir = path.join(process.cwd(), "prisma");
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const dbPath = path.join(dbDir, "dev.db");
  const db = new DatabaseSync(dbPath);

  // Enable WAL mode and foreign keys for durability and performance
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");

  // Create tables if not existing
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      ipHash TEXT,
      userAgent TEXT,
      referrer TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_messages_email ON messages(email);
    CREATE INDEX IF NOT EXISTS idx_messages_createdAt ON messages(createdAt);

    CREATE TABLE IF NOT EXISTS analytics_events (
      id TEXT PRIMARY KEY,
      eventType TEXT NOT NULL,
      path TEXT,
      meta TEXT,
      ipHash TEXT,
      createdAt TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_analytics_eventType ON analytics_events(eventType);
    CREATE INDEX IF NOT EXISTS idx_analytics_createdAt ON analytics_events(createdAt);
  `);

  if (process.env.NODE_ENV !== "production") {
    global.__portfolioDb = db;
  }

  return db;
}

function generateId(): string {
  return "msg_" + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

export const db = {
  messages: {
    create: async (data: {
      name: string;
      email: string;
      subject: string;
      message: string;
      status?: "pending" | "replied" | "flagged";
      ipHash?: string | null;
      userAgent?: string | null;
      referrer?: string | null;
    }): Promise<MessageRecord> => {
      const database = getDatabase();
      const id = generateId();
      const now = new Date().toISOString();
      const status = data.status || "pending";

      const stmt = database.prepare(`
        INSERT INTO messages (id, name, email, subject, message, status, ipHash, userAgent, referrer, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      stmt.run(
        id,
        data.name,
        data.email,
        data.subject,
        data.message,
        status,
        data.ipHash || null,
        data.userAgent || null,
        data.referrer || null,
        now,
        now
      );

      return {
        id,
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        status,
        ipHash: data.ipHash || null,
        userAgent: data.userAgent || null,
        referrer: data.referrer || null,
        createdAt: now,
        updatedAt: now,
      };
    },

    findMany: async (limit = 50): Promise<MessageRecord[]> => {
      const database = getDatabase();
      const stmt = database.prepare(`
        SELECT * FROM messages ORDER BY createdAt DESC LIMIT ?
      `);
      return stmt.all(limit) as unknown as MessageRecord[];
    },

    updateStatus: async (id: string, status: "pending" | "replied" | "flagged"): Promise<boolean> => {
      const database = getDatabase();
      const now = new Date().toISOString();
      const stmt = database.prepare("UPDATE messages SET status = ?, updatedAt = ? WHERE id = ?");
      const res = stmt.run(status, now, id);
      return res.changes > 0;
    },

    count: async (): Promise<number> => {
      const database = getDatabase();
      const stmt = database.prepare("SELECT COUNT(*) as count FROM messages");
      const result = stmt.get() as { count: number } | undefined;
      return result?.count ?? 0;
    },
  },

  analytics: {
    create: async (data: {
      eventType: string;
      path?: string | null;
      meta?: string | null;
      ipHash?: string | null;
    }): Promise<AnalyticsRecord> => {
      const database = getDatabase();
      const id = "evt_" + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
      const now = new Date().toISOString();

      const stmt = database.prepare(`
        INSERT INTO analytics_events (id, eventType, path, meta, ipHash, createdAt)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      stmt.run(id, data.eventType, data.path || null, data.meta || null, data.ipHash || null, now);

      return {
        id,
        eventType: data.eventType,
        path: data.path || null,
        meta: data.meta || null,
        ipHash: data.ipHash || null,
        createdAt: now,
      };
    },

    count: async (): Promise<number> => {
      const database = getDatabase();
      const stmt = database.prepare("SELECT COUNT(*) as count FROM analytics_events");
      const result = stmt.get() as { count: number } | undefined;
      return result?.count ?? 0;
    },
  },

  checkHealth: async (): Promise<{ connected: boolean; messageCount: number; error?: string }> => {
    try {
      const database = getDatabase();
      const stmt = database.prepare("SELECT COUNT(*) as count FROM messages");
      const result = stmt.get() as { count: number } | undefined;
      return { connected: true, messageCount: result?.count ?? 0 };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { connected: false, messageCount: 0, error: msg };
    }
  },
};
