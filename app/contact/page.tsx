import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ContactPageClient from "./ContactPageClient";

export const metadata = {
  title: "Join the List — Rivbel",
  description: "Be the first to know when Drop 01 ships. Waitlist and stockist inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <ContactPageClient />
      </main>
      <Footer />
    </>
  );
}
