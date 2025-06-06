import FeatureCard from "@/components/ui/featureCard";
import Image from "next/image";
import Key from "@/components/ui/key";
import featureDesign from "@/assets/images/featureDesign.png";

export default function Features() {
  return (
    <section className="py-18 px-4 flex items-center justify-center" id="features">
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
              "Automatically transcribe doctor-patient conversations in real-time using Whisper and MedSpaCy. Extract structured clinical notes and store them securely."
            }
            className="md:col-span-2 lg:col-span-1"
          >
            <div className="aspect-video flex items-center justify-center">
              <Image src={featureDesign} className="rounded-xl" height={650} width={650} alt="Clinical transcription dashboard" />
            </div>
          </FeatureCard>

          {/* Card-2 */}
          <FeatureCard
            title={"AI-Powered Prescriptions & Recommendations"}
            description={
              "Generate personalized prescriptions, diet plans, and fitness routines using GPT-4. Everything is editable, downloadable, and digitally signed."
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
