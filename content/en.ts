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
    { time: "13:30", title: "Dessert workshop", host: "Thermomix" },
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
      credentials: [
        { value: "9+", label: "Years experience" },
        { value: "5", label: "Years Czech national team" },
        { value: "★", label: "International medalist" },
        { value: "PRO", label: "Pro boxer" },
      ],
      specialization: ["Mindset", "Discipline", "Strength", "Phoenix Mentality"],
      focus: ["Women", "Confidence", "Boxing", "Inner Strength"],
      tagline:
        "I help women become stronger, disciplined and fearless through boxing.",
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
        "A form of feminine movement focused on the pelvis, opening the hips, breath and reconnecting with your own body.",
        "The pelvis is the centre of feminine energy. It's where women often hold tension, stress, emotion and blocks from everyday pressure. Through mindful movement, breath and gentle techniques we learn to release the body, sense it more clearly and properly activate the deep core and pelvic floor.",
      ],
      benefits: [
        "Improve mobility and release in the pelvis",
        "Work better with feminine energy and confidence",
        "Support correct posture",
        "Activate the pelvic floor and deep core",
        "Improve your relationship with your own body",
        "Release tension and stress stored in the body",
      ],
      tagline:
        "It's about connecting movement, femininity and inner work — from within.",
    },
    schedule: {
      when: "To be announced",
      time: "To be announced",
      where: "Titan Gym · Ďáblická 2",
    },
  },
};
