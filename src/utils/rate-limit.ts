// src/utils/rate-limit.ts
const attempts: Record<string, { count: number; lastAttempt: number }> = {};

export function checkRateLimit(ip: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const entry = attempts[ip] || { count: 0, lastAttempt: now };

  // Reset if past window
  if (now - entry.lastAttempt > windowMs) {
    attempts[ip] = { count: 1, lastAttempt: now };
    return true;
  }

  entry.count++;
  entry.lastAttempt = now;
  attempts[ip] = entry;

  return entry.count <= limit;
}
