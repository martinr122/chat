import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UPJS Asistent",
  description: "A chatbot for university",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
