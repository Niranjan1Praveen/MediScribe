"use client";
import { Button } from "@/components/ui/button";
import heroDesign from "@/assets/images/heroDesign.png";
import Image from "next/image";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="rounded-xl py-18 px-4 overflow-x-clip">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="w-full md:w-3/4">
          <div className="flex justify-center items-center md:justify-start">
            <div className="inline-flex py-1 px-3 text-center bg-gradient-to-r from-[#3EDFA3] via-[#30F6F0] to-[#5EF7BA] rounded-full text-neutral-900 font-semibold">
              🩺 Empowering Clinicians with Voice & AI
            </div>
          </div>

          <h1 className="text-4xl text-center md:text-start md:text-6xl font-medium mt-6 leading-tight">
            AI-Powered Clinical Documentation & Health Assistant
          </h1>

          <p className="text-lg text-center md:text-start md:text-xl mt-8 leading-relaxed">
            MediScribe listens, understands, and documents. From real-time voice
            transcription to auto-generated prescriptions, diet and exercise
            plans — our assistant lets doctors focus more on care and less on
            paperwork.
          </p>

          <RegisterLink className="flex justify-center items-center md:justify-start">
            <Button
              type="submit"
              variant="signup"
              size="sm"
              className="whitespace-nowrap mt-6 rounded-md"
            >
              Get Started
            </Button>
          </RegisterLink>
        </div>

        <div className="w-full md:w-1/2 justify-center hidden md:flex md:justify-end">
          <motion.div
            // animate={{
            //   y: [0, -10, 0],
            // }}
            // transition={{
            //   duration: 3,
            //   repeat: Infinity,
            //   ease: "easeInOut",
            // }}
            className="relative"
          >
            {/* Glow effect using a gradient background */}
            <div className="absolute -inset-2 z-0 rounded-full blur-xl opacity-80 bg-gradient-to-r from-[#3EDFA3] via-[#30F6F0] to-[#5EF7BA]"></div>

            <Image
              src={heroDesign}
              alt="Hero Design"
              className="relative z-10 rounded-full"
              width={800}
              height={800}
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
