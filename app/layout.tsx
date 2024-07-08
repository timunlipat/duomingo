import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { HearstModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mingo",
  description: "Let's learn a language together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <Toaster/>
          <ExitModal/>
          <HearstModal/>
          <PracticeModal/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
