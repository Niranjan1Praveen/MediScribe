"use client";
import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Button } from "./button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

const DropCard = ({ item }) => {
  return (
    <motion.div
      className={twMerge(
        `
    relative bg-white/10 backdrop-blur-2xl min-h-[350px] overflow-hidden
    shadow-[inset_10px_10px_15px_rgba(255,255,255,0.05),_10px_10px_20px_rgba(0,0,0,0.4)]
    border border-white/10 transition-all duration-500 ease-in-out rounded-md 
  `,
        item.className
      )}
    >
      <img src={item?.img ?? ""} className="w-full h-[300px]" alt="Image" height={300} width={800}/>

      <div className="flex flex-col text-center space-y-4 text-white p-4">
        <h2 className="text-lime-400 text-3xl font-bold">{item.cta}</h2>
        <p className="font-medium text-xl px-2 leading-normal">
          {item.description}
        </p>

        <ul className="text-md text-white/80 mt-4 space-y-2 mx-auto">
          {item.features?.map((point, i) => (
            <li key={i} className="flex gap-2 text-[1.1rem]">
              <span className="text-lime-400">✓</span> {point}
            </li>
          ))}
        </ul>

        <RegisterLink>
          <Button className="cursor-pointer">Register Now</Button>
        </RegisterLink>
      </div>
    </motion.div>
  );
};

export default DropCard;
