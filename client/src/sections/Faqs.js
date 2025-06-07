"use client";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is MediScribe and how does it help clinicians?",
    answer:
      "MediScribe is an AI-powered web app that transcribes doctor-patient conversations in real-time, generates structured clinical notes, digital prescriptions, and offers personalized health recommendations — all to reduce documentation burden and save time.",
  },
  {
    question: "How accurate is the voice transcription?",
    answer:
      "We use OpenAI's Whisper model to provide highly accurate medical voice transcription. Our system supports real-time audio capture and intelligent note extraction using MedSpaCy.",
  },
  {
    question: "Can I edit or review the AI-generated content?",
    answer:
      "Yes. Doctors can review, edit, comment, and approve all AI-generated clinical notes, prescriptions, diets, and exercise recommendations through our clinician interface.",
  },
  {
    question: "Is MediScribe secure and compliant?",
    answer:
      "Absolutely. MediScribe encrypts all data, uses role-based access controls, and integrates securely with third-party services. We're working toward full healthcare compliance including HIPAA-aligned practices.",
  },
  {
    question: "Can I use MediScribe on multiple devices or with my team?",
    answer:
      "Yes. Our Pro and Enterprise plans support multiple users and offer an Admin Dashboard for managing access and permissions across your clinic or hospital.",
  },
  {
    question: "How does billing and subscription work?",
    answer:
      "We offer a free plan with limited usage. Paid plans are handled via Stripe, offering monthly or annual billing, and you can upgrade, downgrade, or cancel anytime.",
  },
];

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
