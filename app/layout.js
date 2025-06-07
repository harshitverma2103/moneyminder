import { Outfit } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
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
    <ClerkProvider 
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        baseTheme: undefined
      }}
    >
      <html lang="en">
        <body className={`${outfit.variable} antialiased`}>
          <Toaster/>
          {children}</body>
      </html>
    </ClerkProvider>
  );
}
