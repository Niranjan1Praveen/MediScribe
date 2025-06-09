"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import Loader from "../ui/loader";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import SignaturePad from "@/components/dashboard/AppSignaturePad";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default function AppPrescription() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    healthGoals: "",
    allergies: "",
    conditions: "",
    keyIssues: "",
    decisions: "",
    medications: "",
    dietaryPreferences: [],
  });

  const [conversation, setConversation] = useState("");
  const [prescription, setPrescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [medications, setMedications] = useState([]);

  const addMedication = () => {
    setMedications([
      ...medications,
      {
        name: "",
        dosage: "",
        frequency: "",
        instructions: "",
      },
    ]);
  };
  const printRef = useRef(null);

  const handleDownloadPdf = async () => {
    try {
      const element = printRef.current;
      if (!element) {
        console.error("Element not found");
        return;
      }

      // Create a deep clone of the element to avoid modifying the original
      const clone = element.cloneNode(true);

      // Position the clone off-screen
      clone.style.position = "absolute";
      clone.style.left = "-9999px";
      clone.style.top = "0";
      clone.style.width = `${element.offsetWidth}px`;
      clone.style.backgroundColor = "#ffffff";
      clone.style.color = "#000000";
      clone.style.padding = "20px";
      // Append to body temporarily
      document.body.appendChild(clone);

      // Convert all oklch/oklab colors to safe RGB/HEX
      const allElements = clone.querySelectorAll("*");
      allElements.forEach((el) => {
        const computed = window.getComputedStyle(el);

        const sanitizeColor = (value) => {
          if (value.includes("oklch") || value.includes("oklab")) {
            return "#000000"; // fallback text/border color
          }
          return value;
        };

        const sanitizeBg = (value) => {
          if (value.includes("oklch") || value.includes("oklab")) {
            return "#ffffff"; // fallback background
          }
          return value;
        };

        el.style.color = sanitizeColor(computed.color);
        el.style.backgroundColor = sanitizeBg(computed.backgroundColor);

        const colorProps = [
          "borderColor",
          "borderTopColor",
          "borderRightColor",
          "borderBottomColor",
          "borderLeftColor",
        ];

        colorProps.forEach((prop) => {
          const current = computed.getPropertyValue(prop);
          if (current.includes("oklch") || current.includes("oklab")) {
            el.style.setProperty(prop, "#000000");
          }
        });
      });

      // Render to canvas
      const canvas = await html2canvas(clone, {
        scale: 1.5,
        logging: true,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        ignoreElements: (element) => {
          return element.classList?.contains("no-print");
        },
      });

      document.body.removeChild(clone);

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error("Canvas is empty");
      }

      const imgData = canvas.toDataURL("image/jpeg");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      pdf.save(`report-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Failed to generate PDF. Please check console for details.");
    }
  };

  const handleMedicationChange = (index, field, value) => {
    const updatedMeds = [...medications];
    updatedMeds[index][field] = value;
    setMedications(updatedMeds);
  };

  const removeMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };
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
            dietaryPreferences: data.fields.dietaryPreferences || [],
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

  const handleDietaryChange = (preference) => {
    setFormData((prev) => {
      const dietaryPreferences = prev.dietaryPreferences.includes(preference)
        ? prev.dietaryPreferences.filter((p) => p !== preference)
        : [...prev.dietaryPreferences, preference];
      return { ...prev, dietaryPreferences };
    });
  };

  const handleFinalize = async () => {
    try {
      const res = await fetch("/api/patient-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          prescriptionText: prescription,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      toast.success("Prescription saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save prescription to database");
    }
  };
  const handleClear = () => {
    setFormData({
      name: "",
      age: "",
      healthGoals: "",
      allergies: "",
      conditions: "",
      keyIssues: "",
      decisions: "",
      medications: "",
      dietaryPreferences: [],
    });
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <section className="flex items-center p-4">
      <div className="w-full max-w-5xl rounded-xl shadow-md border-none">
        <CardContent>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-semibold text-cyan-500 mb-2">
                Digital Prescription
              </h2>
              <p className="text-sm text-muted-foreground">
                Doctor & Patient Dialogue
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleDownloadPdf}>
                Save as PDF
              </Button>
            </div>
          </div>
          {/* printRef element */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
            ref={printRef}
          >
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <Label className="w-1/3">Patient Name</Label>
                <Input
                  value={formData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Name"
                  className="w-full"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label className="w-1/3">Age</Label>
                <Input
                  value={formData.age || ""}
                  onChange={(e) => handleChange("age", e.target.value)}
                  placeholder="Age"
                  className="w-full"
                  type="text"
                />
              </div>

              <div className="space-y-3">
                <Label>Key Issues</Label>
                <Textarea
                  value={formData.keyIssues || ""}
                  onChange={(e) => handleChange("keyIssues", e.target.value)}
                  placeholder="e.g. fatigue, low energy"
                />
              </div>
              <div className="space-y-3">
                <Label>Decisions</Label>
                <Textarea
                  value={formData.decisions || ""}
                  onChange={(e) => handleChange("decisions", e.target.value)}
                  placeholder="e.g. perform tests"
                />
              </div>
              <div className="space-y-3">
                <Label>
                  Medications <small>(Optional)</small>
                </Label>
                <Textarea
                  value={formData.medications || ""}
                  onChange={(e) => handleChange("medications", e.target.value)}
                  placeholder="e.g. inhaler"
                />
              </div>
              <div className="space-y-3">
                <Label>
                  Dietary Preferences <small>(Optional)</small>
                </Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={formData.dietaryPreferences.includes(
                        "Vegetarian"
                      )}
                      onCheckedChange={() => handleDietaryChange("Vegetarian")}
                    />
                    <span>Vegetarian</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={formData.dietaryPreferences.includes(
                        "Gluten-Free"
                      )}
                      onCheckedChange={() => handleDietaryChange("Gluten-Free")}
                    />
                    <span>Gluten-Free</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Label>
                  Health Goals <small>(Optional)</small>
                </Label>
                <Textarea
                  value={formData.healthGoals || ""}
                  onChange={(e) => handleChange("healthGoals", e.target.value)}
                  placeholder="Weight Loss, Heart Health"
                />
              </div>
              <div className="space-y-3">
                <Label>
                  Allergies <small>(Optional)</small>
                </Label>
                <Input
                  value={formData.allergies || ""}
                  onChange={(e) => handleChange("allergies", e.target.value)}
                  placeholder="e.g. peanuts, dairy"
                />
              </div>

              <div className="space-y-3">
                <Label>
                  Existing Conditions <small>(Optional)</small>
                </Label>
                <Input
                  value={formData.conditions}
                  onChange={(e) => handleChange("conditions", e.target.value)}
                  placeholder="Hypertension, High Cholesterol"
                />
              </div>
              {/* Doctor's Signature */}
              <div className="space-y-3">
                <div className="no-print">
                  <label className="block text-sm font-medium">
                    Doctor&apos;s Signature
                  </label>
                  <SignaturePad
                    onSave={(signature) => handleChange("signature", signature)}
                  />
                </div>

                {formData.signature && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">
                      Saved signature:
                    </p>
                    <img
                      src={formData.signature}
                      alt="Doctor's signature"
                      className="h-20 border rounded"
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-2 justify-between mt-2">
                <Button
                  className="bg-cyan-500 no-print hover:bg-cyan-600"
                  onClick={handleFinalize}
                >
                  Finalize & Send
                </Button>
                <Button
                  className="no-print"
                  onClick={handleClear}
                  variant={"outline"}
                >
                  Clear Data
                </Button>
              </div>
            </div>
            {/* Medications */}
            <div className="space-y-4 w-full">
              <Button
                variant="outline"
                className="w-full no-print"
                onClick={addMedication}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Medication
              </Button>

              <div className="space-y-4">
                {medications.map((med, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Medication {index + 1}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMedication(index)}
                      >
                        <X className="h-4 w-4 text-destructive" />
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor={`med-name-${index}`}>Name</Label>
                        <Input
                          id={`med-name-${index}`}
                          value={med.name || ""}
                          onChange={(e) =>
                            handleMedicationChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="e.g., Amoxicillin"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label htmlFor={`med-dosage-${index}`}>Dosage</Label>
                          <Input
                            id={`med-dosage-${index}`}
                            value={med.dosage || ""}
                            onChange={(e) =>
                              handleMedicationChange(
                                index,
                                "dosage",
                                e.target.value
                              )
                            }
                            placeholder="e.g., 500mg"
                          />
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor={`med-frequency-${index}`}>
                            Frequency
                          </Label>
                          <Input
                            id={`med-frequency-${index}`}
                            value={med.frequency}
                            onChange={(e) =>
                              handleMedicationChange(
                                index,
                                "frequency",
                                e.target.value
                              )
                            }
                            placeholder="e.g., Twice daily"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor={`med-instructions-${index}`}>
                          Special Instructions
                        </Label>
                        <Input
                          id={`med-instructions-${index}`}
                          value={med.instructions}
                          onChange={(e) =>
                            handleMedicationChange(
                              index,
                              "instructions",
                              e.target.value
                            )
                          }
                          placeholder="e.g., Take with food"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </section>
  );
}
