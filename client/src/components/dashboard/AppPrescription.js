"use client";

import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function AppPrescription() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    healthGoals: "",
    allergies: "",
    conditions: "",
    signature: "",
  });

  const [conversation, setConversation] = useState("");

  useEffect(() => {
    const fetchAutoFill = async () => {
      try {
        const res = await fetch("/api/generate-prescription"); // ← your server route with Gemini
        const data = await res.json();

        if (data.error) {
          toast.error("Failed: " + data.error);
          return;
        }

        if (data.conversation) {
          setConversation(data.conversation); // Show conversation on UI
        }

        if (data.fields) {
          setFormData(data.fields); // Auto-fill form
          toast.success("Form auto-filled from conversation");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to auto-fill from conversation");
      }
    };

    fetchAutoFill();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="flex items-center p-4">
      <div className="w-full max-w-3xl rounded-xl shadow-md border-none">
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-primary">
                Digital Prescription
              </h2>
              <p className="text-sm text-muted-foreground">
                Doctor & Patient Dialogue
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <Label className="w-1/3">Patient Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Name"
                  className="w-full"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label className="w-1/3">Age</Label>
                <Input
                  value={formData.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  placeholder="Age"
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <Label>Health Goals</Label>
                <Input
                  value={formData.healthGoals}
                  onChange={(e) => handleChange("healthGoals", e.target.value)}
                  placeholder="Weight Loss, Heart Health"
                />
              </div>

              <div className="space-y-3">
                <Label>Allergies</Label>
                <Input
                  value={formData.allergies}
                  onChange={(e) => handleChange("allergies", e.target.value)}
                  placeholder="e.g. peanuts, dairy"
                />
              </div>

              <div className="space-y-3">
                <Label>Existing Conditions</Label>
                <Input
                  value={formData.conditions}
                  onChange={(e) => handleChange("conditions", e.target.value)}
                  placeholder="Hypertension, High Cholesterol"
                />
              </div>

              <div className="space-y-3">
                <Label>Doctor’s Signature</Label>
                <Input
                  value={formData.signature}
                  onChange={(e) => handleChange("signature", e.target.value)}
                  placeholder="Sign Here"
                />
              </div>

              <Button className="w-full bg-cyan-500">Finalize & Send</Button>
            </div>

            <div className="space-y-4 flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="" alt="Dr. Zua" />
                  <AvatarFallback>Dr</AvatarFallback>
                </Avatar>
                <div className="text-sm font-medium">
                  Dr.Zua
                  <br />
                  <span className="text-xs text-muted-foreground">All</span>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Medication
              </Button>

              <Button variant="outline" className="w-full">
                Save as PDF
              </Button>

              <p className="text-sm text-muted-foreground">{conversation}</p>
            </div>
          </div>
        </CardContent>
      </div>
    </section>
  );
}
