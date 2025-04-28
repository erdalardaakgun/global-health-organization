"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export default function ContactPage() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("contactHeroTitle")}
            </h1>
            <p className="text-xl text-white/90">{t("contactHeroSubtitle")}</p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <Card className="hover:shadow-lg transition-shadow w-80 h-fit">
              <CardContent className="p-6 flex flex-col items-center text-center h-full">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  {t("phone")}
                </h3>
                <p className="text-gray-700">+90 212 345 6789</p>
                <p className="text-gray-700">+90 212 987 6543</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow w-80 h-fit">
              <CardContent className="p-6 flex flex-col items-center text-center h-full">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  {t("email")}
                </h3>
                <p className="text-gray-700">
                  info@globalhealtorganisation.com
                </p>
                <p className="text-gray-700">
                  support@globalhealtorganisation.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                {t("getInTouchTitle")}
              </h2>
              <p className="text-gray-700">{t("getInTouchDesc")}</p>
            </div>

            <Card>
              <CardContent className="p-6">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="bg-green-100 text-green-700 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      {t("thankYou")}
                    </h3>
                    <p className="text-gray-700 mb-6">{t("messageSent")}</p>
                    <Button onClick={() => setIsSubmitted(false)}>
                      {t("sendAnother")}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {t("yourName")}
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {t("yourEmail")}
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {t("phoneNumber")}
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {t("subject")}
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        >
                          <option value="">{t("selectSubject")}</option>
                          <option value="Hospital SEO">Hospital SEO</option>
                          <option value="Content Marketing">
                            Content Marketing
                          </option>
                          <option value="Patient Acquisition">
                            Patient Acquisition
                          </option>
                          <option value="Call Center Solutions">
                            Call Center Solutions
                          </option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {t("yourMessage")}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className={errors.message ? "border-red-500" : ""}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          {t("sending")}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" /> {t("sendMessage")}
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {t("ourLocation")}
            </h2>
            <p className="text-gray-700">{t("visitOffice")}</p>
          </div>

          <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
            
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <MapPin className="h-12 w-12 text-primary" />
              <span className="ml-2 text-lg font-medium">
                Map will be displayed here
              </span>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                {t("faq")}
              </h2>
              <p className="text-gray-700">{t("faqDesc")}</p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-primary mb-2">
                    How quickly can you start working with our hospital?
                  </h3>
                  <p className="text-gray-700">
                    We can typically begin working with new clients within 1-2
                    weeks of signing an agreement. Our onboarding process
                    includes an initial assessment of your current digital
                    presence and development of a customized strategy.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-primary mb-2">
                    Do you work with hospitals outside of Turkey?
                  </h3>
                  <p className="text-gray-700">
                    Yes, we work with hospitals and healthcare providers
                    internationally. We have experience in developing digital
                    strategies for medical tourism and international patient
                    acquisition.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-primary mb-2">
                    What information do you need to provide a quote?
                  </h3>
                  <p className="text-gray-700">
                    To provide an accurate quote, we typically need information
                    about your hospital's size, current digital presence, target
                    markets, specific services you're interested in, and your
                    goals for digital marketing.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
