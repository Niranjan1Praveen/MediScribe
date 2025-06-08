import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      name,
      age,
      dietaryPreferences,
      healthGoals,
      allergies,
      conditions,
      keyIssues,
      decisions,
      medications,
      prescriptionText,
    } = data;

    // Validate required fields
    if (!name || !age) {
      return NextResponse.json(
        { error: "Patient name and age are required" },
        { status: 400 }
      );
    }

    await prisma.$connect();

    // Create new patient record
    const patient = await prisma.patient.create({
      data: {
        name,
        age,
        dietaryPreferences,
        healthGoals,
        allergies,
        conditions,
        keyIssues,
        decisions,
        medications,
        prescriptionText,
      },
    });

    return NextResponse.json(
      { success: true, patient },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving prescription:", error.message);
    return NextResponse.json(
      { error: "Failed to save prescription" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}