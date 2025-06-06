import React from "react";
import { twMerge } from "tailwind-merge";
import { Card } from "./card";

function FeatureCard({ title, description, children, className }) {
  return (
    <Card
      className={twMerge(
        "p-6 rounded-3xl",
        className
      )}
    >
      <div className="aspect-video">{children}</div>
      <div>
        <h3 className="text-2xl font-medium mt-6">{title}</h3>
        <p className="mt-2">{description}</p>
      </div>
    </Card>
  );
}

export default FeatureCard;
