"use client";
import React from "react";
import { pricingPlans } from "@/assets/data/pricing";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

function Pricing(props) {
  return (
    <section className="py-24 px-4 flex items-center justify-center">
      <div className="container">
        <h3 className="text-3xl font-medium text-center mt-6 max-w-3xl mx-auto">
          Pricing Plans
        </h3>
        <p className="text-center text-[22px] mt-5">
          Free forever. Upgrade for unlimited tasks, better security, and
          exclusive features
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-center lg:items-end mx-auto">
          {pricingPlans.map((plan, idx) => (
            <Card
              key={idx}
              className={cn(
                "flex flex-col justify-between shadow-md transition-all duration-300 bg-transparent border-0"
              )}
            >
              <CardContent className="p-10 space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{plan.title}</h3>
                    {plan.popular && (
                      <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20">
                        <motion.span
                          animate={{
                            backgroundPositionX: "-100%",
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop",
                          }}
                          className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF)] [background-size:200%] text-transparent bg-clip-text font-medium"
                        >
                          Popular
                        </motion.span>
                      </div>
                    )}
                  </div>
                  <div className="text-3xl font-bold mt-2">
                    {plan.price}
                    <span className="text-base font-medium text-muted-foreground">
                      {plan.frequency}
                    </span>
                  </div>
                  <Button
                    className={cn(
                      "mt-6 w-full",
                      plan.popular
                        ? "bg-white text-black hover:bg-gray-100"
                        : ""
                    )}
                  >
                    {plan.buttonText}
                  </Button>
                  <ul className="mt-6 space-y-2 text-sm">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="text-[#5EF7BA] mr-2" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
