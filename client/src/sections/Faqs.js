"use client"
import { faqs } from "../assets/data/faqs"

import React from "react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function Faqs() {
  return (
    <section className="py-16 px-4 md:px-12" id="faqs">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl text-foreground font-bold">
          Questions? We&rsquo;ve got{" "}
          <span className="text-[#5EF7BA]">answers</span>
        </h2>
      </div>
      <div className="mt-10 max-w-2xl mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-5">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-xl px-6 shadow-md"
            >
              <AccordionTrigger className="py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
