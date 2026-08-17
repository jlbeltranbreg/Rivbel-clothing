import Nav from "@/components/nav";
import Footer from "@/components/footer";
import CollectionPage from "./CollectionPage";

export const metadata = {
  title: "Drop 01 — Rivbel",
  description: "The founding collection. Four garments. Cotton piqué, linen, and Oxford cotton — made in Spain.",
};

export default function Collection() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <CollectionPage />
      </main>
      <Footer />
    </>
  );
}
