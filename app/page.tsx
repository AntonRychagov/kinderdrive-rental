import { LandingPage } from "@/components/landing-page";
import { landingData } from "@/lib/landing-data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: landingData.brand.name,
  description: landingData.seo.description,
  telephone: landingData.brand.phone,
  areaServed: landingData.jsonLd.areaServed,
  priceRange: landingData.jsonLd.priceRange,
  openingHours: landingData.jsonLd.openingHours,
  serviceType: landingData.jsonLd.serviceType,
  sameAs: [landingData.brand.telegramHref, landingData.brand.whatsappHref]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPage />
    </>
  );
}
