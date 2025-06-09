import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { features } from "@/assets/data/features";
export default function Page() {
  return (
    <div className="p-4">
      <main className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <section  className="lg:col-span-3 w-full">
          <section className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Transform Clinical Workflows with{" "}
              <span className="text-cyan-400">MediScribe</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl">
              AI-powered documentation that reduces paperwork burden by 80%
              while enhancing patient care through automated prescriptions, diet
              plans, and exercise recommendations.
            </p>
          </section>

          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="hover:shadow-lg transition-shadow h-full flex flex-col"
                >
                  <CardHeader>
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="mb-4">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      className="w-full mt-auto"
                      variant={"outline"}
                    >
                      <Link href={feature.url}>Explore Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </section>
        <section className="lg:col-span-1 w-full">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Why Clinicians Choose MediScribe?
            </h2>
            <div className="grid grid-cols-1 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  80% Less Paperwork
                </h3>
                <p className="text-muted-foreground">
                  Automated documentation eliminates manual note-taking and form
                  filling
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  40% Faster Visits
                </h3>
                <p className="text-muted-foreground">
                  Streamlined workflows mean more patients seen with less effort
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Better Patient Care
                </h3>
                <p className="text-muted-foreground">
                  AI-assisted recommendations enhance treatment quality and
                  consistency
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
