import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans-stack",
  subsets: ["latin"],
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  variable: "--font-display-stack",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mobilevet.et"),
  title: {
    default: "Mobile Vet — Smart Livestock Protection for Ethiopia",
    template: "%s · Mobile Vet",
  },
  description:
    "Mobile Vet pairs satellite intelligence, smart RFID-GPS ear tags and SMS/USSD alerts to protect Ethiopian pastoralists' livestock and livelihoods.",
  openGraph: {
    title: "Mobile Vet — Smart Livestock Protection for Ethiopia",
    description:
      "Satellite-driven early warnings, digital livestock identity and SMS/USSD alerts for pastoralist Ethiopia.",
    url: "https://mobilevet.et",
    siteName: "Mobile Vet",
    locale: "en_ET",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream-50 text-ink-500">
        {children}
      </body>
    </html>
  );
}
