import type { LocaleContent } from "../get-content";

export const content: LocaleContent = {
  event: {
    shortDate: "30 · 5 · 26",
    fullDate: "Saturday 30 May 2026",
    price: "1190 Kč",
    whatToBring: "Comfortable clothing, a towel, a water bottle, and good vibes.",
  },
  schedule: [
    { time: "12:00", title: "Boxing Rave", host: "Kateřina Čavajdová" },
    { time: "13:00", title: "Lunch & Coffee Break", host: "Mr.Box" },
    { time: "14:00", title: "Kamasutra Yoga", host: "Yuliya Arkhiyereyeva" },
  ],
  hosts: [
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
      name: "Mr.Box",
      role: "Lunch & Vibes",
      bio: "She holds the community, the scents and the flavors. A lunch break that pulls everyone together.",
      link: "https://mrbox.cz",
    },
  ],
  box: {
    eyebrow: "Regular classes",
    intro:
      "Train with pro boxer Kateřina Čavajdová. Technique, conditioning, mindset.",
    lecturer: {
      name: "Kateřina Čavajdová",
      role: "Pro boxer · 9 yrs",
      headline: "Phoenix. The woman who lifts you up.",
      body: [
        "She runs the women's boxing classes at Titan Gym. From first technique to full confidence in the ring — and well beyond.",
        "More info coming soon.",
      ],
    },
    schedule: {
      when: "Tuesday & Thursday",
      time: "19:00 – 20:00",
      where: "Titan Gym · Ďáblická 2",
    },
  },
  yoga: {
    eyebrow: "Regular classes",
    intro:
      "Kamasutra Yoga with Yuliya Arkhiyereyeva. Slow, deep, true.",
    lecturer: {
      name: "Yuliya Arkhiyereyeva",
      role: "Fitness coach and sexologist",
      headline: "An original method for the female body.",
      body: [
        "I've brought together what usually lives apart: physical conditioning and intimate health. Strength training, Pilates, body ballet, fitness Kamasutra, pelvic-floor work and elements of kamasutra — woven into one coherent practice.",
      ],
    },
    schedule: {
      when: "To be announced",
      time: "To be announced",
      where: "Titan Gym · Ďáblická 2",
    },
  },
};
