import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Verify database connection
    await prisma.$connect();
    console.log("Database connected successfully");

    const body = await req.json();
    const { transcript, patientId, doctorId, clinicId } = body;

    console.log("Received request body:", body);

    if (!transcript?.trim() || patientId === undefined || doctorId === undefined || clinicId === undefined) {
      return NextResponse.json(
        {
          error: "Missing or invalid required fields",
          details: {
            transcript: !!transcript?.trim(),
            patientId: !!patientId,
            doctorId: !!doctorId,
            clinicId: !!clinicId,
          },
        },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(Number(patientId)) ||
      !Number.isInteger(Number(doctorId)) ||
      !Number.isInteger(Number(clinicId))
    ) {
      return NextResponse.json(
        { error: "Invalid data: patientId, doctorId, and clinicId must be valid integers" },
        { status: 400 }
      );
    }

    let patientExists, doctorExists, clinicExists;
    try {
      patientExists = await prisma.patient.findFirst({ where: { PatientID: Number(patientId) } });
      console.log("Patient exists:", patientExists);
    } catch (error) {
      console.error("Error checking patient:", error);
      return NextResponse.json(
        { error: "Database error: Failed to verify patient", details: error.message, code: error.code },
        { status: 500 }
      );
    }
    try {
      doctorExists = await prisma.doctor.findFirst({ where: { DoctorID: Number(doctorId) } });
      console.log("Doctor exists:", doctorExists);
    } catch (error) {
      console.error("Error checking doctor:", error);
      return NextResponse.json(
        { error: "Database error: Failed to verify doctor", details: error.message, code: error.code },
        { status: 500 }
      );
    }
    try {
      clinicExists = await prisma.clinic.findFirst({ where: { ClinicID: Number(clinicId) } });
      console.log("Clinic exists:", clinicExists);
    } catch (error) {
      console.error("Error checking clinic:", error);
      return NextResponse.json(
        { error: "Database error: Failed to verify clinic", details: error.message, code: error.code },
        { status: 500 }
      );
    }

    if (!patientExists) {
      return NextResponse.json({ error: "Invalid patientId: Patient does not exist" }, { status: 400 });
    }
    if (!doctorExists) {
      return NextResponse.json({ error: "Invalid doctorId: Doctor does not exist" }, { status: 400 });
    }
    if (!clinicExists) {
      return NextResponse.json({ error: "Invalid clinicId: Clinic does not exist" }, { status: 400 });
    }

    try {
      const response = await prisma.main.create({
        data: {
          PatientID: Number(patientId),
          DoctorID: Number(doctorId),
          ClinicID: Number(clinicId),
          Conversation: transcript.trim(),
          DigiPrescription: "",
          DietPlan: "",
          ExercisePlan: "",
        },
      });
      console.log("Insert successful:", response);
      return NextResponse.json({ success: true, data: response });
    } catch (error) {
      console.error("Prisma insert error:", error);
      let errorMsg = "Failed to insert into Main";
      if (error.code === "P2002") {
        errorMsg = "Unique constraint violation in Main table";
      } else if (error.code === "P2003") {
        errorMsg = "Foreign key constraint violation";
      }
      return NextResponse.json(
        {
          error: errorMsg,
          details: error.message,
          code: error.code,
          meta: error.meta,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in POST handler:", error.stack);
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error.message,
        code: error.code,
        meta: error.meta,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}