import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — LumenArt",
  description: "Политика обработки персональных данных компании LumenArt",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-white/5 py-6">
        <div className="container-main">
          <Link href="/" className="text-lg font-bold text-gold hover:text-gold-light transition-colors">
            ← LumenArt
          </Link>
        </div>
      </header>

      <main className="container-main py-12 sm:py-16">
        <h1 className="mb-8 text-3xl font-bold text-white">
          Политика конфиденциальности
        </h1>

        <div className="prose prose-invert max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Настоящая Политика конфиденциальности определяет порядок обработки и
            защиты персональных данных пользователей сайта LumenArt (далее —
            «Сайт»), принадлежащего компании LumenArt (далее — «Компания»).
          </p>

          <h2 className="text-xl font-semibold text-white">1. Какие данные мы собираем</h2>
          <p>
            При заполнении формы заявки на Сайте мы можем запрашивать следующие
            данные: имя, номер телефона, описание задачи. Данные предоставляются
            пользователем добровольно.
          </p>

          <h2 className="text-xl font-semibold text-white">2. Цели обработки</h2>
          <p>
            Персональные данные используются исключительно для связи с
            пользователем, подготовки коммерческого предложения и оказания услуг
            Компании.
          </p>

          <h2 className="text-xl font-semibold text-white">3. Хранение и защита</h2>
          <p>
            Компания принимает необходимые организационные и технические меры для
            защиты персональных данных от несанкционированного доступа,
            изменения, раскрытия или уничтожения.
          </p>

          <h2 className="text-xl font-semibold text-white">4. Передача третьим лицам</h2>
          <p>
            Персональные данные не передаются третьим лицам, за исключением
            случаев, предусмотренных законодательством Российской Федерации.
          </p>

          <h2 className="text-xl font-semibold text-white">5. Контакты</h2>
          <p>
            По вопросам обработки персональных данных обращайтесь по адресу:{" "}
            <a href={`mailto:${SITE.email}`} className="text-gold hover:underline">
              {SITE.email}
            </a>
          </p>

          <p className="text-sm text-muted-foreground/60">
            Дата последнего обновления: 30 июня 2026 г.
          </p>
        </div>
      </main>
    </div>
  );
}
