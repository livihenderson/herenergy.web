import type { LocaleContent } from "../get-content";

export const content: LocaleContent = {
  event: {
    shortDate: "30 · 5 · 26",
    fullDate: "Sobota 30. května 2026",
    price: "1190 Kč",
    whatToBring: "Pohodlné oblečení, ručník, láhev na vodu a dobrou náladu.",
  },
  schedule: [
    { time: "12:00", title: "Boxing Rave", host: "Kateřina Čavajdová" },
    { time: "13:00", title: "Lunch & Coffee Break", host: "Mr.Box" },
    { time: "14:00", title: "Kamasutra Yoga", host: "Yuliya Arkhiyereyeva" },
  ],
  hosts: [
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
      name: "Mr.Box",
      role: "Lunch & Vibes",
      bio: "Pečuje o komunitu, energii a chutě. Lunch break, který si užije každá!",
      link: "https://mrbox.cz",
    },
  ],
  box: {
    eyebrow: "Pravidelné lekce",
    intro:
      "Trénuj pod vedením profi boxerky Kateřiny Čavajdové. Technika, kondice, mindset.",
    lecturer: {
      name: "Kateřina Čavajdová",
      role: "Profi boxerka · 9 let praxe",
      headline: "Phoenix. Žena, která tě postaví na nohy.",
      body: [
        "Vede lekce boxu pro ženy v Titan Gym. Od první techniky až po sebevědomí v ringu — a daleko za ním.",
        "Více info brzy.",
      ],
    },
    schedule: {
      when: "Úterý & Čtvrtek",
      time: "19:00 – 20:00",
      where: "Titan Gym · Ďáblická 2",
    },
  },
  yoga: {
    eyebrow: "Pravidelné lekce",
    intro:
      "Kámasútra Yoga s Yuliyí Arkhiyereyevou. Pomalé, hluboké, pravdivé.",
    lecturer: {
      name: "Yuliya Arkhiyereyeva",
      role: "Fitness trenérka a sexuoložka",
      headline: "Autorský systém pro ženské tělo.",
      body: [
        "Spojila jsem to, co obvykle existuje odděleně: fyzickou kondici a intimní zdraví. Silový trénink, pilates, bodybalet, fitness Kámasútra, práci s pánevním dnem a prvky kámasútry – do jedné ucelené praxe.",
      ],
    },
    schedule: {
      when: "Brzy oznámíme",
      time: "Brzy oznámíme",
      where: "Titan Gym · Ďáblická 2",
    },
  },
};
