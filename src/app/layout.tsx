import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TransacaoProvider } from "@/contexts/TransacaoContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", // variável CSS
});

export const metadata: Metadata = {
  title: "Gerenciador Financeiro",
  description: "Aplicação para controle de transações",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} antialiased`}
      >
        <TransacaoProvider>{children}</TransacaoProvider>
      </body>
    </html>
  );
}
