export type Locale = "cs" | "en";

type Dict = Record<Locale, string>;
type DictArr = Record<Locale, string[]>;

export const copy = {
  nav: {
    home: { cs: "Úvod", en: "Home" } as Dict,
    events: { cs: "Další akce", en: "Other events" } as Dict,
    reserve: { cs: "Rezervovat", en: "Reserve" } as Dict,
  },
  hero: {
    eyebrow: { cs: "Ženy. Pohyb. Energie.", en: "Women. Movement. Energy." } as Dict,
    her: { cs: "HER", en: "HER" } as Dict,
    energy: { cs: "ENERGY", en: "ENERGY" } as Dict,
    leftLabel: { cs: "Smyslnost", en: "Sensuality" } as Dict,
    rightLabel: { cs: "Síla", en: "Strength" } as Dict,
    leftSub: { cs: "Kamasutra Yoga · Flow · Tanec", en: "Kamasutra Yoga · Flow · Dance" } as Dict,
    rightSub: { cs: "Box · Mindset · Komunita", en: "Boxing · Mindset · Community" } as Dict,
    scroll: { cs: "Posuň níž", en: "Scroll" } as Dict,
    primaryCta: { cs: "Rezervuj místo", en: "Book your spot" } as Dict,
    secondaryCta: { cs: "Co tě čeká", en: "What awaits" } as Dict,
  },
  manifesto: {
    title: { cs: "Manifest", en: "Manifesto" } as Dict,
    lines: {
      cs: [
        "HER ENERGY spojuje ženy skrze pohyb, emoce a energii.",
        "Není to jen o tréninku, ale o tom, jak se cítíš a s kým to sdílíš.",
        "Od boxu a flow po tanec, kreativitu a další aktivity.",
        "Budujeme komunitu žen, které chtějí víc.",
      ],
      en: [
        "HER ENERGY connects women through movement, emotion and energy.",
        "It’s not just about training — it’s about how you feel and who you share it with.",
        "From boxing and flow to dance, creativity and more.",
        "We’re building a community of women who want more.",
      ],
    } as DictArr,
    closer: {
      cs: "HER ENERGY events — silná komunita žen.",
      en: "HER ENERGY events — a strong community of women.",
    } as Dict,
  },
  duality: {
    title: { cs: "Dva opozity. Jedna žena.", en: "Two opposites. One woman." } as Dict,
    softHead: { cs: "Smyslnost", en: "Sensuality" } as Dict,
    softBody: {
      cs: "Něha, dech, ženskost. Kamasutra yoga otevírá tělo i hlavu — pomalé, hluboké, pravdivé vůči sobě.",
      en: "Tenderness, breath, femininity. Kamasutra yoga opens body and mind — slow, deep, true.",
    } as Dict,
    strongHead: { cs: "Síla", en: "Strength" } as Dict,
    strongBody: {
      cs: "Box jako rituál odhodlání. Údery, dech, pot. Najdeš v sobě bojovnici, o které jsi nevěděla.",
      en: "Boxing as a ritual of resolve. Punches, breath, sweat. You’ll find a fighter you didn’t know was in you.",
    } as Dict,
  },
  event: {
    badge: { cs: "Hlavní akce", en: "Main event" } as Dict,
    date: { cs: "9. května 2026", en: "May 9, 2026" } as Dict,
    title: { cs: "HER ENERGY Day", en: "HER ENERGY Day" } as Dict,
    subtitle: {
      cs: "Jeden den. Dva opozity. Komunita, která tě postaví na nohy.",
      en: "One day. Two opposites. A community that lifts you up.",
    } as Dict,
    schedule: { cs: "Program", en: "Schedule" } as Dict,
    items: {
      cs: [
        { time: "11:00", title: "Kamasutra Yoga", host: "Yuliya Arkhiyereyeva" },
        { time: "13:00", title: "Lunch & Coffee Break", host: "Michaela Adamová" },
        { time: "14:00", title: "Boxing Rave", host: "Kateřina Čavajdová" },
      ],
      en: [
        { time: "11:00", title: "Kamasutra Yoga", host: "Yuliya Arkhiyereyeva" },
        { time: "13:00", title: "Lunch & Coffee Break", host: "Michaela Adamová" },
        { time: "14:00", title: "Boxing Rave", host: "Kateřina Čavajdová" },
      ],
    } as Record<Locale, { time: string; title: string; host: string }[]>,
    place: { cs: "Titan Gym · Ďáblická 2 · Praha", en: "Titan Gym · Ďáblická 2 · Prague" } as Dict,
    transit: { cs: "Tramvajová zastávka: Sídliště Ďáblice", en: "Tram stop: Sídliště Ďáblice" } as Dict,
    price: { cs: "890 Kč", en: "890 Kč" } as Dict,
    cta: { cs: "Rezervovat místo", en: "Reserve your spot" } as Dict,
    note: {
      cs: "Rezervace probíhá přes Reservio — propojíme již brzy.",
      en: "Reservations via Reservio — connecting soon.",
    } as Dict,
  },
  hosts: {
    title: { cs: "Tváře HER ENERGY", en: "Faces of HER ENERGY" } as Dict,
    list: {
      cs: [
        {
          name: "Kateřina Čavajdová",
          role: "Profi boxerka · 9 let praxe",
          bio: "Zakladatelka HER ENERGY. Vede ženy skrze box a mindset — od techniky po sebevědomí.",
        },
        {
          name: "Yuliya Arkhiyereyeva",
          role: "Kamasutra Yoga",
          bio: "Smyslný flow, dech a otevření těla. Nauč se být ve své ženské energii naplno.",
        },
        {
          name: "Michaela Adamová",
          role: "Lunch & Vibes",
          bio: "Pečuje o komunitu, energii a chutě. Lunch break, který si užije každá!",
        },
      ],
      en: [
        {
          name: "Kateřina Čavajdová",
          role: "Pro boxer · 9 yrs",
          bio: "Phoenix. Founder of HER ENERGY. Guides women through boxing and mindset — from technique to confidence.",
        },
        {
          name: "Yuliya Arkhiyereyeva",
          role: "Kamasutra Yoga",
          bio: "Sensual flow, breath, body opening. Learn to live fully inside your feminine energy.",
        },
        {
          name: "Michaela Adamová",
          role: "Lunch & Vibes",
          bio: "She holds the community, the scents and the flavors. A lunch break that pulls everyone together.",
        },
      ],
    } as Record<Locale, { name: string; role: string; bio: string }[]>,
  },
  community: {
    eyebrow: { cs: "Komunita", en: "Community" } as Dict,
    title: {
      cs: "Ženy, které chtějí víc.",
      en: "Women who want more.",
    } as Dict,
    body: {
      cs: "Nejsi sama. Sdílíme pot, smích, ticho i hlasitý pokřik vítězství. To je HER ENERGY.",
      en: "You’re not alone. We share sweat, laughter, silence and loud victory shouts. That’s HER ENERGY.",
    } as Dict,
  },
  cta: {
    title: { cs: "Připravená?", en: "Ready?" } as Dict,
    body: {
      cs: "Místa jsou limitovaná. Rezervuj si svoje teď.",
      en: "Spots are limited. Reserve yours now.",
    } as Dict,
    button: { cs: "Rezervovat", en: "Reserve" } as Dict,
  },
  footer: {
    tagline: {
      cs: "Síla ve smyslnosti. Smyslnost v síle.",
      en: "Strength in sensuality. Sensuality in strength.",
    } as Dict,
    contact: { cs: "Kontakt", en: "Contact" } as Dict,
    follow: { cs: "Sleduj", en: "Follow" } as Dict,
    rights: {
      cs: "© 2026 HER ENERGY. Vše vyhrazeno.",
      en: "© 2026 HER ENERGY. All rights reserved.",
    } as Dict,
  },
  akce: {
    eyebrow: { cs: "Pravidelné akce", en: "Regular activities" } as Dict,
    title: { cs: "Další akce", en: "Other events" } as Dict,
    intro: {
      cs: "Každý týden tě čeká prostor pro tělo i hlavu. Podívej se, co teď jede — a klikni, ať si rezervuješ.",
      en: "Every week there’s space for body and mind. See what’s on right now — and tap to reserve.",
    } as Dict,
    box: {
      title: { cs: "Fitbox pro ženy", en: "Fitbox for women" } as Dict,
      tag: { cs: "S profi boxerkou", en: "With a pro fighter" } as Dict,
      sub: {
        cs: "Trénuj pod vedením Kateřiny Čavajdové — 9 let praxe. Technika, kondice, mindset.",
        en: "Train with Kateřina Čavajdová — 9 yrs of pro experience. Technique, conditioning, mindset.",
      } as Dict,
      when: { cs: "Úterý & Čtvrtek", en: "Tuesday & Thursday" } as Dict,
      time: { cs: "19:00 – 20:00", en: "19:00 – 20:00" } as Dict,
      where: { cs: "Titan Gym · Ďáblická 2", en: "Titan Gym · Ďáblická 2" } as Dict,
      perk: { cs: "Sleva 20 % pro klienty Sauna Central", en: "20% off for Sauna Central clients" } as Dict,
      cta: { cs: "Rezervovat", en: "Reserve" } as Dict,
    },
    soonTitle: { cs: "Brzy přidáme", en: "Coming soon" } as Dict,
    soonItems: {
      cs: ["Kamasutra Yoga – pravidelné lekce", "Dance flow", "Ženské kruhy & rituály"],
      en: ["Kamasutra Yoga — regular classes", "Dance flow", "Women’s circles & rituals"],
    } as DictArr,
    backHome: { cs: "Zpět na úvod", en: "Back to home" } as Dict,
  },
} as const;
