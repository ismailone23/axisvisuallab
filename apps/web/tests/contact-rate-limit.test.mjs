import assert from "node:assert/strict";
import { test } from "node:test";
import { checkMessageLimit } from "../app/api/contact/rate-limit.ts";

test("limits a client to three messages within 15 minutes", () => {
  const client = "client-a";
  const start = 1_000_000;

  for (let count = 0; count < 3; count++) {
    assert.equal(checkMessageLimit(client, start + count).allowed, true);
  }

  assert.deepEqual(checkMessageLimit(client, start + 3), {
    allowed: false,
    retryAfter: 900,
  });
  assert.equal(checkMessageLimit(client, start + 900_000).allowed, true);
});

test("clients have separate limits", () => {
  assert.equal(checkMessageLimit("client-b", 1_000_003).allowed, true);
});
