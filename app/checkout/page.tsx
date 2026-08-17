import Nav from "@/components/nav";
import CheckoutPageClient from "./CheckoutPageClient";

export const metadata = {
  title: "Checkout — Rivbel",
};

export default function CheckoutPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <CheckoutPageClient />
      </main>
    </>
  );
}
