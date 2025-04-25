"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "./language-provider";
import { Menu, X, Globe, Phone, Mail, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [desktopLanguageDropdown, setDesktopLanguageDropdown] = useState(false);
  const [mobileLanguageDropdown, setMobileLanguageDropdown] = useState(false);

  // Add refs to detect clicks outside dropdowns
  const desktopLanguageDropdownRef = useRef<HTMLDivElement>(null);
  const mobileLanguageDropdownRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopLanguageDropdownRef.current &&
        !desktopLanguageDropdownRef.current.contains(event.target as Node)
      ) {
        setDesktopLanguageDropdown(false);
      }
      if (
        mobileLanguageDropdownRef.current &&
        !mobileLanguageDropdownRef.current.contains(event.target as Node)
      ) {
        setMobileLanguageDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Define language names with fallbacks
  const getLanguageName = (code: string) => {
    const languageKeys: Record<string, string> = {
      en: "english",
      tr: "turkish",
      ar: "arabic",
    };

    // Use the translation function with fallback
    return t(languageKeys[code] || "english");
  };

  const languages = [
    { code: "tr", name: getLanguageName("tr") },
    { code: "en", name: getLanguageName("en") },
    { code: "ar", name: getLanguageName("ar") },
  ];

  const changeLanguage = (lang: string) => {
    console.log("changeLanguage called with:", lang);
    setLanguage(lang as "en" | "tr" | "ar");
    setLanguageDropdown(false);
  };

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    {
      href: "/services",
      label: t("services"),
      dropdown: true,
      items: [
        { href: "/services#hospital-seo", label: t("hospitalSEO") },
        { href: "/services#content-marketing", label: t("contentMarketing") },
        {
          href: "/services#patient-acquisition",
          label: t("patientAcquisition"),
        },
        { href: "/services#call-center", label: t("callCenterSolutions") },
      ],
    },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  // Handle dropdown toggle with stopPropagation
  const handleLanguageToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLanguageDropdown(!languageDropdown);
    setServicesDropdown(false);
  };

  const handleServicesToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setServicesDropdown(!servicesDropdown);
    setLanguageDropdown(false);
  };

  return (
    <div className="sticky top-0 w-full z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 hidden md:block">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span>+90 212 345 6789</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <span>info@globalhealth.org</span>
            </div>
          </div>
          <div className="relative" ref={desktopLanguageDropdownRef}>
            <button
              onClick={() => setDesktopLanguageDropdown(!desktopLanguageDropdown)}
              className="flex items-center hover:text-accent transition-colors"
            >
              <Globe className="h-4 w-4 mr-1" />
              <span className="font-medium">
                {languages.find((lang) => lang.code === language)?.name || "Turkish"}
              </span>
              <ChevronDown className="h-3 w-3 ml-1" />
            </button>
            {desktopLanguageDropdown && (
              <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-40 z-[100]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setDesktopLanguageDropdown(false);
                    }}
                    className={`block w-full text-left px-4 py-2 ${
                      language === lang.code
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700"
                    } hover:bg-primary hover:text-white transition-colors`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-3" : "bg-white/95 py-4"
        }`}
      >
        <div className="container-custom flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="bg-primary text-white p-2 rounded-md mr-2">
              <span className="font-bold text-xl">G</span>
            </div>
            <span className="text-primary font-bold text-2xl">
              Global Health Organization
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                {link.dropdown ? (
                  <div className="relative" ref={servicesDropdownRef}>
                    <button
                      className="text-gray-700 hover:text-primary font-medium transition-colors px-4 py-2 rounded-md hover:bg-gray-50 flex items-center"
                      onClick={handleServicesToggle}
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </button>
                    {servicesDropdown && (
                      <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 w-64 z-[100]">
                        {link.items?.map((item, i) => (
                          <Link
                            key={i}
                            href={item.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-primary hover:text-white transition-colors"
                            onClick={() => setServicesDropdown(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-primary font-medium transition-colors px-4 py-2 rounded-md hover:bg-gray-50"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="bg-accent text-white px-6 py-2 rounded-md font-medium transition-all duration-300 hover:bg-accent/90 hover:shadow-md ml-2"
            >
              {t("getConsultation")}
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <div className="relative mr-4" ref={mobileLanguageDropdownRef}>
              <button
                onClick={() => setMobileLanguageDropdown(!mobileLanguageDropdown)}
                className="text-gray-700 hover:text-primary"
              >
                <Globe className="h-5 w-5" />
              </button>
              {mobileLanguageDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-40 z-[100]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setMobileLanguageDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-2 ${
                        language === lang.code
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700"
                      } hover:bg-primary hover:text-white transition-colors`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 py-4 px-4 z-[90]">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <div key={link.href}>
                  {link.dropdown ? (
                    <>
                      <button
                        className="text-gray-700 hover:text-primary font-medium transition-colors flex items-center justify-between w-full"
                        onClick={() => setServicesDropdown(!servicesDropdown)}
                      >
                        {link.label}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      {servicesDropdown && (
                        <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200">
                          {link.items?.map((item, i) => (
                            <Link
                              key={i}
                              href={item.href}
                              className="block py-1 text-gray-600 hover:text-primary"
                              onClick={() => {
                                setServicesDropdown(false);
                                setIsOpen(false);
                              }}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-700 hover:text-primary font-medium transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                className="bg-accent text-white px-4 py-2 rounded-md font-medium transition-all duration-300 hover:bg-accent/90 text-center mt-2"
                onClick={() => setIsOpen(false)}
              >
                {t("getConsultation")}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
