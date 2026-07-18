import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/config";
import { PhoneButton, WhatsAppButton } from "@/components/CtaButtons";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { TowImageGallery } from "@/components/TowImageGallery";

export const metadata: Metadata = {
  title: "24/7 Tow Truck Istanbul | Roadside Assistance — 0535 404 80 44",
  description:
    "24/7 tow truck and roadside assistance across all 39 districts of Istanbul. Flatbed towing, accident recovery, battery jump-start, tire change. Call now: 0535 404 80 44",
  alternates: {
    canonical: "/en",
    languages: {
      "tr-TR": "/",
      "en-US": "/en",
      ar: "/ar",
    },
  },
  openGraph: {
    locale: "en_US",
    title: "24/7 Tow Truck Istanbul | Roadside Assistance",
    description:
      "24/7 tow truck and roadside assistance across all 39 districts of Istanbul. Call now: 0535 404 80 44",
  },
};

const faqs = [
  {
    q: "Do you offer towing service in English?",
    a: "Yes. Our dispatch team and drivers can communicate in English 24/7. Call +90 535 404 80 44 or message us on WhatsApp and describe your location — we'll take it from there.",
  },
  {
    q: "How fast can you reach me in Istanbul?",
    a: "Average arrival time is 15-40 minutes depending on your district and traffic conditions. Central districts (Kadıköy, Şişli, Beşiktaş, Bakırköy) are typically 15-25 minutes; outer districts (Şile, Silivri, Çatalca) can take 35-60 minutes — we always give you an honest estimate on the phone.",
  },
  {
    q: "I'm a tourist with a rental car that broke down — can you help?",
    a: "Yes, this is one of our most common calls. We coordinate directly with rental car companies, tow your vehicle to their designated drop-off point or a repair shop, and help arrange onward transport for you if needed.",
  },
  {
    q: "My car broke down near Istanbul Airport, can you reach me there?",
    a: "Yes, we serve both Istanbul Airport (IST) and Sabiha Gökçen Airport (SAW) and their surrounding access roads regularly, including car park battery jump-starts and towing to the terminal area or a repair shop.",
  },
  {
    q: "Do you tow electric vehicles (EVs)?",
    a: "Yes, but only on a flatbed platform — EVs must never be towed with wheels on the ground because it can damage the electric motor and regenerative braking system. We take EVs directly to the nearest fast-charging station or your preferred location on a flatbed truck." ,
  },
  {
    q: "What does a tow truck cost in Istanbul?",
    a: "We never publish prices online because cost depends on distance, vehicle type, and time of day. Call us directly for an accurate, no-obligation quote: 0535 404 80 44.",
  },
  {
    q: "Can you tow my car across the Bosphorus (from the European to the Asian side, or vice versa)?",
    a: "Yes, we regularly transport vehicles across both Bosphorus bridges and the Eurasia Tunnel between the European and Asian sides of Istanbul.",
  },
  {
    q: "I had an accident — what should I do before calling you?",
    a: "First, ensure everyone's safety and call 112 if anyone is injured. For a minor accident with no injuries, take photos of both vehicles and the scene, and if there's a dispute, call the police (155). Then call us — we can recover your vehicle to a safe location, a repair shop, or an insurance-approved body shop." ,
  },
  {
    q: "Do you offer roadside assistance, or only towing?",
    a: "Both. Most calls (battery issues, flat tires, running out of fuel) are resolved on the spot without needing a tow at all. If we can't fix it roadside, the same team switches to towing without a second dispatch." ,
  },
  {
    q: "Is your service available 24 hours, including weekends and holidays?",
    a: "Yes, we operate 24/7, 365 days a year, including nights, weekends, and public holidays. Our night shift teams are physically stationed and ready, not just a call center." ,
  },
  {
    q: "Do you work with insurance companies for accident claims?",
    a: "Yes, we provide a proper invoice and photographic condition report that you can submit to your insurance company as part of your claim; most kasko (comprehensive) policies in Turkey include towing coverage within policy limits.",
  },
];

export default function EnglishHomePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE.url}/en` },
        ])}
      />
      <nav aria-label="Language" className="mx-auto max-w-5xl px-4 py-3 text-sm text-[#5a6b80]">
        <Link href="/" className="hover:text-[var(--color-cta-600)]">
          🇹🇷 Türkçe
        </Link>
        {" · "}
        <Link href="/ar" className="hover:text-[var(--color-cta-600)]">
          🇸🇦 العربية
        </Link>
        {" · "}
        <Link href="/en/blog" className="hover:text-[var(--color-cta-600)]">
          Blog
        </Link>
      </nav>

      <section className="mx-auto max-w-3xl px-4 pb-6">
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">
          24/7 Tow Truck Istanbul
        </h1>
        <p className="mt-4 text-lg font-medium text-[#2d3f57]">
          If your car has broken down anywhere in Istanbul, call {SITE.phone} for 24/7 tow truck and
          roadside assistance. We cover all 39 districts on both the European and Asian sides, with an
          average arrival time of 20-40 minutes.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <PhoneButton label={`Call Now: ${SITE.phone}`} />
          <WhatsAppButton
            message="Hello, I need towing/roadside assistance in Istanbul."
            label="Message on WhatsApp"
          />
        </div>
        <TowImageGallery seed="en-home" keyword="Istanbul" count={3} locale="en" />
      </section>

      <section className="prose-tow mx-auto max-w-3xl px-4 py-6">
        <h2>Reliable Towing for Residents, Expats, and Tourists in Istanbul</h2>
        <p>
          Istanbul is a sprawling, traffic-heavy megacity of over 15 million people spanning two
          continents, connected by three Bosphorus crossings (two bridges and the Eurasia Tunnel). Whether
          you live here, are relocating for work, or are simply visiting with a rental car, a breakdown or
          accident in an unfamiliar city can be stressful — especially if you don't speak Turkish. That's
          exactly the situation we specialize in: clear English-language communication, transparent
          service, and a dispatch network covering every district of the city, from the historic
          peninsula of Fatih to the airport corridors of Arnavutköy and Pendik, from the Bosphorus
          waterfront of Beşiktaş and Üsküdar to the outer towns of Silivri and Şile.
        </p>
        <p>
          We are a K1-licensed, fully insured towing and recovery company (the K1 certificate is Turkey's
          official commercial road-haulage authorization, roughly equivalent to a commercial operator's
          license in the EU/US). Every vehicle we tow is documented with a photographic condition report
          before and after transport, so there is a clear record for you and, if needed, for your
          insurance company.
        </p>

        <h2>What We Do</h2>
        <p>
          <strong>Flatbed towing:</strong> Modern towing means your vehicle's four wheels are lifted
          fully off the ground onto a flatbed platform and secured with tie-down straps — this eliminates
          the drivetrain and bumper damage associated with old-style hook-and-chain towing. All-wheel-drive,
          automatic-transmission, and electric vehicles must be transported this way; we do this for every
          single tow, not just premium cars.
        </p>
        <p>
          <strong>24/7 emergency response:</strong> Breakdowns don't wait for business hours. Our night
          shift teams are physically stationed across the city, not routed through a call center that
          dispatches "in the morning." When you call at 3 a.m., a real truck is already close by.
        </p>
        <p>
          <strong>Accident recovery:</strong> After a traffic accident, once the police report and/or
          digital accident report (kaza tespit tutanağı) is completed, we recover your vehicle — even if
          it's badly damaged, has a locked steering wheel, or won't roll — using winches and skates to
          load it without adding further damage, and transport it to a repair shop, insurance-approved
          body shop, or secure storage lot of your choice.
        </p>
        <p>
          <strong>Heavy vehicle and truck recovery:</strong> Trucks, buses, and commercial vehicles require
          a completely different class of equipment — tonnage-rated recovery vehicles, air-brake release
          procedures, and load-securing protocols. We operate this equipment across Istanbul's major
          logistics corridors including Tuzla, Hadımköy, and İkitelli.
        </p>
        <p>
          <strong>Motorcycle transport:</strong> Motorcycles are secured with a front-wheel chock and
          double tie-down straps on a dedicated flatbed — never dragged or improperly strapped by the
          handlebars or plastic fairings.
        </p>
        <p>
          <strong>Luxury and electric vehicle care:</strong> Low-clearance sports cars are loaded using
          low-angle ramps and extension plates to avoid scraping the front splitter; electric vehicles
          (Tesla, and others) are transported exclusively on flatbeds and taken directly to the nearest DC
          fast-charging station if the battery is depleted.
        </p>
        <p>
          <strong>Intercity transport:</strong> Need your car moved to or from another city in Turkey?
          We provide insured, documented long-distance vehicle transport to all 81 provinces.
        </p>

        <h2>Airport Breakdown? We Understand the Urgency</h2>
        <p>
          One of our most frequent English-language calls comes from travelers whose car — often a rental
          — breaks down on the way to or from Istanbul Airport (IST) or Sabiha Gökçen Airport (SAW) while
          racing to catch a flight. In these cases we open a priority dispatch: we first help you resolve
          your own transport to the terminal (taxi or ride-hailing), then take custody of the vehicle under
          a documented hand-off protocol and deliver it to the rental company's return point or your
          chosen address — so a car problem doesn't turn into a missed flight.
        </p>

        <h2>No Prices Published Online — Call for an Honest Quote</h2>
        <p>
          In line with standard practice for towing services, we do not list prices on this website. Cost
          depends on distance, vehicle type, and specific recovery conditions. Call {SITE.phone} and you
          will get a clear, upfront quote before any work begins — no surprises.
        </p>
      </section>

      <FaqSection faqs={faqs} title="Frequently Asked Questions" />
    </>
  );
}
