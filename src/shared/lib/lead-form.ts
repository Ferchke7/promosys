import type { LeadFormData, LeadFormErrors } from "@/src/shared/types/content";

export function formatUzbekPhone(value: string) {
  const rawDigits = value.replace(/\D/g, "");
  const localDigits = rawDigits.startsWith("998")
    ? rawDigits.slice(3, 12)
    : rawDigits.slice(0, 9);

  if (!localDigits.length) return "+998 ";

  const parts = [
    localDigits.slice(0, 2),
    localDigits.slice(2, 5),
    localDigits.slice(5, 7),
    localDigits.slice(7, 9),
  ];

  let result = `+998 (${parts[0]}`;
  if (parts[0].length === 2) result += ")";
  if (parts[1]) result += ` ${parts[1]}`;
  if (parts[2]) result += `-${parts[2]}`;
  if (parts[3]) result += `-${parts[3]}`;
  return result;
}

export function validateLeadForm(data: LeadFormData): LeadFormErrors {
  const errors: LeadFormErrors = {};
  const phoneDigits = data.phone.replace(/\D/g, "");

  if (data.name.trim().length < 2) errors.name = "Укажите имя";
  if (data.company.trim().length < 2) errors.company = "Укажите компанию";
  if (phoneDigits.length !== 12 || !phoneDigits.startsWith("998")) {
    errors.phone = "Введите номер в формате +998";
  }
  if (!data.consent) errors.consent = "Необходимо согласие";

  return errors;
}

export function buildTelegramUrl(username: string, data: LeadFormData) {
  const message = [
    "Новая заявка с сайта PROMSYS",
    `Имя: ${data.name.trim()}`,
    `Компания: ${data.company.trim()}`,
    `Телефон: ${data.phone}`,
  ].join("\n");

  return `https://t.me/${username}?text=${encodeURIComponent(message)}`;
}
