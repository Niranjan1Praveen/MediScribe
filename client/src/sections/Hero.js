"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroDesign from "@/assets/images/heroDesign.png";
import Image from "next/image";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="py-24 px-4 overflow-x-clip">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="w-full md:w-3/4">
          <div className="flex">
            <div className="inline-flex py-1 px-3 text-center bg-gradient-to-r from-[#3EDFA3] via-[#30F6F0] to-[#5EF7BA] rounded-full text-neutral-900 font-semibold">
              Trusted by AI Researchers, Students, and Educators
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-medium mt-6 leading-tight">
            Understand and Visualize How AI Can Be Fooled
          </h1>

          <p className="text-lg md:text-xl text-white/50 mt-8 leading-relaxed">
            Our interactive dashboard helps you explore adversarial attacks on
            image classifiers. Upload images, apply attacks like FGSM and PGD,
            and see how even small changes can trick powerful AI models—making
            it easier to learn, teach, and build more secure systems.
          </p>

          <div className="flex border border-white/15 rounded-full p-2 mt-8 md:max-w-lg">
            <Input
              type="email"
              placeholder="Enter your email"
              className="border-none px-4 !bg-transparent md:flex-1 w-full"
            />
            <RegisterLink>
              <Button
                type="submit"
                variant="signup"
                size="sm"
                className="whitespace-nowrap"
              >
                Sign Up
              </Button>
            </RegisterLink>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <motion.div
            animate={{
              y: [0, -10, 0], // Moves from 0 to -10px and back to 0
            }}
            transition={{
              duration: 3,
              repeat: Infinity, // Makes the animation loop forever
              ease: "easeInOut",
            }}
          >
            <Image
              src={heroDesign}
              alt="Hero Design"
              width={500}
              height={500}
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
