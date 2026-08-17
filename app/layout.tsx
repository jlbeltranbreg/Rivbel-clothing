import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/language";
import { ShopifyCartProvider } from "@/lib/shopify-cart";
import CartDrawer from "@/components/cart-drawer";

export const metadata: Metadata = {
  title: "RIVBEL | Tradition Worn",
  description: "Classic menswear rooted in Spain and Mexico. Drop 01 — limited edition.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#12192F" />
      </head>
      <body>
        <LanguageProvider>
          <ShopifyCartProvider>
            {children}
            <CartDrawer />
          </ShopifyCartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
