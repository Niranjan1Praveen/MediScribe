import FeatureCard from "@/components/ui/featureCard";
import Tags from "@/components/ui/tags";
import Image from "next/image";
import Key from "@/components/ui/key";
import dashboard from "@/assets/images/dashboard-new.png";

const features = [
  "Upload Custom or Sample Images",
  "Apply FGSM, PGD, DeepFool Attacks",
  "View Original vs. Perturbed Images",
  "Model Confidence Score Charts",
  "Visual Perturbation Heatmaps",
  "Toggle Visualization Layers",
  "Interactive Parameter Controls",
];

export default function Features() {
  return (
    <section className="py-18 px-4 flex items-center justify-center" id="features">
      <div className="container">
        <h2 className="text-3xl font-medium text-center mt-6 max-w-3xl mx-auto">
          How it works?
        </h2>

        {/* Feature Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-8">
          {/* Card-1 */}
          <FeatureCard
            title={"Interactive Dashboard for Adversarial Attacks"}
            description={
              "Visualize the effect of adversarial perturbations on image classifiers. Upload images and apply attacks like FGSM, PGD, and DeepFool in real-time."
            }
            className="md:col-span-2 lg:col-span-1"
          >
            <div className="aspect-video flex items-center justify-center">
              <Image src={dashboard} className="rounded-xl" height={650} width={650} alt="dashboard design"/>
            </div>
          </FeatureCard>

          {/* Card-2 */}
          <FeatureCard
            title={"Confidence Scores & Model Predictions"}
            description={
              "Compare how model predictions and confidence scores shift before and after attacks. Great for learning and debugging AI behavior."
            }
            className="md:col-span-2 lg:col-span-1"
          >
            <div className="aspect-video flex items-center justify-center">
              <p className="text-3xl font-bold text-white/20 text-center leading-relaxed">
                What <br />
                <span className="bg-gradient-to-r from-[#3EDFA3] via-[#30F6F0] to-[#5EF7BA] bg-clip-text">
                  changed
                </span>{" "}
                in the prediction?
              </p>
            </div>
          </FeatureCard>

          {/* Card-3 */}
          <FeatureCard
            title={"Customizable Attack Parameters"}
            description={
              "Modify parameters like epsilon or iteration steps and see how they affect the success of attacks. Helps users grasp sensitivity and model robustness."
            }
            className="md:col-span-2 md:col-start-2 lg:col-span-1 lg:col-start-auto"
          >
            <div className="aspect-video flex items-center justify-center gap-4 flex-wrap">
              <Key className={"w-28"}>Epsilon</Key>
              <Key className={"w-28"}>Steps</Key>
              <Key className={"w-28"}>Method</Key>
            </div>
          </FeatureCard>
        </div>

       
      </div>
    </section>
  );
}
