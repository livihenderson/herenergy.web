import type { LocaleContent } from "../get-content";

export const content: LocaleContent = {
  schedule: [
    { time: "11:00", title: "Камасутра-йога", host: "Yuliya Arkhiyereyeva" },
    { time: "13:00", title: "Ланч и кофе-брейк", host: "Michaela Adamová" },
    { time: "14:00", title: "Boxing Rave", host: "Kateřina Čavajdová" },
  ],
  hosts: [
    {
      name: "Kateřina Čavajdová",
      role: "Профи-боксёр · 9 лет опыта",
      bio: "Основательница HER ENERGY. Ведёт женщин через бокс и майндсет — от техники до уверенности в себе.",
    },
    {
      name: "Yuliya Arkhiyereyeva",
      role: "Камасутра-йога",
      bio: "Чувственный флоу, дыхание и раскрытие тела. Научись быть в своей женской энергии полностью.",
    },
    {
      name: "Michaela Adamová",
      role: "Ланч и вайбс",
      bio: "Заботится о сообществе, энергии и вкусах. Ланч-брейк, которым насладится каждая!",
    },
  ],
};
