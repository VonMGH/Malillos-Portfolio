import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Malillos | E-Portfolio",
  description: "Personal e-portfolio",
  icons: {
    icon: "/tab-identity.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bootStyle = {
    "--background": "#000000",
    "--foreground": "#ffffff",
  } as React.CSSProperties;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
      style={bootStyle}
    >
      <body
        className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]"
        style={{ background: "#000000", color: "#ffffff" }}
        suppressHydrationWarning
      >
        <Script
          id="boot-intro-theme"
          strategy="beforeInteractive"
        >{`
          try {
            var seen = sessionStorage.getItem('introSeen');
            if (seen) {
              document.documentElement.style.setProperty('--background', '#ffffff');
              document.documentElement.style.setProperty('--foreground', '#000000');
              document.body && (document.body.style.background = '#ffffff');
              document.body && (document.body.style.color = '#000000');
              var cover = document.getElementById('boot-cover');
              if (cover) cover.style.display = 'none';
            } else {
              document.documentElement.style.setProperty('--background', '#000000');
              document.documentElement.style.setProperty('--foreground', '#ffffff');
              document.body && (document.body.style.background = '#000000');
              document.body && (document.body.style.color = '#ffffff');
            }
          } catch (e) {}
        `}</Script>
        <div
          id="boot-cover"
          style={{ position: "fixed", inset: 0, background: "#000", zIndex: 2147483647 }}
          suppressHydrationWarning
        />
        {children}
      </body>
    </html>
  );
}
