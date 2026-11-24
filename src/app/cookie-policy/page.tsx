import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, { LegalSection } from "@/components/legal/LegalPageLayout";
import {
  COOKIE_POLICY,
  LEGAL_DISCLAIMER,
  OPERATOR_PLACEHOLDERS as OP,
} from "@/data/legal";
import { getSiteUrl } from "@/lib/site-url";

const title = COOKIE_POLICY.title;
const description =
  "Какие Cookie использует сайт SELA, как дать или отозвать согласие и какие сторонние сервисы задействованы.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/cookie-policy" },
  openGraph: {
    title,
    description,
    url: `${getSiteUrl()}/cookie-policy`,
    locale: "ru_BY",
    type: "website",
    siteName: "SELA",
  },
};

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Правовая информация"
      title={title}
      version={`${COOKIE_POLICY.version} · ${COOKIE_POLICY.documentId}`}
      disclaimer={LEGAL_DISCLAIMER}
    >
      <LegalSection title="Что такое Cookie">
        <p>
          Cookie — небольшие фрагменты данных, которые сайт или сторонний сервис
          может сохранить в браузере. Они помогают запоминать выбор пользователя
          и обеспечивать работу отдельных функций. Похожие технологии (например,
          localStorage) используются для хранения настроек согласия.
        </p>
      </LegalSection>

      <LegalSection title="Для чего Cookie используются на сайте">
        <p>На сайте SELA Cookie и аналогичные технологии применяются, чтобы:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>обеспечить базовую работу страниц;</li>
          <li>сохранить ваш выбор в баннере Cookie;</li>
          <li>
            при наличии отдельного согласия — подключать средства анализа
            посещаемости, если такие средства будут добавлены позже.
          </li>
        </ul>
        <p>
          По состоянию на дату публикации этой версии на сайте{" "}
          <strong>не подключены</strong> Google Analytics, Яндекс Метрика и иные
          счётчики посещаемости. Аналитические скрипты не запускаются до явного
          согласия в категории «Аналитические Cookie».
        </p>
      </LegalSection>

      <LegalSection title="Категории Cookie">
        <p>
          <strong>Необходимые.</strong> Нужны для работы сайта и сохранения
          вашего решения по Cookie. Их нельзя отключить в баннере, иначе сайт не
          сможет запомнить отказ или согласие. К ним относится запись выбора в
          localStorage и техническая Cookie согласия{" "}
          <code className="text-sm bg-beige/60 px-1 rounded">sela_cookie_consent</code>.
        </p>
        <p>
          <strong>Аналитические.</strong> Предназначены для статистики посещений.
          Сейчас такие инструменты на сайте не установлены. Категория нужна, чтобы
          не включать аналитику скрыто: она заработает только после кнопки
          «Принять все» или включения в настройках — и только если оператор
          фактически подключит соответствующий сервис.
        </p>
      </LegalSection>

      <LegalSection title="Аналитические инструменты">
        <p>
          Google Analytics, Яндекс Метрика и аналогичные системы в исходном коде
          сайта не обнаружены и в этой редакции Политики как используемые не
          указываются.
        </p>
      </LegalSection>

      <LegalSection title="Сторонние сервисы">
        <p>При работе сайта могут быть обращения к сторонним сервисам:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            виджет Яндекс.Карт на главной и на страницах с адресом — браузер
            загружает карту с серверов Яндекса, которые могут устанавливать
            собственные Cookie;
          </li>
          <li>
            Telegram — только при отправке заявки, для служебного уведомления
            сотрудников, не как Cookie на устройстве посетителя каталога;
          </li>
          <li>
            ссылки на Instagram, Wildberries и TikTok — Cookie этих сайтов
            ставятся только если пользователь сам переходит по ссылке.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Как изменить настройки">
        <p>
          При первом визите показывается баннер. Вы можете принять все Cookie,
          отклонить необязательные или открыть окно «Настроить». Повторно открыть
          настройки можно ссылкой «Настройки Cookie» в нижней части сайта.
        </p>
        <p>
          Также можно удалить Cookie и данные сайтов в настройках браузера. Это
          может привести к повторному показу баннера.
        </p>
      </LegalSection>

      <LegalSection title="Как отозвать ранее предоставленное согласие">
        <p>
          Нажмите «Настройки Cookie» в подвале сайта и выберите «Отклонить
          необязательные» либо отключите аналитическую категорию и сохраните
          выбор. Если политика Cookie изменится (сменится версия{" "}
          {COOKIE_POLICY.documentId}), баннер будет показан снова.
        </p>
        <p>
          Вопросы:{" "}
          <a className="text-caramel-orange hover:text-accent" href={`mailto:${OP.email}`}>
            {OP.email}
          </a>
          .
        </p>
        <p>
          См. также{" "}
          <Link href="/privacy-policy" className="text-caramel-orange hover:text-accent">
            Политику обработки персональных данных
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
