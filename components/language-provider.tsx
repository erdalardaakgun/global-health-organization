"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "tr" | "ar"

// Update the translations object to include more content for all pages
const translations = {
  en: {
    // Navigation & Common
    home: "Home",
    about: "About Us",
    services: "Services",
    blog: "Blog",
    contact: "Contact",
    getConsultation: "Get Consultation",
    english: "English",
    turkish: "Turkish",
    arabic: "Arabic",
    quickLinks: "Quick Links",
    readMore: "Read More",
    viewAll: "View All",

    // Home Page
    heroTitle: "Transform Your Hospital's Digital Presence",
    heroSubtitle:
      "We help hospitals improve their SEO, create engaging content, and develop call centers to attract more patients and enhance their digital footprint.",
    getStarted: "Get Started",
    ourServices: "Our Services",
    partnerHospitals: "Partner Hospitals",
    averageTrafficIncrease: "Average Traffic Increase",
    monthlyPatientLeads: "Monthly Patient Leads",
    clientSatisfaction: "Client Satisfaction",
    digitalHospitalServices: "Our Digital Hospital Services",
    servicesSubtitle: "Comprehensive digital solutions tailored to hospitals' unique needs",
    hospitalSEO: "Hospital SEO Services",
    hospitalSEODesc:
      "Boost your hospital's online visibility and attract more patients with our specialized healthcare SEO strategies.",
    contentMarketing: "Content Marketing",
    contentMarketingDesc:
      "Engage patients with high-quality, medically accurate content that establishes your hospital as an authority.",
    patientAcquisition: "Patient Acquisition",
    patientAcquisitionDesc:
      "Convert website visitors into patients with optimized landing pages and conversion strategies.",
    callCenterSolutions: "Call Center Solutions",
    callCenterDesc:
      "Implement efficient call center operations to handle patient inquiries and appointment scheduling.",
    viewAllServices: "View All Services",
    latestInsights: "Latest Insights",
    insightsSubtitle: "Stay informed with our latest digital healthcare marketing strategies and success stories",
    viewAllArticles: "View All Articles",
    readyToTransform: "Ready to Transform Your Hospital Digitally?",
    contactUsToday:
      "Contact us today to discuss how we can help your hospital improve its online presence, attract more patients, and streamline operations.",
    contactUsNow: "Contact Us Now",

    // About Page
    aboutHeroTitle: "About Digital Hospital Solutions",
    aboutHeroSubtitle:
      "We help hospitals transform their digital presence to attract more patients and improve their healthcare services.",
    ourStory: "Our Story",
    ourStoryP1:
      "Digital Hospital Solutions was founded in 2018 with a clear mission: to help healthcare providers navigate the increasingly digital landscape of patient acquisition and engagement.",
    ourStoryP2:
      "Our team of healthcare marketing specialists, SEO experts, and call center professionals brings together decades of combined experience in the medical industry. We understand the unique challenges that hospitals face in today's competitive environment.",
    ourStoryP3:
      "What sets us apart is our specialized focus on hospitals and healthcare providers. We don't just apply generic digital marketing strategies – we develop tailored solutions that address the specific needs and regulatory requirements of the healthcare industry.",
    ourValues: "Our Values",
    ourValuesSubtitle: "These core principles guide everything we do at Digital Hospital Solutions",
    patientCentered: "Patient-Centered",
    patientCenteredDesc:
      "We focus on improving the patient journey from the first online search to the hospital visit.",
    excellence: "Excellence",
    excellenceDesc:
      "We strive for excellence in every aspect of our work, from strategy development to implementation.",
    resultsDriven: "Results-Driven",
    resultsDrivenDesc: "We measure our success by the tangible results we deliver to our hospital partners.",
    ourLeadershipTeam: "Our Leadership Team",
    leadershipSubtitle: "Meet the experts behind Digital Hospital Solutions' innovative strategies",
    ceoFounder: "CEO & Founder",
    ceoDesc: "Former hospital administrator with 15+ years of experience in healthcare management.",
    marketingDirector: "Marketing Director",
    marketingDesc: "Digital marketing specialist with a focus on healthcare SEO and content strategy.",
    technicalDirector: "Technical Director",
    technicalDesc: "Expert in call center operations and healthcare technology integration.",
    whyChooseUs: "Why Choose Us",
    whyChooseUsDesc:
      "We understand the unique challenges that hospitals face in the digital landscape. Here's why leading healthcare providers choose to partner with us:",
    healthcareSpecialization: "Healthcare Specialization",
    healthcareSpecializationDesc:
      "We exclusively serve hospitals and healthcare providers, giving us unmatched industry expertise.",
    comprehensiveApproach: "Comprehensive Approach",
    comprehensiveApproachDesc:
      "From SEO to call centers, we provide end-to-end solutions for your digital transformation.",
    provenResults: "Proven Results",
    provenResultsDesc: "Our strategies have helped hospitals increase patient inquiries by an average of 300%.",
    multilingualSupport: "Multilingual Support",
    multilingualSupportDesc:
      "We offer services in Turkish, English, and Arabic to help you reach international patients.",
    readyToTransformPresence: "Ready to Transform Your Hospital's Digital Presence?",
    getInTouch: "Get in Touch",

    // Services Page
    servicesHeroTitle: "Our Digital Hospital Services",
    servicesHeroSubtitle: "Comprehensive digital solutions tailored to hospitals' unique needs and challenges",
    howWeHelp: "How We Help Hospitals Succeed Online",
    howWeHelpDesc:
      "Our comprehensive suite of digital services is designed specifically for hospitals and healthcare providers. We understand the unique challenges of the healthcare industry and provide tailored solutions to help you attract more patients and improve your digital presence.",
    keyFeatures: "Key Features:",
    ourProcess: "Our Process",
    ourProcessDesc: "We follow a systematic approach to ensure successful digital transformation for your hospital",
    assessment: "Assessment",
    assessmentDesc: "We analyze your current digital presence, identify opportunities, and understand your goals.",
    strategy: "Strategy",
    strategyDesc: "We develop a customized digital strategy tailored to your hospital's specific needs.",
    implementation: "Implementation",
    implementationDesc: "Our team executes the strategy, implementing all necessary digital solutions.",
    optimization: "Optimization",
    optimizationDesc: "We continuously monitor results and optimize your strategy for maximum performance.",
    successStories: "Success Stories",
    successStoriesDesc: "See how we've helped hospitals transform their digital presence",
    readCaseStudy: "Read Case Study",
    faq: "Frequently Asked Questions",
    faqDesc: "Answers to common questions about our digital hospital services",
    readyToElevate: "Ready to Elevate Your Hospital's Digital Presence?",
    scheduleConsultation: "Schedule a Consultation",

    // Blog Page
    blogHeroTitle: "Digital Hospital Insights",
    blogHeroSubtitle: "Expert articles on hospital marketing, SEO, and digital transformation",
    searchArticles: "Search articles...",
    allPosts: "All Posts",
    categories: "Categories",
    featuredPosts: "Featured Posts",
    subscribeNewsletter: "Subscribe to Our Newsletter",
    newsletterDesc: "Stay updated with the latest insights in hospital digital marketing",
    subscribe: "Subscribe",
    noArticlesFound: "No articles found",
    adjustSearch: "Try adjusting your search or filter criteria",

    // Contact Page
    contactHeroTitle: "Contact Us",
    contactHeroSubtitle:
      "Get in touch with our team to discuss how we can help transform your hospital's digital presence",
    phone: "Phone",
    email: "Email",
    address: "Address",
    workingHours: "Working Hours",
    getInTouchTitle: "Get in Touch",
    getInTouchDesc: "Fill out the form below and our team will get back to you within 24 hours",
    yourName: "Your Name *",
    yourEmail: "Your Email *",
    phoneNumber: "Phone Number",
    subject: "Subject",
    selectSubject: "Select a subject",
    yourMessage: "Your Message *",
    sendMessage: "Send Message",
    sending: "Sending...",
    thankYou: "Thank You!",
    messageSent: "Your message has been sent successfully. We'll get back to you shortly.",
    sendAnother: "Send Another Message",
    ourLocation: "Our Location",
    visitOffice: "Visit our office in Istanbul",

    // Footer
    companyInfo: "Premium digital marketing services for hospitals with personalized strategies and support.",
    ourServicesFooter: "Our Services",
    hospitalSEOFooter: "Hospital SEO",
    contentMarketingFooter: "Content Marketing",
    patientAcquisitionFooter: "Patient Acquisition",
    callCenterFooter: "Call Center Solutions",
    digitalAnalytics: "Digital Analytics",
    contactInfo: "Contact Info",
    allRightsReserved: "All Rights Reserved",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",

    // Cookie Consent
    cookieTitle: "We Value Your Privacy",
    cookieMessage:
      "We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking 'Accept', you consent to our use of cookies.",
    accept: "Accept",
    decline: "Decline",

    // Blog Detail Page
    shareArticle: "Share this article",
    relatedArticles: "Related Articles",
  },
  tr: {
    // Navigation & Common
    home: "Ana Sayfa",
    about: "Hakkımızda",
    services: "Hizmetler",
    blog: "Blog",
    contact: "İletişim",
    getConsultation: "Danışmanlık Alın",
    english: "İngilizce",
    turkish: "Türkçe",
    arabic: "Arapça",
    quickLinks: "Hızlı Bağlantılar",
    readMore: "Devamını Oku",
    viewAll: "Tümünü Gör",

    // Home Page
    heroTitle: "Hastanenizin Dijital Varlığını Dönüştürün",
    heroSubtitle:
      "Hastanelerin SEO'larını iyileştirmelerine, ilgi çekici içerikler oluşturmalarına ve daha fazla hasta çekmek için çağrı merkezleri geliştirmelerine yardımcı oluyoruz.",
    getStarted: "Başlayın",
    ourServices: "Hizmetlerimiz",
    partnerHospitals: "Ortak Hastaneler",
    averageTrafficIncrease: "Ortalama Trafik Artışı",
    monthlyPatientLeads: "Aylık Hasta Potansiyeli",
    clientSatisfaction: "Müşteri Memnuniyeti",
    digitalHospitalServices: "Dijital Hastane Hizmetlerimiz",
    servicesSubtitle: "Hastanelerin benzersiz ihtiyaçlarına göre özelleştirilmiş kapsamlı dijital çözümler",
    hospitalSEO: "Hastane SEO Hizmetleri",
    hospitalSEODesc:
      "Özel sağlık hizmeti SEO stratejilerimizle hastanenizin çevrimiçi görünürlüğünü artırın ve daha fazla hasta çekin.",
    contentMarketing: "İçerik Pazarlaması",
    contentMarketingDesc:
      "Hastanenizi bir otorite olarak konumlandıran yüksek kaliteli, tıbbi açıdan doğru içeriklerle hastaları cezbedebilirsiniz.",
    patientAcquisition: "Hasta Kazanımı",
    patientAcquisitionDesc:
      "Optimize edilmiş açılış sayfaları ve dönüşüm stratejileriyle web sitesi ziyaretçilerini hastalara dönüştürün.",
    callCenterSolutions: "Çağrı Merkezi Çözümleri",
    callCenterDesc:
      "Hasta sorularını ve randevu planlamasını yönetmek için verimli çağrı merkezi operasyonları uygulayın.",
    viewAllServices: "Tüm Hizmetleri Görüntüle",
    latestInsights: "Son Görüşler",
    insightsSubtitle: "En son dijital sağlık hizmeti pazarlama stratejileri ve başarı hikayeleri hakkında bilgi edinin",
    viewAllArticles: "Tüm Makaleleri Görüntüle",
    readyToTransform: "Hastanenizi Dijital Olarak Dönüştürmeye Hazır mısınız?",
    contactUsToday:
      "Hastanenizin çevrimiçi varlığını iyileştirme, daha fazla hasta çekme ve operasyonları düzenleme konusunda nasıl yardımcı olabileceğimizi görüşmek için bugün bizimle iletişime geçin.",
    contactUsNow: "Şimdi İletişime Geçin",

    // About Page
    aboutHeroTitle: "Dijital Hastane Çözümleri Hakkında",
    aboutHeroSubtitle:
      "Hastanelerin daha fazla hasta çekmek ve sağlık hizmetlerini iyileştirmek için dijital varlıklarını dönüştürmelerine yardımcı oluyoruz.",
    ourStory: "Hikayemiz",
    ourStoryP1:
      "Dijital Hastane Çözümleri, 2018 yılında net bir misyonla kuruldu: sağlık hizmeti sağlayıcılarının hasta kazanımı ve etkileşiminin giderek dijitalleşen ortamında yol almalarına yardımcı olmak.",
    ourStoryP2:
      "Sağlık pazarlaması uzmanları, SEO uzmanları ve çağrı merkezi profesyonellerinden oluşan ekibimiz, tıp sektöründe onlarca yıllık birleşik deneyimi bir araya getiriyor. Hastanelerin günümüzün rekabetçi ortamında karşılaştığı benzersiz zorlukları anlıyoruz.",
    ourStoryP3:
      "Bizi farklı kılan, hastanelere ve sağlık hizmeti sağlayıcılarına özel odaklanmamızdır. Sadece genel dijital pazarlama stratejileri uygulamıyoruz - sağlık sektörünün özel ihtiyaçlarını ve düzenleyici gereksinimlerini karşılayan özel çözümler geliştiriyoruz.",
    ourValues: "Değerlerimiz",
    ourValuesSubtitle: "Bu temel ilkeler, Dijital Hastane Çözümleri'nde yaptığımız her şeye rehberlik eder",
    patientCentered: "Hasta Odaklı",
    patientCenteredDesc:
      "İlk çevrimiçi aramadan hastane ziyaretine kadar hasta yolculuğunu iyileştirmeye odaklanıyoruz.",
    excellence: "Mükemmellik",
    excellenceDesc: "Strateji geliştirmeden uygulamaya kadar işimizin her yönünde mükemmelliği hedefliyoruz.",
    resultsDriven: "Sonuç Odaklı",
    resultsDrivenDesc: "Başarımızı, hastane ortaklarımıza sunduğumuz somut sonuçlarla ölçüyoruz.",
    ourLeadershipTeam: "Liderlik Ekibimiz",
    leadershipSubtitle: "Dijital Hastane Çözümleri'nin yenilikçi stratejilerinin arkasındaki uzmanlarla tanışın",
    ceoFounder: "CEO ve Kurucu",
    ceoDesc: "Sağlık yönetiminde 15+ yıllık deneyime sahip eski hastane yöneticisi.",
    marketingDirector: "Pazarlama Direktörü",
    marketingDesc: "Sağlık hizmeti SEO'su ve içerik stratejisine odaklanan dijital pazarlama uzmanı.",
    technicalDirector: "Teknik Direktör",
    technicalDesc: "Çağrı merkezi operasyonları ve sağlık teknolojisi entegrasyonu konusunda uzman.",
    whyChooseUs: "Neden Bizi Seçmelisiniz",
    whyChooseUsDesc:
      "Hastanelerin dijital ortamda karşılaştığı benzersiz zorlukları anlıyoruz. İşte önde gelen sağlık hizmeti sağlayıcılarının bizimle çalışmayı tercih etme nedenleri:",
    healthcareSpecialization: "Sağlık Hizmeti Uzmanlığı",
    healthcareSpecializationDesc:
      "Özel olarak hastanelere ve sağlık hizmeti sağlayıcılarına hizmet veriyoruz, bu da bize eşsiz bir sektör uzmanlığı sağlıyor.",
    comprehensiveApproach: "Kapsamlı Yaklaşım",
    comprehensiveApproachDesc:
      "SEO'dan çağrı merkezlerine kadar, dijital dönüşümünüz için uçtan uca çözümler sunuyoruz.",
    provenResults: "Kanıtlanmış Sonuçlar",
    provenResultsDesc:
      "Stratejilerimiz, hastanelerin hasta sorularını ortalama %300 oranında artırmalarına yardımcı oldu.",
    multilingualSupport: "Çok Dilli Destek",
    multilingualSupportDesc:
      "Uluslararası hastalara ulaşmanıza yardımcı olmak için Türkçe, İngilizce ve Arapça dillerinde hizmet sunuyoruz.",
    readyToTransformPresence: "Hastanenizin Dijital Varlığını Dönüştürmeye Hazır mısınız?",
    getInTouch: "İletişime Geçin",

    // Services Page
    servicesHeroTitle: "Dijital Hastane Hizmetlerimiz",
    servicesHeroSubtitle:
      "Hastanelerin benzersiz ihtiyaçlarına ve zorluklarına göre özelleştirilmiş kapsamlı dijital çözümler",
    howWeHelp: "Hastanelerin Çevrimiçi Başarılı Olmasına Nasıl Yardımcı Oluyoruz",
    howWeHelpDesc:
      "Kapsamlı dijital hizmet paketimiz, özellikle hastaneler ve sağlık hizmeti sağlayıcıları için tasarlanmıştır. Sağlık sektörünün benzersiz zorluklarını anlıyor ve daha fazla hasta çekmenize ve dijital varlığınızı geliştirmenize yardımcı olmak için özel çözümler sunuyoruz.",
    keyFeatures: "Temel Özellikler:",
    ourProcess: "Sürecimiz",
    ourProcessDesc: "Hastaneniz için başarılı bir dijital dönüşüm sağlamak için sistematik bir yaklaşım izliyoruz",
    assessment: "Değerlendirme",
    assessmentDesc: "Mevcut dijital varlığınızı analiz eder, fırsatları belirler ve hedeflerinizi anlarız.",
    strategy: "Strateji",
    strategyDesc: "Hastanenizin özel ihtiyaçlarına göre özelleştirilmiş bir dijital strateji geliştiririz.",
    implementation: "Uygulama",
    implementationDesc: "Ekibimiz, gerekli tüm dijital çözümleri uygulayarak stratejiyi yürütür.",
    optimization: "Optimizasyon",
    optimizationDesc: "Sonuçları sürekli olarak izler ve maksimum performans için stratejinizi optimize ederiz.",
    successStories: "Başarı Hikayeleri",
    successStoriesDesc: "Hastanelerin dijital varlıklarını nasıl dönüştürdüğümüzü görün",
    readCaseStudy: "Vaka Çalışmasını Oku",
    faq: "Sıkça Sorulan Sorular",
    faqDesc: "Dijital hastane hizmetlerimiz hakkında sık sorulan soruların yanıtları",
    readyToElevate: "Hastanenizin Dijital Varlığını Yükseltmeye Hazır mısınız?",
    scheduleConsultation: "Danışmanlık Randevusu Alın",

    // Blog Page
    blogHeroTitle: "Dijital Hastane İçgörüleri",
    blogHeroSubtitle: "Hastane pazarlaması, SEO ve dijital dönüşüm hakkında uzman makaleleri",
    searchArticles: "Makalelerde ara...",
    allPosts: "Tüm Yazılar",
    categories: "Kategoriler",
    featuredPosts: "Öne Çıkan Yazılar",
    subscribeNewsletter: "Bültenimize Abone Olun",
    newsletterDesc: "Hastane dijital pazarlamasındaki en son içgörülerden haberdar olun",
    subscribe: "Abone Ol",
    noArticlesFound: "Makale bulunamadı",
    adjustSearch: "Arama veya filtre kriterlerinizi ayarlamayı deneyin",

    // Contact Page
    contactHeroTitle: "İletişim",
    contactHeroSubtitle:
      "Hastanenizin dijital varlığını nasıl dönüştürebileceğimizi görüşmek için ekibimizle iletişime geçin",
    phone: "Telefon",
    email: "E-posta",
    address: "Adres",
    workingHours: "Çalışma Saatleri",
    getInTouchTitle: "İletişime Geçin",
    getInTouchDesc: "Aşağıdaki formu doldurun, ekibimiz 24 saat içinde size geri dönecektir",
    yourName: "Adınız *",
    yourEmail: "E-posta Adresiniz *",
    phoneNumber: "Telefon Numarası",
    subject: "Konu",
    selectSubject: "Bir konu seçin",
    yourMessage: "Mesajınız *",
    sendMessage: "Mesaj Gönder",
    sending: "Gönderiliyor...",
    thankYou: "Teşekkürler!",
    messageSent: "Mesajınız başarıyla gönderildi. En kısa sürede size geri döneceğiz.",
    sendAnother: "Başka Bir Mesaj Gönder",
    ourLocation: "Konumumuz",
    visitOffice: "İstanbul'daki ofisimizi ziyaret edin",

    // Footer
    companyInfo: "Hastaneler için kişiselleştirilmiş stratejiler ve destekle premium dijital pazarlama hizmetleri.",
    ourServicesFooter: "Hizmetlerimiz",
    hospitalSEOFooter: "Hastane SEO",
    contentMarketingFooter: "İçerik Pazarlaması",
    patientAcquisitionFooter: "Hasta Kazanımı",
    callCenterFooter: "Çağrı Merkezi Çözümleri",
    digitalAnalytics: "Dijital Analitik",
    contactInfo: "İletişim Bilgileri",
    allRightsReserved: "Tüm Hakları Saklıdır",
    privacyPolicy: "Gizlilik Politikası",
    termsOfService: "Kullanım Şartları",

    // Cookie Consent
    cookieTitle: "Gizliliğinize Değer Veriyoruz",
    cookieMessage:
      "Gezinme deneyiminizi geliştirmek, kişiselleştirilmiş reklamlar veya içerik sunmak ve trafiğimizi analiz etmek için çerezleri kullanıyoruz. 'Kabul Et'e tıklayarak çerezlerin kullanımına izin vermiş olursunuz.",
    accept: "Kabul Et",
    decline: "Reddet",

    // Blog Detail Page
    shareArticle: "Bu makaleyi paylaş",
    relatedArticles: "İlgili Makaleler",
  },
  ar: {
    // Keep the basic translations for Arabic, but we'll focus on Turkish and English as requested
    home: "الرئيسية",
    about: "من نحن",
    services: "الخدمات",
    blog: "المدونة",
    contact: "اتصل بنا",
    getConsultation: "احصل على استشارة",
    english: "الإنجليزية",
    turkish: "التركية",
    arabic: "العربية",
    quickLinks: "روابط سريعة",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Replace the LanguageProvider function with this updated version
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr") // Default to Turkish
  const [key, setKey] = useState(0) // Add a key to force re-render

  // Load saved language on initial mount
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && ["en", "tr", "ar"].includes(savedLanguage)) {
        console.log("Loading saved language:", savedLanguage)
        setLanguage(savedLanguage)
      }
    } catch (error) {
      console.error("Error loading language from localStorage:", error)
    }
  }, [])

  // Update document and localStorage when language changes
  useEffect(() => {
    try {
      localStorage.setItem("language", language)
      console.log("Language set to:", language)

      // Set document properties
      document.documentElement.lang = language
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr"

      // Force re-render of all components
      setKey((prevKey) => prevKey + 1)
    } catch (error) {
      console.error("Error setting language in localStorage:", error)
    }
  }, [language])

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en?.[key] || key
  }

  // Create a wrapper function for setLanguage that includes logging
  const handleSetLanguage = (lang: Language) => {
    console.log("Language change requested:", lang)
    if (lang !== language) {
      setLanguage(lang)
    }
  }

  const contextValue = {
    language,
    setLanguage: handleSetLanguage,
    t,
  }

  return (
    <LanguageContext.Provider key={key} value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
