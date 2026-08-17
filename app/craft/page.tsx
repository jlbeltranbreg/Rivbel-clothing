import Nav from "@/components/nav";
import Footer from "@/components/footer";
import CraftPageClient from "./CraftPageClient";

export const metadata = {
  title: "Craft — Rivbel",
  description: "Materials, construction, and embroidery specifications for every Rivbel garment.",
};

export default function CraftPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <CraftPageClient />
      </main>
      <Footer />
    </>
  );
}
