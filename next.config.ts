import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tam statik çıktı: her sayfa saf HTML olarak üretilir (SEO + hız + her hostinge deploy edilebilir)
  output: "export",
  // Apache/cPanel tarzı hostinglerde klasör/index.html yapısı için
  trailingSlash: true,
  images: {
    // Statik export'ta Next image optimizer çalışmaz; WebP görseller build öncesi optimize edilir
    unoptimized: true,
  },
};

export default nextConfig;
