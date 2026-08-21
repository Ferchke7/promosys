import assert from "node:assert/strict";
import test from "node:test";
import { buildTelegramUrl, formatUzbekPhone, validateLeadForm } from "../src/shared/lib/lead-form";

test("formats Uzbekistan phone numbers", () => {
  assert.equal(formatUzbekPhone("901234567"), "+998 (90) 123-45-67");
  assert.equal(formatUzbekPhone("+998 90 123 45 67"), "+998 (90) 123-45-67");
});

test("validates required lead fields", () => {
  const errors = validateLeadForm({ name: "A", company: "", phone: "+998 90", consent: false });
  assert.ok(errors.name);
  assert.ok(errors.company);
  assert.ok(errors.phone);
  assert.ok(errors.consent);
});

test("builds an encoded Telegram draft", () => {
  const url = buildTelegramUrl("promsys_uz", { name: "Азиз", company: "Zavod", phone: "+998 (90) 123-45-67", consent: true });
  assert.match(url, /^https:\/\/t\.me\/promsys_uz\?text=/);
  assert.match(decodeURIComponent(url), /Азиз/);
  assert.match(decodeURIComponent(url), /Zavod/);
});
