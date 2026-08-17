import Nav from "@/components/nav";
import Hero from "@/components/hero-new";
import CraftBand from "@/components/craft-band";
import Collection from "@/components/collection";
import StoryPanel from "@/components/story-panel";
import Founders from "@/components/founders";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";
import Cursor from "@/components/cursor";
import ScrollProgress from "@/components/scroll-progress";
import ChatAdvisor from "@/components/chat-advisor";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main id="main-content">
        <Hero />
        <CraftBand />
        <Collection />
        <StoryPanel />
        <Founders />
        <Newsletter />
      </main>
      <Footer />
      <ChatAdvisor />
    </>
  );
}
