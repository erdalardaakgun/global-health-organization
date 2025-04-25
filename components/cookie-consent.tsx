"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
// Update the CookieConsent component to use translations
import { useLanguage } from "./language-provider"

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    // Check if user has already consented
    try {
      const hasConsented = localStorage.getItem("cookieConsent")
      if (!hasConsented) {
        // Show the consent banner after a short delay
        const timer = setTimeout(() => {
          setShowConsent(true)
        }, 1000)
        return () => clearTimeout(timer)
      }
    } catch (error) {
      // Ignore localStorage errors
    }
  }, [])

  const handleAccept = () => {
    try {
      localStorage.setItem("cookieConsent", "true")
    } catch (error) {
      // Ignore localStorage errors
    }
    setShowConsent(false)
  }

  const handleDecline = () => {
    try {
      localStorage.setItem("cookieConsent", "false")
    } catch (error) {
      // Ignore localStorage errors
    }
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white shadow-lg border-t border-gray-200">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 pr-4">
            <h3 className="text-lg font-semibold text-primary mb-1">{t("cookieTitle") || "We Value Your Privacy"}</h3>
            <p className="text-sm text-gray-600">
              {t("cookieMessage") ||
                "We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking 'Accept', you consent to our use of cookies."}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              {t("decline") || "Decline"}
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
            >
              {t("accept") || "Accept"}
            </button>
            <button
              onClick={() => setShowConsent(false)}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
