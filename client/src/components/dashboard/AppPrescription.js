import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

export default function AppPrescription() {
  return (
    <section className="flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl rounded-xl shadow-md border-none">
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
                <Input placeholder="Name" className="w-full" />
              </div>
              <div className="flex items-center space-x-2">
                <Label className="w-1/3">Age</Label>
                <Input placeholder="Age" className="w-full" />
              </div>
              <div className="flex items-center space-x-2">
                <Label className="w-1/3">Date</Label>
                <Input type="date" className="w-full" />
              </div>

              <div className="space-y-2">
                <Label>Medication Name</Label>
                <Input placeholder="Dosage" />
              </div>

              <div className="space-y-2">
                <Label>Dosage & Frequency</Label>
                <Input placeholder="e.g. 1 tablet twice a day" />
              </div>

              <div className="space-y-2">
                <Label>Duration</Label>
                <Textarea placeholder="Additional Notes" />
              </div>

              <div className="space-y-2">
                <Label>Doctor’s Signature</Label>
                <Input placeholder="Sign Here" />
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
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
