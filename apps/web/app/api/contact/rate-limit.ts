const WINDOW_MS = 15 * 60 * 1000;
const MAX_MESSAGES = 3;
const MAX_CLIENTS = 5_000;

const clients = new Map<string, { count: number; resetAt: number }>();

export function checkMessageLimit(client: string, now = Date.now()) {
  const current = clients.get(client);

  if (current && current.resetAt > now) {
    if (current.count >= MAX_MESSAGES) {
      return {
        allowed: false,
        retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
      };
    }

    current.count += 1;
    return { allowed: true, retryAfter: 0 };
  }

  if (clients.size >= MAX_CLIENTS) {
    for (const [key, value] of clients) {
      if (value.resetAt <= now) clients.delete(key);
    }

    if (clients.size >= MAX_CLIENTS) {
      const oldest = clients.keys().next().value;
      if (oldest !== undefined) clients.delete(oldest);
    }
  }

  clients.set(client, { count: 1, resetAt: now + WINDOW_MS });
  return { allowed: true, retryAfter: 0 };
}
