import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react'

type Locale = 'en' | 'fr' | 'ar'

const locales: Locale[] = ['en', 'fr', 'ar']
const contactEmails = [
  'contact@joinnexa.ma',
  'support@joinnexa.ma',
  'partnerships@joinnexa.ma',
]

const copy = {
  en: {
    brand: 'Nexa Go',
    nav: {
      why: 'Why',
      services: 'Services',
      how: 'How it works',
      trust: 'Trust',
      drivers: 'Drivers',
      contact: 'Contact',
      join: 'Join the Waitlist',
      language: 'Language',
      switchToLight: 'Switch to light mode',
      switchToDark: 'Switch to dark mode',
      light: 'Light',
      dark: 'Dark',
    },
    hero: {
      eyebrow: 'Rides, delivery, and local commerce',
      title: 'Move through Morocco with one trusted app.',
      text: 'Nexa Go brings reliable rides, everyday delivery, merchant orders, and driver opportunities into a clean experience built for local cities.',
      primary: 'Join the launch list',
      secondary: 'Explore services',
      statsLabel: 'Nexa Go highlights',
    },
    why: {
      eyebrow: 'Why Nexa Go',
      title: 'A local mobility platform built for real city routines.',
      cards: [
        {
          title: 'Morocco-first by design',
          text: 'Flows, routing, and phone onboarding are adapted to local users and city habits.',
        },
        {
          title: 'Rides and delivery in one app',
          text: 'Move people, packages, and daily orders through one consistent interface.',
        },
        {
          title: 'Clear pricing before confirmation',
          text: 'Users can review fare context and service type before accepting a request.',
        },
        {
          title: 'Connected to the Nexa ecosystem',
          text: 'Nexa Go is designed to work alongside the wider Nexa products over time.',
        },
      ],
    },
    stats: [
      ['24/7', 'city movement'],
      ['1 app', 'rides and delivery'],
      ['MAD', 'local-first pricing'],
    ],
    phone: {
      label: 'Nexa Go mobile app preview',
      currentRide: 'Current ride',
      route: 'Maarif to Casa Port',
      eta: '7 min away',
      services: ['Ride', 'Moto', 'Food', 'Courier'],
    },
    services: {
      eyebrow: 'What you can do',
      title: 'One platform for everyday movement and local commerce.',
      cards: [
        {
          title: 'City rides',
          text: 'Book reliable trips across neighborhoods with clear pre-trip estimates.',
        },
        {
          title: 'Moto rides',
          text: 'Use fast two-wheel mobility for dense city traffic and short-distance transfers.',
        },
        {
          title: 'Courier delivery',
          text: 'Send documents and packages with live status from pickup to dropoff.',
        },
        {
          title: 'Food and merchant orders',
          text: 'Place local orders and track fulfillment in the same app experience.',
        },
        {
          title: 'Driver and courier workspace',
          text: 'Accept requests, manage trip flow, and track completed operations clearly.',
        },
        {
          title: 'Business and merchant visibility',
          text: 'Enable merchants to appear where nearby users are already searching and ordering.',
        },
      ],
    },
    how: {
      eyebrow: 'How it works',
      title: 'Simple steps for each role on the platform.',
      groups: [
        {
          title: 'Rider flow',
          steps: [
            'Set pickup and destination, then review your estimate.',
            'Confirm the request and follow driver arrival in real time.',
            'Complete the ride with support available if needed.',
          ],
        },
        {
          title: 'Delivery flow',
          steps: [
            'Choose pickup and dropoff with item details.',
            'Confirm delivery cost and dispatch instantly.',
            'Track courier status until completion.',
          ],
        },
        {
          title: 'Driver and courier flow',
          steps: [
            'Finish onboarding and activate availability.',
            'Receive relevant requests and accept suitable ones.',
            'View completed work and earnings history in one place.',
          ],
        },
      ],
    },
    trust: {
      eyebrow: 'Trust and safety',
      title: 'Built with reliability, transparency, and operational control.',
      cards: [
        {
          title: 'Verified onboarding',
          text: 'Driver and courier onboarding is designed to support identity and document checks.',
        },
        {
          title: 'Transparent trip context',
          text: 'Core trip details and expected costs are surfaced before confirmation.',
        },
        {
          title: 'Support and traceability',
          text: 'Trip and request history can be reviewed for user support and platform operations.',
        },
      ],
    },
    drivers: {
      eyebrow: 'For drivers and couriers',
      title: 'Earn with clear trips and local demand.',
      text: 'Nexa Go gives drivers and couriers a focused workspace for ride requests, delivery tasks, document onboarding, and transparent trip history.',
      steps: [
        'Choose a ride, delivery, or merchant order.',
        'Confirm pickup, dropoff, and price before dispatch.',
        'Track every trip live with support when you need it.',
      ],
    },
    cities: {
      eyebrow: 'City rollout',
      title: 'Launching city by city with local operations.',
      items: [
        { city: 'Casablanca', status: 'Initial launch focus' },
        { city: 'Rabat', status: 'Planned next market' },
        { city: 'Marrakech', status: 'Expansion candidate' },
      ],
    },
    cta: {
      eyebrow: 'Launching soon',
      title: 'Be first to ride, deliver, or partner with Nexa Go.',
      text: 'Join the launch list and we will contact you when Nexa Go opens in your city.',
      segments: ['Rider', 'Driver / Courier', 'Merchant / Partner'],
      email: 'Email address',
      submit: 'Notify me',
    },
    contactLabel: 'Contact',
    footer: 'Part of the Nexa ecosystem.',
  },
  fr: {
    brand: 'Nexa Go',
    nav: {
      why: 'Pourquoi',
      services: 'Services',
      how: 'Fonctionnement',
      trust: 'Confiance',
      drivers: 'Chauffeurs',
      contact: 'Contact',
      join: "Rejoindre l'attente",
      language: 'Langue',
      switchToLight: 'Passer au mode clair',
      switchToDark: 'Passer au mode sombre',
      light: 'Clair',
      dark: 'Sombre',
    },
    hero: {
      eyebrow: 'Courses, livraison et commerce local',
      title: 'Déplacez-vous au Maroc avec une seule app de confiance.',
      text: 'Nexa Go réunit courses fiables, livraison quotidienne, commandes commerçants et opportunités chauffeurs dans une expérience claire, pensée pour les villes locales.',
      primary: 'Rejoindre la liste',
      secondary: 'Découvrir les services',
      statsLabel: 'Points forts de Nexa Go',
    },
    why: {
      eyebrow: 'Pourquoi Nexa Go',
      title: 'Une plateforme de mobilité locale pensée pour les vrais usages urbains.',
      cards: [
        {
          title: 'Conçu pour le Maroc',
          text: 'Parcours, routage et onboarding téléphone adaptés aux utilisateurs et villes marocaines.',
        },
        {
          title: 'Courses et livraison dans une seule app',
          text: 'Déplacez personnes, colis et commandes quotidiennes avec une expérience cohérente.',
        },
        {
          title: 'Prix clairs avant validation',
          text: 'Les utilisateurs visualisent le contexte tarifaire avant de confirmer la demande.',
        },
        {
          title: 'Connecté à l’écosystème Nexa',
          text: 'Nexa Go est conçu pour évoluer avec les autres produits Nexa dans le temps.',
        },
      ],
    },
    stats: [
      ['24/7', 'mobilité urbaine'],
      ['1 app', 'courses et livraison'],
      ['MAD', 'prix adaptés au Maroc'],
    ],
    phone: {
      label: "Aperçu de l'application Nexa Go",
      currentRide: 'Course en cours',
      route: 'Maarif vers Casa Port',
      eta: 'à 7 min',
      services: ['Course', 'Moto', 'Repas', 'Colis'],
    },
    services: {
      eyebrow: 'Ce que vous pouvez faire',
      title: 'Une plateforme pour la mobilité quotidienne et le commerce local.',
      cards: [
        {
          title: 'Courses en ville',
          text: 'Réservez des trajets fiables entre quartiers avec estimation claire avant départ.',
        },
        {
          title: 'Courses moto',
          text: 'Utilisez une mobilité deux-roues rapide pour le trafic dense et les trajets courts.',
        },
        {
          title: 'Livraison coursier',
          text: 'Envoyez documents et colis avec suivi de bout en bout.',
        },
        {
          title: 'Commandes food et commerçants',
          text: 'Passez des commandes locales et suivez leur exécution dans la même app.',
        },
        {
          title: 'Espace chauffeur et coursier',
          text: 'Acceptez des demandes, gérez les trajets et suivez les opérations terminées.',
        },
        {
          title: 'Visibilité business et commerçants',
          text: 'Aidez les commerces à être visibles là où les utilisateurs recherchent déjà.',
        },
      ],
    },
    how: {
      eyebrow: 'Fonctionnement',
      title: 'Des étapes simples pour chaque rôle.',
      groups: [
        {
          title: 'Parcours passager',
          steps: [
            'Définissez départ et destination puis consultez l’estimation.',
            'Confirmez la demande et suivez l’arrivée du chauffeur en direct.',
            'Terminez la course avec support disponible si nécessaire.',
          ],
        },
        {
          title: 'Parcours livraison',
          steps: [
            'Choisissez pickup et dropoff avec les détails du colis.',
            'Validez le coût puis lancez la course immédiatement.',
            'Suivez l’état du coursier jusqu’à la livraison.',
          ],
        },
        {
          title: 'Parcours chauffeur et coursier',
          steps: [
            'Finalisez l’onboarding puis activez votre disponibilité.',
            'Recevez des demandes pertinentes et acceptez celles adaptées.',
            'Consultez l’historique des courses et revenus.',
          ],
        },
      ],
    },
    trust: {
      eyebrow: 'Confiance et sécurité',
      title: 'Conçu avec fiabilité, transparence et maîtrise opérationnelle.',
      cards: [
        {
          title: 'Onboarding vérifié',
          text: 'Le parcours chauffeur et coursier prévoit des contrôles d’identité et documents.',
        },
        {
          title: 'Contexte trajet transparent',
          text: 'Les informations clés et coûts attendus sont visibles avant validation.',
        },
        {
          title: 'Support et traçabilité',
          text: 'L’historique des demandes facilite le support utilisateur et les opérations.',
        },
      ],
    },
    drivers: {
      eyebrow: 'Pour chauffeurs et coursiers',
      title: 'Gagnez avec des trajets clairs et une demande locale.',
      text: 'Nexa Go donne aux chauffeurs et coursiers un espace simple pour les demandes, les livraisons, l’onboarding documents et l’historique transparent.',
      steps: [
        'Choisissez une course, une livraison ou une commande commerçant.',
        'Confirmez le départ, l’arrivée et le prix avant l’envoi.',
        'Suivez chaque trajet en direct avec du support si nécessaire.',
      ],
    },
    cities: {
      eyebrow: 'Déploiement villes',
      title: 'Lancement progressif avec opérations locales.',
      items: [
        { city: 'Casablanca', status: 'Ville de lancement prioritaire' },
        { city: 'Rabat', status: 'Marché prévu ensuite' },
        { city: 'Marrakech', status: 'Ville candidate à l’expansion' },
      ],
    },
    cta: {
      eyebrow: 'Lancement prochain',
      title: 'Soyez parmi les premiers à rouler, livrer ou devenir partenaire.',
      text: 'Rejoignez la liste de lancement et nous vous contacterons quand Nexa Go ouvrira dans votre ville.',
      segments: ['Passager', 'Chauffeur / Coursier', 'Commerçant / Partenaire'],
      email: 'Adresse e-mail',
      submit: 'Me prévenir',
    },
    contactLabel: 'Contact',
    footer: 'Une partie de l’écosystème Nexa.',
  },
  ar: {
    brand: 'Nexa Go',
    nav: {
      why: 'لماذا',
      services: 'الخدمات',
      how: 'طريقة العمل',
      trust: 'الثقة',
      drivers: 'السائقون',
      contact: 'تواصل',
      join: 'انضم إلى القائمة',
      language: 'اللغة',
      switchToLight: 'التبديل إلى الوضع الفاتح',
      switchToDark: 'التبديل إلى الوضع الداكن',
      light: 'فاتح',
      dark: 'داكن',
    },
    hero: {
      eyebrow: 'تنقل، توصيل، وتجارة محلية',
      title: 'تنقل في المغرب بتطبيق واحد موثوق.',
      text: 'يجمع Nexa Go بين الرحلات الموثوقة، التوصيل اليومي، طلبات المتاجر، وفرص السائقين في تجربة بسيطة مصممة للمدن المغربية.',
      primary: 'انضم إلى قائمة الإطلاق',
      secondary: 'اكتشف الخدمات',
      statsLabel: 'مميزات Nexa Go',
    },
    why: {
      eyebrow: 'لماذا Nexa Go',
      title: 'منصة تنقل محلية مصممة لواقع المدن اليومي.',
      cards: [
        {
          title: 'مصمم للمغرب أولاً',
          text: 'تم تكييف التدفقات والمسارات وبدء الاستخدام مع سلوك المستخدم المحلي.',
        },
        {
          title: 'الرحلات والتوصيل في تطبيق واحد',
          text: 'نقل الأشخاص والطرود والطلبات اليومية عبر تجربة موحدة.',
        },
        {
          title: 'تسعير واضح قبل التأكيد',
          text: 'يراجع المستخدم تفاصيل التكلفة قبل اعتماد الطلب.',
        },
        {
          title: 'متصل بمنظومة Nexa',
          text: 'Nexa Go مصمم ليعمل مع باقي منتجات Nexa مع تطور المنصة.',
        },
      ],
    },
    stats: [
      ['24/7', 'تنقل داخل المدينة'],
      ['تطبيق واحد', 'رحلات وتوصيل'],
      ['MAD', 'أسعار محلية'],
    ],
    phone: {
      label: 'معاينة تطبيق Nexa Go',
      currentRide: 'الرحلة الحالية',
      route: 'المعاريف إلى كازا بور',
      eta: 'يبعد 7 دقائق',
      services: ['رحلة', 'موتو', 'طعام', 'طرود'],
    },
    services: {
      eyebrow: 'ماذا يمكنك أن تفعل',
      title: 'منصة واحدة للتنقل اليومي والتجارة المحلية.',
      cards: [
        {
          title: 'رحلات داخل المدينة',
          text: 'احجز رحلات موثوقة بين الأحياء مع تقدير واضح قبل الانطلاق.',
        },
        {
          title: 'رحلات موتو',
          text: 'تنقل سريع بدراجات الموتو للزحام والمسافات القصيرة.',
        },
        {
          title: 'توصيل الطرود',
          text: 'أرسل الوثائق والطرود مع تتبع مباشر من الاستلام حتى التسليم.',
        },
        {
          title: 'طلبات الطعام والمتاجر',
          text: 'اطلب من المتاجر المحلية وتابع التنفيذ في نفس التطبيق.',
        },
        {
          title: 'واجهة السائق والموزع',
          text: 'استقبل الطلبات، أدر الرحلات، وراجع العمليات المكتملة بوضوح.',
        },
        {
          title: 'ظهور أكبر للمتاجر',
          text: 'اجعل متجرك قريباً من المستخدمين الذين يبحثون ويطلبون بالفعل.',
        },
      ],
    },
    how: {
      eyebrow: 'طريقة العمل',
      title: 'خطوات بسيطة لكل فئة استخدام.',
      groups: [
        {
          title: 'رحلة الراكب',
          steps: [
            'حدد نقطة الانطلاق والوجهة وراجع التقدير.',
            'أكد الطلب وتابع وصول السائق مباشرة.',
            'أنهِ الرحلة مع توفر الدعم عند الحاجة.',
          ],
        },
        {
          title: 'رحلة التوصيل',
          steps: [
            'حدد نقطة الاستلام والتسليم مع تفاصيل الطلب.',
            'أكد التكلفة ثم أرسل الطلب فوراً.',
            'تابع حالة الموزع حتى الإتمام.',
          ],
        },
        {
          title: 'مسار السائق والموزع',
          steps: [
            'أكمل التسجيل وفعل حالة التوفر.',
            'استقبل الطلبات المناسبة واختر الأنسب لك.',
            'راجع سجل العمليات والأرباح في مكان واحد.',
          ],
        },
      ],
    },
    trust: {
      eyebrow: 'الثقة والسلامة',
      title: 'مبني على الاعتمادية والشفافية والانضباط التشغيلي.',
      cards: [
        {
          title: 'تسجيل موثق',
          text: 'تدفق تسجيل السائقين والموزعين يدعم التحقق من الهوية والوثائق.',
        },
        {
          title: 'وضوح تفاصيل الرحلة',
          text: 'عرض تفاصيل الرحلة والتكلفة المتوقعة قبل تأكيد الطلب.',
        },
        {
          title: 'دعم وتتبع عمليات',
          text: 'سجل الطلبات والرحلات يساعد فرق الدعم والتشغيل.',
        },
      ],
    },
    drivers: {
      eyebrow: 'للسائقين والموزعين',
      title: 'اربح من رحلات واضحة وطلب محلي.',
      text: 'يوفر Nexa Go للسائقين والموزعين مساحة عمل واضحة لطلبات الرحلات، مهام التوصيل، التسجيل بالوثائق، وسجل شفاف للعمليات.',
      steps: [
        'اختر رحلة، توصيلاً، أو طلباً من متجر.',
        'أكد نقطة الانطلاق، الوجهة، والسعر قبل الإرسال.',
        'تتبع كل رحلة مباشرة مع الدعم عند الحاجة.',
      ],
    },
    cities: {
      eyebrow: 'خطة المدن',
      title: 'إطلاق تدريجي مدينة بعد مدينة.',
      items: [
        { city: 'الدار البيضاء', status: 'مدينة الإطلاق الأولى' },
        { city: 'الرباط', status: 'السوق التالية في الخطة' },
        { city: 'مراكش', status: 'مرشحة للتوسع' },
      ],
    },
    cta: {
      eyebrow: 'قريباً',
      title: 'كن من أوائل المستخدمين أو السائقين أو الشركاء.',
      text: 'انضم إلى قائمة الإطلاق وسنتواصل معك عندما يفتح Nexa Go في مدينتك.',
      segments: ['راكب', 'سائق / موزع', 'تاجر / شريك'],
      email: 'البريد الإلكتروني',
      submit: 'أعلمني',
    },
    contactLabel: 'التواصل',
    footer: 'جزء من منظومة Nexa.',
  },
}

const navItems = [
  { key: 'why', target: 'why', offset: -54 },
  { key: 'services', target: 'services', offset: -54 },
  { key: 'how', target: 'how', offset: -54 },
  { key: 'trust', target: 'trust', offset: -54 },
  { key: 'drivers', target: 'drivers', offset: -54 },
  { key: 'contact', target: 'waitlist', offset: 34 },
] as const

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    const savedTheme = window.localStorage.getItem('nexa-go-theme')
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'en'
    const savedLocale = window.localStorage.getItem('nexa-go-locale')
    return isLocale(savedLocale) ? savedLocale : 'en'
  })
  const t = copy[locale]
  const isRtl = locale === 'ar'

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('nexa-go-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
    window.localStorage.setItem('nexa-go-locale', locale)
  }, [isRtl, locale])

  useEffect(() => {
    const updateScrollState = () => {
      const progress = Math.min(window.scrollY / 260, 1)
      setScrollProgress(progress)
      setIsSmallScreen(window.innerWidth < 768)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      window.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  const navStyle = useMemo(() => {
    const glass = easeOut(scrollProgress, 0.1, 1)
    const shrink = easeOut(scrollProgress, 0.35, 1)
    const endWidth = isSmallScreen ? 85 : 75
    const width = 100 + (endWidth - 100) * shrink
    const radius = 2 + (16 - 2) * glass
    const padding = 16 * glass
    const translateY = 6 * glass
    const scale = 1 - 0.02 * glass

    return {
      '--nav-width': `${width}%`,
      '--nav-padding': `${padding}px`,
      '--nav-radius': `${radius}px`,
      '--nav-translate': `${translateY}px`,
      '--nav-scale': scale.toString(),
      '--nav-glass': glass.toString(),
    } as CSSProperties
  }, [isSmallScreen, scrollProgress])

  const handleScroll = (target: string, offset = -80) => {
    const element = document.getElementById(target)
    if (!element) return
    const top = element.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <main>
      <div className="nav-spacer" />
      <header className="site-header" style={navStyle}>
        <div className="nav-shell">
          <button
            className="brand"
            type="button"
            aria-label={`${t.brand} home`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img className="brand-logo" src="/assets/nexa-go.png" alt="" />
          </button>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => handleScroll(item.target, item.offset)}
              >
                {t.nav[item.key]}
              </button>
            ))}
            <LanguageDropdown
              locale={locale}
              onChange={setLocale}
              label={t.nav.language}
            />
            <button
              className="theme-toggle"
              type="button"
              aria-label={theme === 'dark' ? t.nav.switchToLight : t.nav.switchToDark}
              onClick={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
            >
              <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
            </button>
            <button
              className="nav-cta"
              type="button"
              onClick={() => handleScroll('waitlist', 34)}
            >
              {t.nav.join}
            </button>
          </nav>
          <LanguageDropdown
            locale={locale}
            onChange={setLocale}
            label={t.nav.language}
            className="mobile-language-select"
          />
          <button
            className="theme-toggle mobile-theme-toggle"
            type="button"
            aria-label={theme === 'dark' ? t.nav.switchToLight : t.nav.switchToDark}
            onClick={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
          >
            <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p className="hero-text">{t.hero.text}</p>
          <div className="hero-actions">
            <a className="button primary" href="#waitlist">
              {t.hero.primary}
            </a>
            <a className="button secondary" href="#services">
              {t.hero.secondary}
            </a>
          </div>
          <div className="stats" aria-label={t.hero.statsLabel}>
            {t.stats.map(([value, label]) => (
              <div className="stat" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="phone-card" aria-label={t.phone.label}>
          <div className="phone-top">
            <span />
            <img className="phone-corner-logo" src="/assets/nexa-go.png" alt="" />
          </div>
          <div className="route-card">
            <p>{t.phone.currentRide}</p>
            <h2>{t.phone.route}</h2>
            <div className="route-line">
              <span />
              <i />
              <span />
            </div>
            <div className="fare-row">
              <strong>34 MAD</strong>
              <em>{t.phone.eta}</em>
            </div>
          </div>
          <div className="service-grid">
            {t.phone.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-compact" id="why">
        <div className="section-heading">
          <p className="eyebrow">{t.why.eyebrow}</p>
          <h2>{t.why.title}</h2>
        </div>
        <div className="why-grid">
          {t.why.cards.map((card) => (
            <article className="why-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="services">
        <div className="section-heading">
          <p className="eyebrow">{t.services.eyebrow}</p>
          <h2>{t.services.title}</h2>
        </div>
        <div className="feature-grid">
          {t.services.cards.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-compact" id="how">
        <div className="section-heading">
          <p className="eyebrow">{t.how.eyebrow}</p>
          <h2>{t.how.title}</h2>
        </div>
        <div className="how-grid">
          {t.how.groups.map((group) => (
            <article className="how-card" key={group.title}>
              <h3>{group.title}</h3>
              <ol>
                {group.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-compact" id="trust">
        <div className="section-heading">
          <p className="eyebrow">{t.trust.eyebrow}</p>
          <h2>{t.trust.title}</h2>
        </div>
        <div className="trust-grid">
          {t.trust.cards.map((card) => (
            <article className="trust-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section" id="drivers">
        <div>
          <p className="eyebrow">{t.drivers.eyebrow}</p>
          <h2>{t.drivers.title}</h2>
          <p>{t.drivers.text}</p>
        </div>
        <div className="checklist">
          {t.drivers.steps.map((step) => (
            <div className="check-item" key={step}>
              <span>✓</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-compact cities" id="cities">
        <div className="section-heading">
          <p className="eyebrow">{t.cities.eyebrow}</p>
          <h2>{t.cities.title}</h2>
        </div>
        <div className="cities-grid">
          {t.cities.items.map((item) => (
            <article className="city-card" key={item.city}>
              <h3>{item.city}</h3>
              <p>{item.status}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta" id="waitlist">
        <p className="eyebrow">{t.cta.eyebrow}</p>
        <h2>{t.cta.title}</h2>
        <p>{t.cta.text}</p>
        <div className="cta-segments">
          {t.cta.segments.map((segment) => (
            <span key={segment}>{segment}</span>
          ))}
        </div>
        <form
          className="signup"
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <input type="email" placeholder={t.cta.email} aria-label={t.cta.email} />
          <button type="submit">{t.cta.submit}</button>
        </form>
      </section>

      <footer>
        <div className="footer-brand">
          <span>{t.brand}</span>
          <p>{t.footer}</p>
        </div>
        <div className="footer-contact">
          <strong>{t.contactLabel}</strong>
          <div className="footer-emails">
            {contactEmails.map((email) => (
              <a key={email} href={`mailto:${email}`}>
                {email}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <button
            key={item.target}
            type="button"
            onClick={() => handleScroll(item.target, item.offset)}
          >
            <span>{t.nav[item.key]}</span>
          </button>
        ))}
      </nav>
    </main>
  )
}

function isLocale(value: string | null): value is Locale {
  return value === 'en' || value === 'fr' || value === 'ar'
}

function LanguageDropdown({
  locale,
  onChange,
  label,
  className,
}: {
  locale: Locale
  onChange: (nextLocale: Locale) => void
  label: string
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div className={`language-dropdown ${className ?? ''}`.trim()} ref={containerRef}>
      <button
        type="button"
        className="language-trigger"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
      >
        <span>{locale.toUpperCase()}</span>
        <span className={`language-chevron ${isOpen ? 'open' : ''}`} aria-hidden="true">⌄</span>
      </button>
      {isOpen && (
        <div className="language-menu" role="listbox" aria-label={label}>
          {locales.map((item) => (
            <button
              key={item}
              type="button"
              className={`language-option ${item === locale ? 'active' : ''}`}
              role="option"
              aria-selected={item === locale}
              onClick={() => {
                onChange(item)
                setIsOpen(false)
              }}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function easeOut(value: number, start: number, end: number) {
  if (value <= start) return 0
  if (value >= end) return 1
  const normalized = (value - start) / (end - start)
  return 1 - Math.pow(1 - normalized, 2)
}
