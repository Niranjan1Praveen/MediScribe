"use client";
import { Fragment } from "react";
import veltrix from "@/assets/images/marketLeaders/1.svg";
import noveNtra from "@/assets/images/marketLeaders/2.svg";
import aurevia from "@/assets/images/marketLeaders/3.svg";
import trionyx from "@/assets/images/marketLeaders/5.svg";


import Image from "next/image";
import { motion } from "framer-motion";
const logos = [
  { name: "Veltrix", image: veltrix },
  { name: "NoveNtra", image: noveNtra },
  { name: "Aurevia", image: aurevia },
  { name: "Trionyx", image: trionyx },

];
export default function LogoTicker() {
  return (
    <section className="py-20 px-4 overflow-x-clip flex items-center justify-center">
      <div className="container">
        <h3 className="text-center text-xl text-foreground">
          Trusted by leading clinics
        </h3>
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div 
          animate={{
            x: '-50%',
          }} 
          transition={{
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
          }}
          className="flex flex-none gap-24 pr-24 items-center justify-center">
            {Array.from({ length: 2 }).map((_, i) => (
              <Fragment key={i}>
                {logos.map((logo) => (
                  <Image src={logo.image} key={logo.name} alt={logo.name} width={200}/>
                ))}
              </Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
