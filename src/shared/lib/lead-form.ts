import type { LeadFormData, LeadFormErrors, LeadValidationMessages, TelegramMessageLabels } from "@/src/shared/types/content";

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

const defaultValidationMessages: LeadValidationMessages = {
  name: "Укажите имя",
  company: "Укажите компанию",
  phone: "Введите номер в формате +998",
  consent: "Необходимо согласие",
};

const defaultTelegramLabels: TelegramMessageLabels = {
  heading: "Новая заявка с сайта PROMSYS",
  name: "Имя",
  company: "Компания",
  phone: "Телефон",
};

export function validateLeadForm(data: LeadFormData, messages: LeadValidationMessages = defaultValidationMessages): LeadFormErrors {
  const errors: LeadFormErrors = {};
  const phoneDigits = data.phone.replace(/\D/g, "");

  if (data.name.trim().length < 2) errors.name = messages.name;
  if (data.company.trim().length < 2) errors.company = messages.company;
  if (phoneDigits.length !== 12 || !phoneDigits.startsWith("998")) {
    errors.phone = messages.phone;
  }
  if (!data.consent) errors.consent = messages.consent;

  return errors;
}

export function buildTelegramUrl(username: string, data: LeadFormData, labels: TelegramMessageLabels = defaultTelegramLabels) {
  const message = [
    labels.heading,
    `${labels.name}: ${data.name.trim()}`,
    `${labels.company}: ${data.company.trim()}`,
    `${labels.phone}: ${data.phone}`,
  ].join("\n");

  return `https://t.me/${username}?text=${encodeURIComponent(message)}`;
}
