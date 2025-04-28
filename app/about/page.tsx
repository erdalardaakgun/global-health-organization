"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Users, Award, TrendingUp } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("aboutHeroTitle")}
            </h1>
            <p className="text-xl text-white/90">{t("aboutHeroSubtitle")}</p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                {t("ourStory")}
              </h2>
              <p className="text-gray-700 mb-4">{t("ourStoryP1")}</p>
              <p className="text-gray-700 mb-4">{t("ourStoryP2")}</p>
              <p className="text-gray-700">{t("ourStoryP3")}</p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/image-1.webp"
                alt="Global Health Organisation Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {t("ourValues")}
            </h2>
            <p className="text-gray-700">{t("ourValuesSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {t("patientCentered")}
              </h3>
              <p className="text-gray-700">{t("patientCenteredDesc")}</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {t("excellence")}
              </h3>
              <p className="text-gray-700">{t("excellenceDesc")}</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {t("resultsDriven")}
              </h3>
              <p className="text-gray-700">{t("resultsDrivenDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/hospital.webp"
                alt="Why Choose Global Health Organisation"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                {t("whyChooseUs")}
              </h2>
              <p className="text-gray-700 mb-6">{t("whyChooseUsDesc")}</p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      {t("healthcareSpecialization")}
                    </h3>
                    <p className="text-gray-700">
                      {t("healthcareSpecializationDesc")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      {t("comprehensiveApproach")}
                    </h3>
                    <p className="text-gray-700">
                      {t("comprehensiveApproachDesc")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      {t("provenResults")}
                    </h3>
                    <p className="text-gray-700">{t("provenResultsDesc")}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      {t("multilingualSupport")}
                    </h3>
                    <p className="text-gray-700">
                      {t("multilingualSupportDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t("readyToTransformPresence")}
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {t("contactUsToday")}
          </p>
          <Link
            href="/contact"
            className="bg-white text-accent px-8 py-3 rounded-md font-medium transition-all duration-300 hover:bg-gray-100 hover:shadow-lg"
          >
            {t("getInTouch")}
          </Link>
        </div>
      </section>
    </>
  );
}
