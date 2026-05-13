import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import type { EventInfo, ScheduleItem } from "@/get-content";
import type { Locale } from "@/i18n-config";
import csDict from "@/dictionaries/cs.json";
import enDict from "@/dictionaries/en.json";
import ruDict from "@/dictionaries/ru.json";

const DICTS: Record<Locale, Record<string, string>> = {
  cs: csDict as Record<string, string>,
  en: enDict as Record<string, string>,
  ru: ruDict as Record<string, string>,
};

export type ConfirmationEmailProps = {
  customerName: string;
  lang: Locale;
  event: EventInfo;
  schedule: ScheduleItem[];
};

// Color palette mirrors the site (see globals.css):
//   ink:       #1a0f0d (dark background)
//   ink-soft:  #2a1a16
//   bone:      #f5ede4 (off-white text)
//   ember:     #d94a2b (accent)
//   wine:      #6b1e1e (HER pill)
const colors = {
  ink: "#1a0f0d",
  inkSoft: "#2a1a16",
  bone: "#f5ede4",
  boneDim: "rgba(245, 237, 228, 0.7)",
  boneFaint: "rgba(245, 237, 228, 0.5)",
  ember: "#d94a2b",
  wine: "#6b1e1e",
  border: "rgba(245, 237, 228, 0.15)",
};

const fonts = {
  display: "'Bebas Neue', 'Arial Narrow', Arial, sans-serif",
  serif: "'Bodoni Moda', 'Times New Roman', Georgia, serif",
  body: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
};

export default function HerEnergyDayConfirmation({
  customerName,
  lang,
  event,
  schedule,
}: ConfirmationEmailProps) {
  const dict = DICTS[lang] ?? DICTS.cs;
  const t = (key: string) => dict[key] ?? key;

  return (
    <Html lang={lang}>
      <Head />
      <Preview>{t("Email preview text")}</Preview>
      <Body
        style={{
          backgroundColor: colors.ink,
          color: colors.bone,
          fontFamily: fonts.body,
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            padding: "40px 24px",
          }}
        >
          {/* Brand line */}
          <Section style={{ marginBottom: "32px" }}>
            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: "11px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: colors.ember,
                margin: 0,
              }}
            >
              {t("Thanks for your reservation")}
            </Text>
          </Section>

          {/* Headline */}
          <Heading
            as="h1"
            style={{
              fontFamily: fonts.serif,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "36px",
              lineHeight: 1.1,
              color: colors.bone,
              margin: "0 0 16px 0",
            }}
          >
            {t("See you at HER energy DAY")}
          </Heading>

          {/* Greeting + intro */}
          <Text
            style={{
              fontSize: "16px",
              lineHeight: 1.6,
              color: colors.bone,
              margin: "0 0 12px 0",
            }}
          >
            {t("Hi")} {customerName},
          </Text>
          <Text
            style={{
              fontSize: "16px",
              lineHeight: 1.6,
              color: colors.boneDim,
              margin: "0 0 32px 0",
            }}
          >
            {t("Your spot at HER energy DAY is confirmed.")}{" "}
            {t("Here's everything you need to know for the day.")}
          </Text>

          {/* What you need to know */}
          <Section
            style={{
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.inkSoft,
              padding: "24px",
              marginBottom: "32px",
            }}
          >
            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: "11px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: colors.boneDim,
                margin: "0 0 20px 0",
              }}
            >
              {t("What you need to know")}
            </Text>

            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: colors.boneFaint,
                margin: "0 0 4px 0",
              }}
            >
              {t("Date")}
            </Text>
            <Text
              style={{
                fontFamily: fonts.serif,
                fontSize: "22px",
                color: colors.ember,
                margin: "0 0 16px 0",
              }}
            >
              {event.fullDate}
            </Text>

            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: colors.boneFaint,
                margin: "0 0 4px 0",
              }}
            >
              {t("Location")}
            </Text>
            <Text
              style={{
                fontFamily: fonts.serif,
                fontSize: "18px",
                color: colors.bone,
                margin: "0 0 4px 0",
              }}
            >
              {t("Titan Gym · Ďáblická 2 · Prague")}
            </Text>
            <Text
              style={{
                fontSize: "13px",
                color: colors.boneDim,
                margin: "0 0 16px 0",
              }}
            >
              {t("Tram stop: Sídliště Ďáblice")}
            </Text>

            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: colors.boneFaint,
                margin: "0 0 4px 0",
              }}
            >
              {t("What to bring")}
            </Text>
            <Text
              style={{
                fontFamily: fonts.serif,
                fontSize: "16px",
                color: colors.bone,
                margin: 0,
              }}
            >
              {event.whatToBring}
            </Text>
          </Section>

          {/* Schedule */}
          <Section style={{ marginBottom: "32px" }}>
            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: "11px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: colors.boneDim,
                margin: "0 0 16px 0",
              }}
            >
              {t("Schedule for the day")}
            </Text>

            {schedule.map((it, i) => (
              <Section
                key={i}
                style={{
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  borderTop:
                    i === 0 ? "none" : `1px solid ${colors.border}`,
                }}
              >
                <table
                  cellPadding={0}
                  cellSpacing={0}
                  style={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          width: "80px",
                          fontFamily: fonts.display,
                          fontSize: "22px",
                          letterSpacing: "0.06em",
                          color: i === 1 ? colors.boneFaint : colors.ember,
                          verticalAlign: "baseline",
                        }}
                      >
                        {it.time}
                      </td>
                      <td style={{ verticalAlign: "baseline" }}>
                        <div
                          style={{
                            fontFamily: fonts.serif,
                            fontSize: "18px",
                            color: colors.bone,
                            lineHeight: 1.2,
                          }}
                        >
                          {it.title}
                        </div>
                        <div
                          style={{
                            fontFamily: fonts.display,
                            fontSize: "10px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: colors.boneDim,
                            marginTop: "4px",
                          }}
                        >
                          {it.host}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Section>
            ))}
          </Section>

          <Hr style={{ borderColor: colors.border, margin: "32px 0" }} />

          {/* Contact info */}
          <Section style={{ marginBottom: "24px" }}>
            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: "11px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: colors.boneDim,
                margin: "0 0 12px 0",
              }}
            >
              {t("Questions?")}
            </Text>
            <Text
              style={{
                fontSize: "14px",
                color: colors.bone,
                margin: "0 0 6px 0",
              }}
            >
              {t("Find us on Instagram")}:{" "}
              <Link
                href="https://www.instagram.com/her__energy/"
                style={{ color: colors.ember, textDecoration: "underline" }}
              >
                @her__energy
              </Link>
            </Text>
            <Text
              style={{
                fontSize: "14px",
                color: colors.bone,
                margin: 0,
              }}
            >
              {t("Or email us at")}:{" "}
              <Link
                href="mailto:herenergyclass@gmail.com"
                style={{ color: colors.ember, textDecoration: "underline" }}
              >
                herenergyclass@gmail.com
              </Link>
            </Text>
          </Section>

          {/* Signoff */}
          <Section style={{ marginTop: "32px" }}>
            <Text
              style={{
                fontFamily: fonts.serif,
                fontStyle: "italic",
                fontSize: "18px",
                color: colors.bone,
                margin: "0 0 8px 0",
              }}
            >
              {t("See you there!")}
            </Text>
            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: colors.boneDim,
                margin: 0,
              }}
            >
              {t("Team HER ENERGY")}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Sample preview props for `npm run email:dev`
HerEnergyDayConfirmation.PreviewProps = {
  customerName: "Anna",
  lang: "cs",
  event: {
    shortDate: "30 · 5 · 26",
    fullDate: "Sobota 30. května 2026",
    price: "1190 Kč",
    whatToBring: "Pohodlné oblečení, ručník, láhev na vodu a dobrou náladu.",
  },
  schedule: [
    { time: "12:00", title: "Boxing Rave", host: "Kateřina Čavajdová" },
    { time: "13:00", title: "Lunch & Coffee Break", host: "Vaření a ochutnávka s Termomixem" },
    { time: "14:00", title: "Kamasutra Yoga", host: "Yuliya Arkhiyereyeva" },
  ],
} satisfies ConfirmationEmailProps;
