/**
 * Sliding-window in-memory rate limiter with auto-clearing memory.
 */
interface RateLimitEntry {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 5 minutes
if (typeof setInterval !== "undefined") {
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      const valid = entry.timestamps.filter((ts) => now - ts < 600000); // 10 minutes
      if (valid.length === 0) {
        rateLimitStore.delete(key);
      } else {
        entry.timestamps = valid;
      }
    }
  }, 300000);

  // Don't prevent process exit in node
  if (cleanupInterval.unref) {
    cleanupInterval.unref();
  }
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

export function rateLimit(
  identifier: string,
  limit = 5,
  windowMs = 60000
): RateLimitResult {
  const now = Date.now();
  const windowStart = now - windowMs;

  const entry = rateLimitStore.get(identifier) || { timestamps: [] };
  // Keep only timestamps within window
  const activeTimestamps = entry.timestamps.filter((ts) => ts > windowStart);

  if (activeTimestamps.length >= limit) {
    const oldest = activeTimestamps[0];
    const resetSeconds = Math.ceil((oldest + windowMs - now) / 1000);

    return {
      success: false,
      limit,
      remaining: 0,
      resetSeconds: Math.max(resetSeconds, 1),
    };
  }

  activeTimestamps.push(now);
  rateLimitStore.set(identifier, { timestamps: activeTimestamps });

  const remaining = Math.max(0, limit - activeTimestamps.length);
  const resetSeconds = Math.ceil(windowMs / 1000);

  return {
    success: true,
    limit,
    remaining,
    resetSeconds,
  };
}
