import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { ThemeProvider } from "next-themes";
import ModalProvider from "../components/ModalProvider";
import { Toaster } from "sonner";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../components/Navbar"), {
  ssr: true,
});

export const metadata: Metadata = {
  title: "ourOS ❤️",
  description: "a digital collection specially for us.",
};

const kumbhsans = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={kumbhsans.className}>
          <ThemeProvider
            enableSystem
            enableColorScheme
            storageKey="ouros-theme"
            themes={["light", "dark", "mar"]}
          >
            <Toaster position="top-center" />
            <ModalProvider />
            <div className="h-full">
              <div className={`max-w-xl flex flex-col h-full mx-auto`}>
                <Header />
                <main className="flex-grow px-2 sm:px-6">{children}</main>
                <div className="mt-auto px-2 py-4">
                  <Navbar />
                </div>
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
