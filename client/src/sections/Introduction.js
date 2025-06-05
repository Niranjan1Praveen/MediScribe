"use client";
import Tags from "@/components/ui/tags";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

// New Intro Text
const text = `AI systems are increasingly being adopted in critical applications, yet many remain vulnerable to subtle, adversarial manipulations—often invisible to the human eye but highly disruptive to machine learning models.`;

const words = text.split(" ");

export default function Introduction() {
  const scrollTarget = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start end", "end end"],
  });

  const [currentWord, setCurrentWord] = useState(0);
  const wordIndex = useTransform(scrollYProgress, [0, 1], [0, words.length]);

  useEffect(() => {
    wordIndex.on("change", (latest) => {
      setCurrentWord(latest);
    });
  }, [wordIndex]);

  return (
    <section className="py-28 px-4 lg:py-45 flex items-center justify-center">
      <div className="container">
        <div className="sticky top-20 md:top-28 lg:top-40">
          <div className="flex justify-center">
            <Tags title={"Introduction"} />
          </div>
          <div className="text-4xl md:text-5xl text-center font-medium mt-10">
            <span>Understanding vulnerabilities is the first step to building robust AI.</span>{" "}
            <span className="text-white/15 leading-tight">
              {words.map((word, index) => {
                const isVisible = index < currentWord;
                const shouldUnderline =
                  isVisible &&
                  (word.toLowerCase().includes("ai") ||
                    word.toLowerCase().includes("critical"));
                const shouldHighlight =
                  isVisible &&
                  (word.toLowerCase().includes("vulnerable") ||
                    word.toLowerCase().includes("manipulations") ||
                    word.toLowerCase().includes("disruptive"));

                return (
                  <span
                    key={index}
                    className={twMerge(
                      "transition duration-500",
                      isVisible ? "text-white" : "text-white/15",
                      shouldHighlight && "text-red-500 italic transition",
                      shouldUnderline &&
                        "underline decoration-primary-400 underline-offset-8 transition"
                    )}
                  >
                    {word + " "}
                  </span>
                );
              })}
            </span>
            <span className="text-primary-400 block mt-3">
              That’s why we built <strong>AdversaNet</strong>.
            </span>
          </div>
        </div>
        <div className="h-[150vh]" ref={scrollTarget}></div>
      </div>
    </section>
  );
}
