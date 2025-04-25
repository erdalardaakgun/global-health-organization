"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  Search,
  FileText,
  Users,
  Phone,
  BarChart2,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    {
      id: "hospital-seo",
      icon: Search,
      title: t("hospitalSEO"),
      description: t("hospitalSEODesc"),
      features: [
        "Keyword research focused on medical terms and patient search behavior",
        "On-page optimization for hospital websites",
        "Local SEO to target patients in your area",
        "Medical content optimization",
        "Technical SEO for healthcare websites",
      ],
    },
    {
      id: "content-marketing",
      icon: FileText,
      title: t("contentMarketing"),
      description: t("contentMarketingDesc"),
      features: [
        "Medical blog content creation",
        "Patient education materials",
        "Doctor profiles and expertise highlighting",
        "Treatment procedure explanations",
        "Healthcare news and updates",
      ],
    },
    {
      id: "patient-acquisition",
      icon: Users,
      title: t("patientAcquisition"),
      description: t("patientAcquisitionDesc"),
      features: [
        "Patient journey mapping",
        "Conversion rate optimization",
        "Landing page development for medical services",
        "Online appointment booking systems",
        "Patient testimonial collection and display",
      ],
    },
    {
      id: "call-center",
      icon: Phone,
      title: t("callCenterSolutions"),
      description: t("callCenterDesc"),
      features: [
        "Call center setup and management",
        "Staff training for medical inquiries",
        "Call tracking and analytics",
        "Multilingual support (Turkish, English, Arabic)",
        "Integration with hospital management systems",
      ],
    },
    {
      id: "analytics",
      icon: BarChart2,
      title: "Digital Analytics",
      description:
        "Track and analyze your hospital's digital performance to continuously improve your strategy.",
      features: [
        "Custom healthcare marketing dashboards",
        "Patient acquisition tracking",
        "ROI measurement for digital campaigns",
        "Competitor analysis",
        "Monthly performance reporting",
      ],
    },
    {
      id: "international",
      icon: Globe,
      title: "International Patient Services",
      description:
        "Attract international patients with targeted marketing strategies and multilingual support.",
      features: [
        "Multilingual website development",
        "Cultural adaptation of marketing materials",
        "International SEO strategies",
        "Medical tourism promotion",
        "Cross-border patient journey management",
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("servicesHeroTitle")}
            </h1>
            <p className="text-xl text-white/90">{t("servicesHeroSubtitle")}</p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {t("howWeHelp")}
            </h2>
            <p className="text-gray-700">{t("howWeHelpDesc")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {services.map((service) => (
              <Card
                key={service.id}
                className="hover:shadow-lg transition-shadow h-full"
                id={service.id}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  <div className="mt-auto">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {t("keyFeatures")}
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {t("ourProcess")}
            </h2>
            <p className="text-gray-700">{t("ourProcessDesc")}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">
                {t("assessment")}
              </h3>
              <p className="text-gray-700">{t("assessmentDesc")}</p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">
                {t("strategy")}
              </h3>
              <p className="text-gray-700">{t("strategyDesc")}</p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">
                {t("implementation")}
              </h3>
              <p className="text-gray-700">{t("implementationDesc")}</p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">
                {t("optimization")}
              </h3>
              <p className="text-gray-700">{t("optimizationDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t("readyToElevate")}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {t("contactUsToday")}
          </p>
          <Link
            href="/contact"
            className="bg-white text-accent px-8 py-3 rounded-md font-medium transition-all duration-300 hover:bg-gray-100 hover:shadow-lg"
          >
            {t("scheduleConsultation")}
          </Link>
        </div>
      </section>
    </>
  );
}
