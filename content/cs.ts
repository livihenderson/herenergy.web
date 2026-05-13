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
    { time: "13:30", title: "Vaření dezertu", host: "Termomix" },
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
      credentials: [
        { value: "9+", label: "Let praxe" },
        { value: "5", label: "Let v české reprezentaci" },
        { value: "★", label: "Mezinárodní medailistka" },
        { value: "PRO", label: "Profi boxerka" },
      ],
      specialization: ["Mindset", "Disciplína", "Síla", "Phoenix Mentality"],
      focus: ["Ženy", "Sebevědomí", "Box", "Vnitřní síla"],
      tagline:
        "Pomáhám ženám stát se silnějšími, disciplinovanými a beze strachu — skrze box.",
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
        "Forma ženského pohybu zaměřená hlavně na práci s pánví, uvolnění kyčlí, dech a propojení se svým tělem.",
        "Pánev je centrum ženské energie. Právě v ní ženy často drží napětí, stres, emoce nebo bloky z každodenního tlaku. Skrze vědomý pohyb, dech a jemné techniky se učíme tělo znovu uvolnit, lépe vnímat a správně aktivovat hluboký střed těla i pánevní dno.",
      ],
      benefits: [
        "Zlepšit mobilitu a uvolnění pánve",
        "Lépe pracovat s ženskou energií a sebevědomím",
        "Podpořit správné držení těla",
        "Aktivovat pánevní dno a hluboký core",
        "Zlepšit vztah k vlastnímu tělu",
        "Uvolnit napětí a stres uložený v těle",
      ],
      tagline:
        "Je to o propojení pohybu, ženskosti a práce se sebou zevnitř.",
    },
    schedule: {
      when: "Brzy oznámíme",
      time: "Brzy oznámíme",
      where: "Titan Gym · Ďáblická 2",
    },
  },
};
