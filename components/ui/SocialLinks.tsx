import { SITE } from "@/lib/constants";
import TelegramIcon from "./TelegramIcon";
import VkIcon from "./VkIcon";
import InstagramIcon from "./InstagramIcon";

export default function SocialLinks() {
  return (
    <div className="flex items-center justify-center gap-4 sm:justify-start">
      <a
        href={SITE.social.telegram}
        aria-label="Telegram"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-gold/40 hover:text-gold"
      >
        <TelegramIcon />
      </a>
      <a
        href={SITE.social.vk}
        aria-label="VKontakte"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-gold/40 hover:text-gold"
      >
        <VkIcon />
      </a>
      <a
        href={SITE.social.instagram}
        aria-label="Instagram"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-gold/40 hover:text-gold"
      >
        <InstagramIcon />
      </a>
    </div>
  );
}
