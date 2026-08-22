import assert from "node:assert/strict";
import test from "node:test";
import { audienceContent } from "../src/features/audience/content";
import { contactContent } from "../src/features/contact/content";
import { heroContent } from "../src/features/hero/content";
import { validateLeadForm } from "../src/shared/lib/lead-form";

test("provides complete Russian and Uzbek landing content", () => {
  for (const locale of ["ru", "uz"] as const) {
    assert.ok(heroContent[locale].title.length > 0);
    assert.equal(heroContent[locale].factory.systemRoles.length, 3);
    assert.equal(heroContent[locale].factory.processStages.length, 4);
    assert.equal(heroContent[locale].factory.metrics.length, 3);
    assert.equal(audienceContent[locale].items.length, 6);
    assert.ok(audienceContent[locale].items.every((item) => item.roles.length >= 4));
  }
});

test("returns validation messages for the active locale", () => {
  const errors = validateLeadForm(
    { name: "", company: "", phone: "+998 ", consent: false },
    contactContent.uz.validation,
  );

  assert.equal(errors.name, "Ismingizni kiriting");
  assert.equal(errors.consent, "Rozilik kerak");
});
