"use client";

import { useEffect, useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import Loader from "../ui/loader";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import SignaturePad from "@/components/dashboard/AppSignaturePad";

export default function AppPrescription() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    healthGoals: "",
    allergies: "",
    conditions: "",
    signature: "",
    keyIssues: "",
    decisions: "",
    medications: "",
  });

  const [conversation, setConversation] = useState("");
  const [prescription, setPrescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAutoFill = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/generate-prescription");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (data.error) {
          toast.error("Failed: " + data.error);
          return;
        }
        console.log(data);

        if (data.conversation) {
          setConversation(data.conversation);
        }
        if (data.digiPrescription) {
          setPrescription(data.digiPrescription);
        }
        if (data.fields) {
          setFormData((prev) => ({
            ...prev,
            ...data.fields,
            age: data.fields.age ? String(data.fields.age) : "",
          }));
          toast.success("Form auto-filled from conversation");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to auto-fill from conversation");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAutoFill();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }
  console.log(prescription);

  return (
    <section className="flex items-center p-4">
      <div className="w-full max-w-5xl rounded-xl shadow-md border-none">
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
                  type="text"
                />
              </div>
              {/* Dietary Preferences */}
              <div className="space-y-2">
                <Label>
                  Dietary Preferences<small>(Optional)</small>
                </Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox /> <span>Vegetarian</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox /> <span>Gluten-Free</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Key Issues</Label>
                <Textarea
                  value={formData.keyIssues}
                  onChange={(e) => handleChange("keyIssues", e.target.value)}
                  placeholder="e.g. fatigue, low energy"
                />
              </div>
              <div className="space-y-3">
                <Label>Decisions</Label>
                <Textarea
                  value={formData.decisions}
                  onChange={(e) => handleChange("decisions", e.target.value)}
                  placeholder="e.g. perform tests"
                />
              </div>
              <div className="space-y-3">
                <Label>
                  Medications<small>(Optional)</small>
                </Label>
                <Textarea
                  value={formData.medications}
                  onChange={(e) => handleChange("medications", e.target.value)}
                  placeholder="e.g. inhaler"
                />
              </div>
              <div className="space-y-3">
                <Label>
                  Health Goals<small>(Optional)</small>
                </Label>
                <Textarea
                  value={formData.healthGoals}
                  onChange={(e) => handleChange("healthGoals", e.target.value)}
                  placeholder="Weight Loss, Heart Health"
                />
              </div>
              <div className="space-y-3">
                <Label>
                  Allergies<small>(Optional)</small>
                </Label>
                <Input
                  value={formData.allergies}
                  onChange={(e) => handleChange("allergies", e.target.value)}
                  placeholder="e.g. peanuts, dairy"
                />
              </div>
              <div className="space-y-3">
                <Label>
                  Existing Conditions<small>(Optional)</small>
                </Label>
                <Input
                  value={formData.conditions}
                  onChange={(e) => handleChange("conditions", e.target.value)}
                  placeholder="Hypertension, High Cholesterol"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium">
                  Doctor's Signature
                </label>
                <SignaturePad
                  onSave={(signature) => handleChange("signature", signature)}
                  width={400}
                  height={200}
                />
                {formData.signature && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Saved signature:</p>
                    <img
                      src={formData.signature}
                      alt="Doctor's signature"
                      className="h-20 border rounded"
                    />
                  </div>
                )}
              </div>
              <Button className="w-full bg-cyan-500">Finalize & Send</Button>
            </div>

            <div className="space-y-4 flex flex-col items-center md:items-start">
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Medication
              </Button>

              <Button variant="outline" className="w-full">
                Save as PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </section>
  );
}
