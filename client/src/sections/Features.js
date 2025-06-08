"use client";
import FeatureCard from "@/components/ui/featureCard";
import Key from "@/components/ui/key";
import { File, FileText, Mic } from "lucide-react";
import { motion } from "framer-motion";
const barHeights = [20, 32, 16, 40, 24, 40, 16, 32, 20];
export default function Features() {
  
  return (
    <section
      className="py-18 px-4 flex items-center justify-center"
      id="features"
    >
      <div className="container">
        <h2 className="text-3xl font-medium text-center mt-6 max-w-3xl mx-auto">
          How MediScribe Works?
        </h2>

        {/* Feature Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-8">
          {/* Card-1 */}
          <FeatureCard
            title={"Voice-to-Note AI Transcription"}
            description={
              "Automatically transcribe doctor-patient conversations in real-time using Gemini. Extract structured clinical notes and store them securely."
            }
            className="md:col-span-2 lg:col-span-1"
          >
            <div className="aspect-video flex items-center justify-center gap-8 rounded-xl p-6">
              {/* Mic Button */}
              <div className="bg-[#5EF7BA] rounded-full w-16 h-16 flex items-center justify-center">
                <Mic className="w-8 h-8 text-black/80" />
              </div>

              {/* Waveform */}
              <div className="flex items-center gap-[3px]">
                {barHeights.map((height, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-[#5EF7BA] rounded"
                    style={{ height: `${height}px` }}
                    animate={{
                      scaleY: [1, 1.8, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: i * 0.1, 
                    }}
                  />
                ))}
              </div>

              {/* File Button */}
              <div className="bg-[#5EF7BA] rounded-full w-16 h-16 flex items-center justify-center">
                <FileText className="w-7 h-7 text-black/80" />
              </div>
            </div>
          </FeatureCard>

          {/* Card-2 */}
          <FeatureCard
            title={"AI-Powered Prescriptions & Recommendations"}
            description={
              "Generate personalized prescriptions, diet plans, and fitness routines using Gemini. Everything is editable, downloadable, and digitally signed."
            }
            className="md:col-span-2 lg:col-span-1"
          >
            <div className="aspect-video flex items-center justify-center">
              <p className="text-3xl font-bold text-white/20 text-center leading-relaxed">
                Smart <br />
                <span className="bg-gradient-to-r from-[#3EDFA3] via-[#30F6F0] to-[#5EF7BA] bg-clip-text">
                  recommendations
                </span>{" "}
                in seconds.
              </p>
            </div>
          </FeatureCard>

          {/* Card-3 */}
          <FeatureCard
            title={"Review, Approve, and Manage Patients"}
            description={
              "Doctors can review AI-generated outputs, leave comments, approve or revise notes and prescriptions. Built-in Stripe-based access control and admin tools."
            }
            className="md:col-span-2 md:col-start-2 lg:col-span-1 lg:col-start-auto"
          >
            <div className="aspect-video flex items-center justify-center gap-4 flex-wrap">
              <Key className={"w-28"}>Approve</Key>
              <Key className={"w-28"}>Edit</Key>
              <Key className={"w-28"}>Manage</Key>
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
