import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, { LegalSection } from "@/components/legal/LegalPageLayout";
import {
  LEGAL_DISCLAIMER,
  OPERATOR_PLACEHOLDERS as OP,
  PERSONAL_DATA_CONSENT,
} from "@/data/legal";
import { getSiteUrl } from "@/lib/site-url";

const title = PERSONAL_DATA_CONSENT.title;
const description =
  "Согласие на обработку персональных данных при отправке заявки на сайте SELA.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/personal-data-consent" },
  openGraph: {
    title,
    description,
    url: `${getSiteUrl()}/personal-data-consent`,
    locale: "ru_BY",
    type: "website",
    siteName: "SELA",
  },
};

export default function PersonalDataConsentPage() {
  return (
    <LegalPageLayout
      eyebrow="Правовая информация"
      title={title}
      version={`${PERSONAL_DATA_CONSENT.version} · ${PERSONAL_DATA_CONSENT.documentId}`}
      disclaimer={LEGAL_DISCLAIMER}
    >
      <LegalSection title="Кто получает согласие">
        <p>
          Настоящим я, субъект персональных данных, свободно, своей волей и в
          своём интересе даю согласие оператору:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>{OP.legalName}</li>
          <li>
            контакты: {OP.email}, {OP.phone}
          </li>
        </ul>
        <p>
          Согласие считается данным в момент самостоятельной установки отметки в
          чекбоксе формы на сайте и нажатия кнопки отправки заявки.
        </p>
      </LegalSection>

      <LegalSection title="Какие данные обрабатываются">
        <p>В зависимости от заполненной формы согласие охватывает:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>имя;</li>
          <li>название компании;</li>
          <li>УНП (если указан);</li>
          <li>адрес электронной почты;</li>
          <li>страну (если указана);</li>
          <li>номер телефона;</li>
          <li>способ получения прайс-листа;</li>
          <li>текст сообщения и тему обращения;</li>
          <li>технические сведения о факте согласия (дата, время, версия документа).</li>
        </ul>
      </LegalSection>

      <LegalSection title="Для каких целей">
        <p>Согласие даётся исключительно для:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>обработки заявки на прайс-лист или иного обращения с сайта;</li>
          <li>направления прайс-листа на email или в Telegram — по выбранному варианту;</li>
          <li>связи по заявке по указанным контактам;</li>
          <li>учёта факта согласия.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Какие действия выполняются с персональными данными">
        <p>
          Оператор вправе осуществлять сбор, запись, хранение, использование,
          уточнение, передачу уполномоченным сотрудникам и сервису доставки
          служебных уведомлений (Telegram), а также удаление или обезличивание
          данных.
        </p>
        <p>Автоматизированные решения, порождающие юридические последствия без участия человека, не применяются.</p>
      </LegalSection>

      <LegalSection title="Срок действия согласия">
        <p>
          Согласие действует с момента его предоставления до отзыва либо до
          истечения срока хранения: {OP.storagePeriod} — в зависимости от того,
          что наступит ранее, если иной срок не следует из закона.
        </p>
      </LegalSection>

      <LegalSection title="Порядок отзыва согласия">
        <p>
          Согласие может быть отозвано путём направления заявления на{" "}
          <a className="text-caramel-orange hover:text-accent" href={`mailto:${OP.email}`}>
            {OP.email}
          </a>{" "}
          или по телефону {OP.phone}. После отзыва оператор прекращает обработку,
          за исключением случаев, когда продолжение обработки допускается законом.
        </p>
      </LegalSection>

      <LegalSection title="Контакты оператора">
        <p>
          {OP.legalName}. Email: {OP.email}. Телефон: {OP.phone}.
        </p>
        <p>
          Порядок обработки подробно описан в{" "}
          <Link href="/privacy-policy" className="text-caramel-orange hover:text-accent">
            Политике обработки персональных данных
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
