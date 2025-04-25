"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  Users,
  Building,
  BarChart2,
  Search,
  FileText,
  Phone,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/language-provider";

// Simple animation component that doesn't rely on external libraries
function AnimationWrapper({ children, className = "", delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Simple counter component
function AnimatedCounter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2000;

    const animate = (timestamp: number | null) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        window.requestAnimationFrame(animate);
      }
    };

    window.requestAnimationFrame(animate);
  }, [end]);

  return (
    <span className="text-3xl font-bold text-primary">
      {count}
      {suffix}
    </span>
  );
}

export default function Home() {
  const { t } = useLanguage();

  const stats = [
    { icon: Building, value: 50, suffix: "+", label: t("partnerHospitals") },
    {
      icon: BarChart2,
      value: 300,
      suffix: "%",
      label: t("averageTrafficIncrease"),
    },
    { icon: Users, value: 10, suffix: "K+", label: t("monthlyPatientLeads") },
    { icon: Star, value: 98, suffix: "%", label: t("clientSatisfaction") },
  ];

  const services = [
    {
      title: t("hospitalSEO"),
      description: t("hospitalSEODesc"),
      icon: Search,
    },
    {
      title: t("contentMarketing"),
      description: t("contentMarketingDesc"),
      icon: FileText,
    },
    {
      title: t("patientAcquisition"),
      description: t("patientAcquisitionDesc"),
      icon: Users,
    },
    {
      title: t("callCenterSolutions"),
      description: t("callCenterDesc"),
      icon: Phone,
    },
  ];

  const blogPosts = [
    {
      title: "How SEO Can Transform Your Hospital's Digital Presence",
      excerpt:
        "Discover the key SEO strategies that can help your hospital reach more patients online.",
      image: "/placeholder.svg?height=300&width=500",
      date: "May 15, 2023",
    },
    {
      title: "Creating Content That Connects With Patients",
      excerpt:
        "Learn how to develop a content strategy that addresses patient concerns and builds trust.",
      image: "/placeholder.svg?height=300&width=500",
      date: "April 28, 2023",
    },
    {
      title: "Digital Transformation for Hospitals: A Complete Guide",
      excerpt:
        "A comprehensive approach to bringing your hospital into the digital age effectively.",
      image: "/placeholder.svg?height=300&width=500",
      date: "March 12, 2023",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/90 text-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <AnimationWrapper>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {t("heroTitle")}
              </h1>
              <p className="text-xl text-white/90 mb-8">{t("heroSubtitle")}</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-white text-primary px-6 py-3 rounded-md font-medium transition-all duration-300 hover:bg-gray-100 hover:shadow-lg"
                >
                  {t("getStarted")}
                </Link>
                <Link
                  href="/services"
                  className="bg-accent text-white px-6 py-3 rounded-md font-medium transition-all duration-300 hover:bg-accent/90 hover:shadow-lg"
                >
                  {t("ourServices")}
                </Link>
              </div>
            </AnimationWrapper>
          </div>
          <AnimationWrapper delay={300}>
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent z-10"></div>
              <Image
                src="/images/hero.webp"
                alt="Digital Hospital Solutions"
                fill
                className="object-cover"
                priority
              />
            </div>
          </AnimationWrapper>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimationWrapper key={index} delay={index * 100}>
                <div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-center mb-4">
                    <stat.icon className="h-12 w-12 text-accent" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </AnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
              {t("digitalHospitalServices")}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-center">
              {t("servicesSubtitle")}
            </p>
          </AnimationWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {services.map((service, index) => (
              <AnimationWrapper key={index} delay={index * 100}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {service.description}
                    </p>
                    <Link
                      href="/services"
                      className="text-accent font-medium flex items-center hover:underline mt-auto"
                    >
                      {t("readMore")} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </AnimationWrapper>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="bg-primary text-white px-6 py-3 rounded-md font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
            >
              {t("viewAllServices")}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("readyToTransform")}
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {t("contactUsToday")}
            </p>
            <Link
              href="/contact"
              className="bg-white text-accent px-8 py-3 rounded-md font-medium transition-all duration-300 hover:bg-gray-100 hover:shadow-lg"
            >
              {t("contactUsNow")}
            </Link>
          </AnimationWrapper>
        </div>
      </section>
    </>
  );
}
