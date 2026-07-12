/* ============================================================
   ELEXONS.CH — BILINGUAL TRANSLATION SYSTEM (DE / EN)
   lang.js | Version 1.0
   ============================================================ */

(function () {
  'use strict';

  /* ── All Translations ── */
  const T = {
    de: {
      /* NAV */
      nav_home:        'Startseite',
      nav_services:    'Leistungen',
      nav_renovation:  'Sanierung',
      nav_umbau:       'Umbau',
      nav_smarthome:   'Smart Home',
      nav_projects:    'Projekte',
      nav_about:       'Über uns',
      nav_contact:     'Kontakt',
      btn_cta:         'Kostenlose Beratung',
      btn_cta2:        'Beratung anfragen',

      /* DROPDOWN */
      drop_sanierung:  'Sanierung',
      drop_umbau:      'Umbau & Innenausbau',
      drop_bad:        'Badsanierung',
      drop_kueche:     'Küchensanierung',
      drop_all:        'Alle Leistungen ansehen →',

      /* MOBILE NAV */
      mob_home:        'Startseite',
      mob_services:    'Leistungen',
      mob_renovation:  'Sanierung Zürich',
      mob_umbau:       'Umbau Zürich',
      mob_bad:         'Badsanierung',
      mob_kueche:      'Küchensanierung',
      mob_smarthome:   'Smart Home',
      mob_projects:    'Projekte',
      mob_about:       'Über uns',
      mob_contact:     'Kontakt',

      /* HERO */
      hero_label:      'Zürich · Schweiz',
      hero_title:      'Renovation &amp; <em>Smart Home</em><br>in Zürich',
      hero_sub:        'Hochwertige Sanierung, Umbau, Innenausbau und intelligente Gebäudetechnik für Wohnungen, Häuser und Gewerbeflächen in Zürich.',
      hero_text:       'Elexons verbindet Schweizer Präzision, modernes Design und zuverlässige Projektkoordination – von der ersten Idee bis zur schlüsselfertigen Übergabe.',
      hero_btn1:       'Kostenlose Beratung',
      hero_btn2:       'Unsere Leistungen',
      hero_stat1:      'Abgeschlossene Projekte',
      hero_stat2:      'Termintreue',
      hero_stat3:      'Versteckte Kosten',
      hero_stat4:      'Schweizer Qualitätsstandard',
      hero_scroll:     'Scrollen',

      /* SERVICES SECTION */
      sec_services_label: 'Unsere Leistungen',
      sec_services_title: 'Was wir für Sie leisten',
      sec_services_sub:   'Von der umfassenden Sanierung bis zur intelligenten Gebäudesteuerung – Elexons begleitet Ihr Projekt mit Fachkompetenz und Sorgfalt.',

      card1_title: 'Wohnungssanierung',
      card1_text:  'Komplette Renovierung Ihrer Wohnung – von der Planung bis zur schlüsselfertigen Übergabe. Modern, funktional und wertsteigernd.',
      card_link:   'Mehr erfahren',
      card1_link:  'Mehr erfahren',

      card2_title: 'Umbau &amp; Innenausbau',
      card2_text:  'Grundrissänderungen, Raumoptimierungen und hochwertiger Innenausbau für Wohnungen, Häuser und Gewerbeflächen.',
      card2_link:  'Mehr erfahren',

      card3_title: 'Badsanierung',
      card3_text:  'Moderne Badezimmer nach Ihren Wünschen – inklusive Platten, Sanitär, Beleuchtung und vollständiger Koordination aller Gewerke.',
      card3_link:  'Mehr erfahren',

      card4_title: 'Smart Home Integration',
      card4_text:  'Intelligente Steuerung von Licht, Heizung, Beschattung, Sicherheit und Audio – nahtlos in Ihr Renovationsprojekt integriert.',
      card4_link:  'Mehr erfahren',

      card5_title: 'Küchensanierung',
      card5_text:  'Funktionale und elegante Küchen – von der Planung über Arbeitsplatten und Beleuchtung bis zur vollständigen Montage.',
      card5_link:  'Mehr erfahren',

      card6_title: 'Projektkoordination',
      card6_text:  'Ein Ansprechpartner für alle Gewerke. Wir koordinieren Handwerker, Lieferanten und Behörden – termingerecht und transparent.',
      card6_link:  'Mehr erfahren',

      /* STATS BANNER */
      stat_projects:    'Abgeschlossene Projekte',
      stat_satisfaction:'Kundenzufriedenheit',
      stat_costs:       'Versteckte Kosten',
      stat_experience:  'Jahre Erfahrung',

      /* WHY ELEXONS */
      why_label:  'Warum Elexons',
      why_title:  'Schweizer Qualität. Persönliche Betreuung.',
      why_lead:   'Wir sind ein Zürcher Unternehmen mit klarer Spezialisierung: hochwertige Renovation, durchdachter Umbau und modernste Smart Home Technologie – ausgeführt mit Schweizer Präzision.',
      why_text:   'Jedes Projekt wird von einem erfahrenen Koordinator betreut. Sie haben immer einen direkten Ansprechpartner, klare Kostentransparenz und pünktliche Ausführung.',
      why_p1:     'Transparent &amp; fair',
      why_p1t:    'Detaillierte Offerten, keine Überraschungskosten, klare Kommunikation.',
      why_p2:     'Termintreu',
      why_p2t:    'Verbindliche Zeitpläne, laufende Updates und pünktliche Fertigstellung.',
      why_p3:     'Höchste Qualität',
      why_p3t:    'Geprüfte Handwerker, hochwertige Materialien und sorgfältige Ausführung.',
      why_p4:     'Persönliche Betreuung',
      why_p4t:    'Direkter Ansprechpartner – von der ersten Beratung bis nach der Übergabe.',
      why_btn:    'Mehr über uns',

      /* PROCESS */
      proc_label: 'Unser Prozess',
      proc_title: 'Von der Idee bis zur Übergabe',
      proc_sub:   'Strukturiert, transparent und termintreu – so läuft ein Projekt mit Elexons ab.',
      step1_title:'1. Kostenlose Erstberatung',
      step1_text: 'Wir besprechen Ihre Wünsche, Anforderungen und den Rahmen Ihres Projekts. Persönlich, unverbindlich und ohne versteckte Kosten.',
      step2_title:'2. Analyse &amp; Planung',
      step2_text: 'Wir begutachten das Objekt, erstellen eine detaillierte Bedarfsanalyse und erarbeiten ein massgeschneidertes Konzept für Ihr Projekt.',
      step3_title:'3. Offerte &amp; Vereinbarung',
      step3_text: 'Sie erhalten eine transparente, detaillierte Offerte. Auf Wunsch erklären wir jeden Kostenpunkt. Keine Überraschungen, keine versteckten Posten.',
      step4_title:'4. Ausführung &amp; Koordination',
      step4_text: 'Wir koordinieren alle Handwerker, überwachen Qualität und Fortschritt und halten Sie laufend informiert.',
      step5_title:'5. Abnahme &amp; Übergabe',
      step5_text: 'Gemeinsame Abnahme, Behebung allfälliger Mängel, vollständige Dokumentation und schlüsselfertige Übergabe an Sie.',

      /* PROJECTS TEASER */
      proj_label:      'Referenzen',
      proj_title:      'Ausgewählte Projekte',
      proj_intro_sub:  'Einblicke in realisierte Sanierungen, Umbauten und Smart Home Installationen von Elexons in Zürich und Umgebung.',
      proj_all:        'Alle Projekte',
      proj_more:       'Mehr erfahren',

      /* SMART HOME TEASER */
      sh_badge:    'Certified Loxone Partner',
      sh_title:    'Ihr Zuhause.<br/><em style="font-style:italic;color:#B89A5C;">Intelligent vernetzt.</em>',
      sh_sub:      'Licht, Heizung, Beschattung, Sicherheit – nahtlos gesteuert via App. Elexons plant und installiert Loxone Smart Home direkt während Ihrer Sanierung.',
      sh_feat1:    'Lichtsteuerung',
      sh_feat1t:   'Stimmungen, Szenen und automatische Abläufe – angepasst an Tageszeit und Präsenz.',
      sh_feat2:    'Heizung &amp; Klima',
      sh_feat2t:   'Raumgenaue Temperaturregelung mit Wetterprognose und Energiesparfunktion.',
      sh_feat3:    'Sicherheit &amp; Zugang',
      sh_feat3t:   'Türkamera, Alarm, Zutrittskontrolle – alles remote steuerbar via Loxone App.',
      sh_feat4:    'Beschattung',
      sh_feat4t:   'Automatische Storen basierend auf Sonne, Wind und Zeit – komfortabel und energieeffizient.',
      sh_feat5:    'Multiroom Audio',
      sh_feat5t:   'Musik in jedem Raum – per Schalter, App oder Sprache gesteuert.',
      sh_feat6:    'Energiemanagement',
      sh_feat6t:   'PV-Integration, Echtzeit-Monitoring und smarte Laststeuerung für maximale Effizienz.',
      sh_btn:      'Smart Home entdecken →',

      /* CTA */
      cta_label: 'Jetzt starten',
      cta_title: 'Bereit für Ihr Renovationsprojekt?',
      cta_sub:   'Kontaktieren Sie uns für eine kostenlose Erstberatung – unverbindlich, persönlich und ohne versteckte Kosten.',
      cta_btn1:  'Kostenlose Beratung anfragen',
      cta_btn2:  'Alle Leistungen ansehen',


      /* REFERENCE CARDS */
      ref_card1_tag:   'Sanierung',
      ref_card1_title: 'Komplettsanierung 4.5-Zimmer-Wohnung',
      ref_card1_text:  'Vollständige Renovation einer Altbauwohnung inkl. Bad, Küche, Böden, Malerarbeiten und Smart Home Integration.',
      ref_card1_loc:   'Zürich City',
      ref_card2_tag:   'Badsanierung',
      ref_card2_title: 'Luxus-Badsanierung mit freistehender Wanne',
      ref_card2_text:  'Hochwertiger Badumbau mit Naturstein, massgeschneiderten Möbeln, Regendusche und Beleuchtungskonzept.',
      ref_card2_loc:   'Küsnacht, Zürichsee',
      ref_card3_tag:   'Smart Home',
      ref_card3_title: 'Smart Home Penthouse – Loxone',
      ref_card3_text:  'Vollständige Smart Home Ausstattung mit Licht-, Heizungs-, Beschattungs- und Sicherheitssteuerung via App.',
      ref_card3_loc:   'Zürich, Seefeld',

      /* BUTTONS & LINKS */
      btn_mehr:       'Mehr erfahren',
      btn_anfrage:    'Anfrage stellen',
      btn_alle_proj:  'Alle Projekte',
      btn_maps:       'Google Maps öffnen →',
      btn_refs:       'Referenzprojekte ansehen',
      btn_alle_leist: 'Alle Leistungen',
      btn_beratung:   'Beratung anfragen',
      btn_kos_anfr:   'Kostenlose Beratung anfragen',

      /* FOOTER LINKS */
      fl_sanierung:   'Sanierung Zürich',
      fl_umbau:       'Umbau Zürich',
      fl_alle:        'Alle Leistungen',
      fl_daten:       'Datenschutz',
      fl_impress:     'Impressum',
      fl_copyright:   '© 2024 Elexons – Alle Rechte vorbehalten',

      /* FOOTER */
      footer_desc:    'Professionelle Sanierung, Umbau und Smart Home Integration in Zürich und Umgebung. Schweizer Qualität, transparente Preise, persönliche Betreuung.',
      footer_h1:      'Leistungen',
      footer_h2:      'Unternehmen',
      footer_h3:      'Kontakt',
      footer_copy:    '© 2024 Elexons – Alle Rechte vorbehalten',
      footer_tagline: 'Exzellenz in Sanierung &amp; Smart Home',
    },

    en: {
      /* NAV */
      nav_home:        'Home',
      nav_services:    'Services',
      nav_renovation:  'Renovation',
      nav_umbau:       'Remodelling',
      nav_smarthome:   'Smart Home',
      nav_projects:    'Projects',
      nav_about:       'About Us',
      nav_contact:     'Contact',
      btn_cta:         'Free Consultation',
      btn_cta2:        'Request Consultation',

      /* DROPDOWN */
      drop_sanierung:  'Renovation',
      drop_umbau:      'Remodelling & Interiors',
      drop_bad:        'Bathroom Renovation',
      drop_kueche:     'Kitchen Renovation',
      drop_all:        'View All Services →',

      /* MOBILE NAV */
      mob_home:        'Home',
      mob_services:    'Services',
      mob_renovation:  'Renovation Zürich',
      mob_umbau:       'Remodelling Zürich',
      mob_bad:         'Bathroom Renovation',
      mob_kueche:      'Kitchen Renovation',
      mob_smarthome:   'Smart Home',
      mob_projects:    'Projects',
      mob_about:       'About Us',
      mob_contact:     'Contact',

      /* HERO */
      hero_label:      'Zürich · Switzerland',
      hero_title:      'Renovation &amp; <em>Smart Home</em><br>in Zürich',
      hero_sub:        'Premium renovation, remodelling, interior fit-out and intelligent building technology for apartments, houses and commercial spaces in Zürich.',
      hero_text:       'Elexons combines Swiss precision, modern design and reliable project coordination – from the first idea to turnkey handover.',
      hero_btn1:       'Free Consultation',
      hero_btn2:       'Our Services',
      hero_stat1:      'Completed Projects',
      hero_stat2:      'On-time Delivery',
      hero_stat3:      'Hidden Costs',
      hero_stat4:      'Swiss Quality Standard',
      hero_scroll:     'Scroll',

      /* SERVICES SECTION */
      sec_services_label: 'Our Services',
      sec_services_title: 'What We Do For You',
      sec_services_sub:   'From comprehensive renovation to intelligent building automation – Elexons guides your project with expertise and care.',

      card1_title: 'Apartment Renovation',
      card1_text:  'Complete renovation of your apartment – from planning to turnkey handover. Modern, functional and value-enhancing.',
      card_link:   'Learn more',
      card1_link:  'Learn more',

      card2_title: 'Remodelling &amp; Interiors',
      card2_text:  'Floor plan changes, space optimization and high-quality interior fit-out for apartments, houses and commercial spaces.',
      card2_link:  'Learn more',

      card3_title: 'Bathroom Renovation',
      card3_text:  'Modern bathrooms to your specifications – including tiles, plumbing, lighting and full coordination of all trades.',
      card3_link:  'Learn more',

      card4_title: 'Smart Home Integration',
      card4_text:  'Intelligent control of lighting, heating, blinds, security and audio – seamlessly integrated into your renovation project.',
      card4_link:  'Learn more',

      card5_title: 'Kitchen Renovation',
      card5_text:  'Functional and elegant kitchens – from planning through worktops and lighting to complete installation.',
      card5_link:  'Learn more',

      card6_title: 'Project Coordination',
      card6_text:  'One point of contact for all trades. We coordinate craftsmen, suppliers and authorities – on schedule and transparently.',
      card6_link:  'Learn more',

      /* STATS BANNER */
      stat_projects:    'Completed Projects',
      stat_satisfaction:'Client Satisfaction',
      stat_costs:       'Hidden Costs',
      stat_experience:  'Years of Experience',

      /* WHY ELEXONS */
      why_label:  'Why Elexons',
      why_title:  'Swiss Quality. Personal Service.',
      why_lead:   'We are a Zürich-based company with a clear specialisation: premium renovation, thoughtful remodelling and state-of-the-art Smart Home technology – delivered with Swiss precision.',
      why_text:   'Every project is supervised by an experienced coordinator. You always have a direct contact, full cost transparency and on-time delivery.',
      why_p1:     'Transparent &amp; Fair',
      why_p1t:    'Detailed quotes, no surprise costs, clear communication.',
      why_p2:     'On Schedule',
      why_p2t:    'Binding timelines, ongoing updates and punctual completion.',
      why_p3:     'Highest Quality',
      why_p3t:    'Vetted tradespeople, premium materials and meticulous execution.',
      why_p4:     'Personal Service',
      why_p4t:    'Direct contact person – from the first consultation through to handover.',
      why_btn:    'About Us',

      /* PROCESS */
      proc_label: 'Our Process',
      proc_title: 'From Idea to Handover',
      proc_sub:   'Structured, transparent and on schedule – this is how a project with Elexons works.',
      step1_title:'1. Free Initial Consultation',
      step1_text: 'We discuss your wishes, requirements and the scope of your project. Personal, non-binding and at no cost.',
      step2_title:'2. Analysis &amp; Planning',
      step2_text: 'We inspect the property, create a detailed needs analysis and develop a bespoke concept for your project.',
      step3_title:'3. Quote &amp; Agreement',
      step3_text: 'You receive a transparent, detailed quote. We explain every cost item on request. No surprises, no hidden charges.',
      step4_title:'4. Execution &amp; Coordination',
      step4_text: 'We coordinate all tradespeople, monitor quality and progress, and keep you informed throughout.',
      step5_title:'5. Inspection &amp; Handover',
      step5_text: 'Joint inspection, resolution of any defects, full documentation and turnkey handover to you.',

      /* PROJECTS TEASER */
      proj_label:      'References',
      proj_title:      'Selected Projects',
      proj_intro_sub:  'A look at completed renovations, remodelling projects and Smart Home installations by Elexons in Zürich and the surrounding area.',
      proj_all:        'All Projects',
      proj_more:       'Learn more',

      /* SMART HOME TEASER */
      sh_badge:    'Certified Loxone Partner',
      sh_title:    'Your Home.<br/><em style="font-style:italic;color:#B89A5C;">Intelligently Connected.</em>',
      sh_sub:      'Lighting, heating, blinds, security – seamlessly controlled via app. Elexons plans and installs Loxone Smart Home systems directly during your renovation.',
      sh_feat1:    'Lighting Control',
      sh_feat1t:   'Moods, scenes and automated sequences – adapted to time of day and occupancy.',
      sh_feat2:    'Heating &amp; Climate',
      sh_feat2t:   'Room-by-room temperature control with weather forecast integration and energy-saving modes.',
      sh_feat3:    'Security &amp; Access',
      sh_feat3t:   'Door camera, alarm, access control – all remotely controllable via the Loxone app.',
      sh_feat4:    'Shading',
      sh_feat4t:   'Automated blinds based on sunlight, wind and time – comfortable and energy-efficient.',
      sh_feat5:    'Multiroom Audio',
      sh_feat5t:   'Music in every room – controlled by switch, app or voice.',
      sh_feat6:    'Energy Management',
      sh_feat6t:   'PV integration, real-time monitoring and smart load control for maximum efficiency.',
      sh_btn:      'Discover Smart Home →',

      /* CTA */
      cta_label: 'Get Started',
      cta_title: 'Ready for Your Renovation Project?',
      cta_sub:   'Contact us for a free initial consultation – non-binding, personal and with no hidden costs.',
      cta_btn1:  'Request Free Consultation',
      cta_btn2:  'View All Services',


      /* REFERENCE CARDS */
      ref_card1_tag:   'Renovation',
      ref_card1_title: 'Full 4.5-Room Apartment Renovation',
      ref_card1_text:  'Complete renovation of an old apartment including bathroom, kitchen, floors, paintwork and Smart Home integration.',
      ref_card1_loc:   'Zürich City',
      ref_card2_tag:   'Bathroom',
      ref_card2_title: 'Luxury Bathroom with Freestanding Bath',
      ref_card2_text:  'Premium bathroom remodel with natural stone, custom furniture, rain shower and lighting concept.',
      ref_card2_loc:   'Küsnacht, Lake Zürich',
      ref_card3_tag:   'Smart Home',
      ref_card3_title: 'Smart Home Penthouse – Loxone',
      ref_card3_text:  'Full Smart Home installation with lighting, heating, shading and security control via app.',
      ref_card3_loc:   'Zürich, Seefeld',

      /* BUTTONS & LINKS */
      btn_mehr:       'Mehr erfahren',
      btn_anfrage:    'Anfrage stellen',
      btn_alle_proj:  'Alle Projekte',
      btn_maps:       'Google Maps öffnen →',
      btn_refs:       'Referenzprojekte ansehen',
      btn_alle_leist: 'Alle Leistungen',
      btn_beratung:   'Beratung anfragen',
      btn_kos_anfr:   'Kostenlose Beratung anfragen',

      /* FOOTER LINKS */
      fl_sanierung:   'Sanierung Zürich',
      fl_umbau:       'Umbau Zürich',
      fl_alle:        'Alle Leistungen',
      fl_daten:       'Datenschutz',
      fl_impress:     'Impressum',
      fl_copyright:   '© 2024 Elexons – Alle Rechte vorbehalten',


      /* BUTTONS & LINKS */
      btn_mehr:       'Learn more',
      btn_anfrage:    'Submit enquiry',
      btn_alle_proj:  'All Projects',
      btn_maps:       'Open Google Maps →',
      btn_refs:       'View Reference Projects',
      btn_alle_leist: 'All Services',
      btn_beratung:   'Request Consultation',
      btn_kos_anfr:   'Request Free Consultation',

      /* FOOTER LINKS */
      fl_sanierung:   'Renovation Zürich',
      fl_umbau:       'Remodelling Zürich',
      fl_alle:        'All Services',
      fl_daten:       'Privacy Policy',
      fl_impress:     'Legal Notice',
      fl_copyright:   '© 2024 Elexons – All rights reserved',

      /* FOOTER */
      footer_desc:    'Professional renovation, remodelling and Smart Home integration in Zürich and the surrounding area. Swiss quality, transparent pricing, personal service.',
      footer_h1:      'Services',
      footer_h2:      'Company',
      footer_h3:      'Contact',
      footer_copy:    '© 2024 Elexons – All rights reserved',
      footer_tagline: 'Excellence in Renovation &amp; Smart Home',
    }
  };

  /* ── Language Detection & Storage ── */
  function getLang() {
    try {
      const stored = sessionStorage.getItem('elexons_lang');
      if (stored === 'en' || stored === 'de') return stored;
    } catch(e) {}
    // Check URL param
    const params = new URLSearchParams(window.location.search);
    if (params.get('lang') === 'en') return 'en';
    return 'de';
  }

  function setLang(lang) {
    try { sessionStorage.setItem('elexons_lang', lang); } catch(e) {}
    applyLang(lang);
  }
  window.setLang = setLang;

  function applyLang(lang) {
    const dict = T[lang];
    if (!dict) return;

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Apply all data-i18n text elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    // Apply all data-i18n-html elements (innerHTML, allows <em> etc.)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    // Apply placeholder translations
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) el.placeholder = dict[key];
    });

    // Apply per-page service hero translations (data-i18n-html-de / data-i18n-html-en)
    document.querySelectorAll('[data-i18n-html-' + lang + ']').forEach(el => {
      el.innerHTML = el.getAttribute('data-i18n-html-' + lang);
    });
    // Apply per-page inline translations (data-i18n-de / data-i18n-en)
    // Safe: if element has child elements (e.g. FAQ button with icon),
    // only update the first text node so child elements are preserved.
    document.querySelectorAll('[data-i18n-' + lang + ']').forEach(el => {
      if (!el.hasAttribute('data-i18n') && !el.hasAttribute('data-i18n-html')) {
        const newText = el.getAttribute('data-i18n-' + lang);
        if (el.children.length > 0) {
          // Has child elements — only replace first text node
          for (const node of el.childNodes) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
              node.textContent = newText;
              break;
            }
          }
        } else {
          el.textContent = newText;
        }
      }
    });

    // Update lang switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      btn.classList.toggle('active', btnLang === lang);
    });

    // Update page title if defined
    const titleKey = document.documentElement.getAttribute('data-title-' + lang);
    if (titleKey) document.title = titleKey;
  }

  /* ── Init on DOM Ready ── */
  document.addEventListener('DOMContentLoaded', function () {
    applyLang(getLang());
    /* Event-listener approach — more reliable than inline onclick */
    document.querySelectorAll('.lang-btn[data-lang]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        setLang(this.getAttribute('data-lang'));
      });
    });
  });
  /* Fallback: also expose on window for any inline onclick still present */
  window.setLang = setLang;

})();
