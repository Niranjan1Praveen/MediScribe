"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";

export default function AppSearchPrescription() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/get-prescription");
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Search patients by name
  const handleSearch = async () => {
    if (!searchTerm) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/get-prescription?name=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();      
      setPatients(data);
      console.log(patients);
      
    } catch (error) {
      console.error("Error searching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePatientSelect = (value) => {
    const patient = patients.find((p) => p.id === parseInt(value));
    setSelectedPatient(patient);
  };
  console.log(patients);
  
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Patient Records</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Filter patient by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={loading} className={"bg-cyan-500 hover:bg-cyan-600"}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
        <div className="flex justify-between gap-2"> 
          <Select onValueChange={handlePatientSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select a patient" />
          </SelectTrigger>
          <SelectContent>
            {patients.map((patient) => (
              <SelectItem key={patient.id} value={patient.id.toString()}>
                {patient.name} ({patient.age})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
          <Button variant={"destructive"}><Trash/> Delete</Button>

        </div>
       

        {selectedPatient && (
          <div className="space-y-2 p-4 border rounded-lg">
            <p>
              <strong>Name:</strong> {selectedPatient.name}
            </p>
            <p>
              <strong>Age:</strong> {selectedPatient.age}
            </p>
            {selectedPatient.allergies && (
              <p>
                <strong>Allergies:</strong> {selectedPatient.allergies}
              </p>
            )}
            {selectedPatient.conditions && (
              <p>
                <strong>Conditions:</strong> {selectedPatient.conditions}
              </p>
            )}
            {selectedPatient.keyIssues && (
              <p>
                <strong>Key Issues:</strong> {selectedPatient.keyIssues}
              </p>
            )}
            {selectedPatient.healthGoals && (
              <p>
                <strong>Health Goals:</strong> {selectedPatient.healthGoals}
              </p>
            )}
            {selectedPatient.medications && (
              <p>
                <strong>Medications:</strong> {selectedPatient.medications}
              </p>
            )}
            {selectedPatient.dietaryPreferences.length != 0 && (
              <p>
                <strong>Dietary Preferences:</strong>{" "}
                {(() => {
                  try {
                    const parsed = JSON.parse(
                      selectedPatient.dietaryPreferences
                    );
                    return Array.isArray(parsed) ? parsed.join(", ") : parsed;
                  } catch {
                    return selectedPatient.dietaryPreferences; 
                  }
                })()}
              </p>
            )}
             {selectedPatient.createdAt && (
              <p>
                <strong>CreatedAt:</strong> {selectedPatient.createdAt}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
