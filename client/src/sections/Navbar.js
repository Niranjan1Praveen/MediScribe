"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
const navLinks = [
  { label: "Home", href: "" },
  { label: "Features", href: "#features" },
  { label: "FAQs", href: "#faqs" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header className="px-4 py-4 flex items-center justify-center z-100 backdrop-blur">
        <div className="container">
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-3 p-2 items-center px-4 md:pr-2">
              <div className="flex items-center gap-2">
                <Image src={logo} alt="Logo Icon" className="h-14 w-12" />
                <p className="text-2xl font-semibold text-white/20 text-center leading-relaxed md:inline-flex hidden">
                  <span className="bg-gradient-to-r from-[#28B983] via-[#20C9CC] to-[#3AC49B] bg-clip-text">
                    MediScribe
                  </span>
                </p>
              </div>
              <div className="lg:flex justify-center items-center hidden">
                <nav className="flex gap-6 font-medium">
                  {navLinks.map((link) => (
                    <a href={link.href} key={link.label}>
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="flex justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-menu md:hidden"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <line
                    x1="3"
                    y1="6"
                    x2="21"
                    y2="6"
                    className={twMerge(
                      "origin-left transition",
                      isOpen && "rotate-45 -translate-y-1"
                    )}
                  ></line>
                  <line
                    x1="3"
                    y1="12"
                    x2="21"
                    y2="12"
                    className={twMerge("transition", isOpen && "opacity-0")}
                  ></line>
                  <line
                    x1="3"
                    y1="18"
                    x2="21"
                    y2="18"
                    className={twMerge(
                      "origin-left transition",
                      isOpen && "-rotate-45 translate-y-1"
                    )}
                  ></line>
                </svg>
                <LoginLink>
                  <Button
                    variant={"login"}
                    className="cursor-pointer hidden md:inline-flex items-center mr-2"
                  >
                    Log in
                  </Button>
                </LoginLink>
                <RegisterLink>
                  <Button
                    variant={"signup"}
                    className="cursor-pointer hidden md:inline-flex items-center"
                  >
                    Sign Up
                  </Button>
                </RegisterLink>
              </div>
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col items-center gap-4 py-4 ">
                    {navLinks.map((link) => (
                      <a href={link.href} key={link.label} className="">
                        {link.label}
                      </a>
                    ))}
                    <LoginLink>
                      <Button
                        variant={"login"}
                        className="cursor-pointer md:inline-flex items-center"
                      >
                        Log in
                      </Button>
                    </LoginLink>
                    <Button className="bg-[#5EF7BA] cursor-pointer md:inline-flex items-center">
                      <a href="#signUpOptions">Sign Up</a>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </>
  );
}
