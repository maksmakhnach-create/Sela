export const OPERATOR_PLACEHOLDERS = {
  legalName: 'ООО "Сэла"',
  unp: "[УНП]",
  legalAddress: "[ЮРИДИЧЕСКИЙ АДРЕС]",
  actualAddress: "Республика Беларусь, г. Гродно, ул. Ивана Лебедева, 6",
  email: "lcc.sela8@gmail.com",
  phone: "+375 (29) 588-98-15",
  siteUrl: "https://sela.by",
  storagePeriod: "[СРОК ХРАНЕНИЯ ПЕРСОНАЛЬНЫХ ДАННЫХ]",
} as const;

export const PERSONAL_DATA_CONSENT = {
  documentId: "SELA-PD-CONSENT-1.0",
  version: "1.0",
  title: "Согласие на обработку персональных данных",
} as const;

export const COOKIE_POLICY = {
  documentId: "SELA-COOKIE-POLICY-1.0",
  version: "1.0",
  title: "Политика использования Cookie",
} as const;

export const PRIVACY_POLICY = {
  documentId: "SELA-PRIVACY-POLICY-1.0",
  version: "1.0",
  title: "Политика обработки персональных данных",
} as const;

export const LEGAL_DISCLAIMER =
  "Документ отражает фактические процессы сайта SELA. Реквизиты оператора, срок хранения и иные сведения, отмеченные квадратными скобками, подлежат замене на официально подтверждённые данные организации. Текст не является финально согласованной юридической редакцией до заполнения реквизитов.";
