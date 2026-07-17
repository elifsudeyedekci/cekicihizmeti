"use client";

import { useEffect, useState } from "react";
import { PhoneButton, WhatsAppButton } from "./CtaButtons";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("exit-intent-shown")) return;

    function onMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) {
        setShow(true);
        sessionStorage.setItem("exit-intent-shown", "1");
        document.removeEventListener("mouseleave", onMouseLeave);
      }
    }
    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, []);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      onClick={() => setShow(false)}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setShow(false)}
          aria-label="Kapat"
          className="float-right text-xl leading-none text-[#5a6b80]"
        >
          ×
        </button>
        <h2 className="mt-2 text-lg font-bold text-[var(--color-navy-900)]">
          Ayrılmadan önce bir saniye
        </h2>
        <p className="mt-2 text-sm text-[#2d3f57]">
          Yolda kaldıysanız beklemeyin — WhatsApp'tan yazın veya hemen arayın, 7/24 buradayız.
        </p>
        <div className="mt-5 flex flex-col gap-3">
          <PhoneButton />
          <WhatsAppButton />
        </div>
      </div>
    </div>
  );
}
