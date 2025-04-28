"use client";

import Link from "next/link";
import { useLanguage } from "./language-provider";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Global Health Organisation
            </h3>
            <p className="mb-4 text-gray-300">{t("companyInfo")}</p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-accent transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-accent transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-accent transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-accent transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("ourServicesFooter")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services#hospital-seo"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("hospitalSEOFooter")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services#content-marketing"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("contentMarketingFooter")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services#patient-acquisition"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("patientAcquisitionFooter")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services#call-center"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("callCenterFooter")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services#analytics"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t("digitalAnalytics")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("contactInfo")}</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-accent" />
                <span className="text-gray-300">
                  info@globalhealtorganisation.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {currentYear} Global Health Organisation.{" "}
              {t("allRightsReserved")}
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t("privacyPolicy")}
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t("termsOfService")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
