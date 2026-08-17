import Nav from "@/components/nav";
import Footer from "@/components/footer";
import StoryPageClient from "./StoryPageClient";

export const metadata = {
  title: "Our Story — Rivbel",
  description: "Two founders, two cultures, one standard. The Rivbel story — born in Spain, shaped by Mexico.",
};

export default function StoryPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <StoryPageClient />
      </main>
      <Footer />
    </>
  );
}
