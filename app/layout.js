import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["100", "400", "700"],
});

export const metadata = {
  title: "Money Minder",
  description: "expenss trecker money minder",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.variable} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
