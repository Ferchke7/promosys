import { LandingPage } from "@/src/app/LandingPage";
import { createLandingMetadata } from "@/src/shared/seo/createLandingMetadata";
import { createOrganizationSchema } from "@/src/shared/seo/createOrganizationSchema";
import { StructuredData } from "@/src/shared/seo/StructuredData";

const locale = "uz" as const;

export const metadata = createLandingMetadata(locale);

export default function UzbekHome() {
  return (
    <>
      <StructuredData data={createOrganizationSchema(locale)} />
      <LandingPage locale={locale} />
    </>
  );
}
