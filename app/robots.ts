import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

/**
 * Arama motoru botları VE AI botları (GPTBot, ClaudeBot, PerplexityBot, Google-Extended vb.)
 * bilinçli olarak açık bırakılır — GEO (Generative Engine Optimization) için zorunludur.
 * Hiçbir bot burada engellenmez.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Arama motoru botları — açıkça izinli
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "bingbot", allow: "/" },
      { userAgent: "Yandex", allow: "/" },
      { userAgent: "YandexBot", allow: "/" },
      // AI / GEO botları — açıkça izinli, engellenmiyor
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
