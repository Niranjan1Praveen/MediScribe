import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export default function AppDietGenerator() {
  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl rounded-xl shadow-md border-none">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 rounded-lg">
              <Avatar>
                <AvatarImage src="" alt="John Smith" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">John Smith</p>
                <p className="text-sm text-muted-foreground">Age: 45</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Dietary Preferences</Label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox defaultChecked /> <span>Vegetarian</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox defaultChecked /> <span>Gluten-Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox /> <span>Gluten-Free</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Health Goals</Label>
              <Input placeholder="Weight Loss, Heart Health" />
            </div>

            <div className="space-y-2">
              <Label>Allergies</Label>
              <Input placeholder="e.g. peanuts, dairy" />
            </div>

            <div className="space-y-2">
              <Label>Existing Conditions</Label>
              <Input placeholder="Hypertension, High Cholesterol" />
            </div>

            <Button className="w-full bg-cyan-500 hover:bg-cyan-600">
              Generate Diet Plan
            </Button>

            <p className="text-xs text-muted-foreground">
              Doctors can review and adjust before finalizing
            </p>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="" alt="Doctor" />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-muted-foreground text-sm">Monday</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="font-semibold text-cyan-600">Breakfast</p>
                <p className="text-sm text-muted-foreground">
                  Oatmeal with berries and a glass of water
                </p>
              </div>
              <div>
                <p className="font-semibold text-cyan-600">Lunch</p>
                <p className="text-sm text-muted-foreground">
                  Quinoa salad with mixed vegetables and avocado
                </p>
              </div>
              <div>
                <p className="font-semibold text-cyan-600">Dinner</p>
                <p className="text-sm text-muted-foreground">
                  Grilled salmon with asparagus and brown rice
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
