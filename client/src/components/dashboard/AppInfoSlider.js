import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "../ui/button";
import { content } from "@/assets/data/infoSlider";

const ButtonStyle = "px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition";

export default function AppInfoSlider() {
  const [type, setType] = useState("models"); // "models" or "attacks"
  const [selectedKey, setSelectedKey] = useState("mnist");

  const keys = Object.keys(content[type]);

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <Button
          className={`${ButtonStyle} ${type === "models" ? "opacity-100" : "opacity-60"}`}
          onClick={() => setType("models")}
        >
          Models
        </Button>
        <Button
          className={`${ButtonStyle} ${type === "attacks" ? "opacity-100" : "opacity-60"}`}
          onClick={() => setType("attacks")}
        >
          Attacks
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {keys.map((key) => (
          <Button
            key={key}
            onClick={() => setSelectedKey(key)}
            className={`px-3 py-1 rounded-full ${
              selectedKey === key
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600"
            } hover:bg-indigo-100 transition`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Button>
        ))}
      </div>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedKey}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 right-0"
          >
            <p className="text-lg font-medium ">
              {content[type][selectedKey]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
