import Faqs from "@/sections/Faqs";
import Features from "@/sections/Features";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import LogoTicker from "@/sections/LogoTicker";
import Navbar from "@/sections/Navbar";

const Home = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      {/* <div className="bg-gradient-to-r from-[#28B983] via-[#20C9CC] to-[#3AC49B]"> */}
        <LogoTicker />
        <Faqs />
        <Footer />
      {/* </div> */}
    </main>
  );
};

export default Home;
