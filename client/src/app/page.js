import Faqs from "@/sections/Faqs";
import Features from "@/sections/Features";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import Introduction from "@/sections/Introduction";
import LogoTicker from "@/sections/LogoTicker";
import Navbar from "@/sections/Navbar";

const Home = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className="bg-gradient-to-br from-teal-300 via-blue-400 to-blue-600">
        <LogoTicker />
        <Features />
      </div>
      <Footer />

    </main>
  );
};

export default Home;
