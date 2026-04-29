import { Community } from "./components/Community";
import { Duality } from "./components/Duality";
import { EventCard } from "./components/EventCard";
import { Hero } from "./components/Hero";
import { Hosts } from "./components/Hosts";
import { Manifesto } from "./components/Manifesto";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Duality />
      <Hosts />
      <EventCard />
      <Community />
    </>
  );
}
