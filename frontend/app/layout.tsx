import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/hooks/use-i18n";


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'DevBoost AI | Developer Productivity Dashboard',
  description: 'AI-powered code analysis, refactoring, and test generation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body suppressHydrationWarning className="bg-background text-foreground font-sans">
        <I18nProvider>
          {/* <SaaSProvider> */}
            {children}
          {/* </SaaSProvider> */}
        </I18nProvider>
      </body>
    </html>
  );
}
