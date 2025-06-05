import React from "react";
import { twMerge } from "tailwind-merge";

function FeatureCard({ title, description, children, className }) {
  return (
    <div
      className={twMerge(
        "bg-primary-1300 border border-primary/10 p-6 rounded-3xl",
        className
      )}
    >
      <div className="aspect-video">{children}</div>
      <div>
        <h3 className="text-2xl font-medium mt-6">{title}</h3>
        <p className="text-white/50 mt-2">{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
