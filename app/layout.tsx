import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Budget Places - Find Affordable Spots Near You",
  description: "Discover budget-friendly restaurants, cafes, and attractions nearby",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
