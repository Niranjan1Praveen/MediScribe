import Faqs from "@/sections/Faqs";
import Features from "@/sections/Features";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import LogoTicker from "@/sections/LogoTicker";
import Navbar from "@/sections/Navbar";
import Pricing from "@/sections/Pricing";

const Home = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <LogoTicker />
      <Features />
      <Pricing/>
      <Faqs />
      <Footer />
    </main>
  );
};

export default Home;
