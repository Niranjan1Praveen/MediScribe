import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Verify database connection
    await prisma.$connect();
    console.log("Database connected successfully");

    // Check if Consultation model exists
    if (!prisma.Consultation) {
      console.error("Consultation model not found in Prisma client");
      return NextResponse.json(
        { error: "Consultation model not found in Prisma client. Ensure Prisma schema is correctly defined and generated." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { transcript, patientId } = body;

    console.log("Received request body:", body);

    // Validate input fields
    if (!transcript?.trim() || patientId === undefined) {
      return NextResponse.json(
        {
          error: "Missing or invalid required fields",
          details: {
            transcript: !!transcript?.trim(),
            patientId: !!patientId,
          },
        },
        { status: 400 }
      );
    }

    // Validate patientId is a non-empty string
    if (typeof patientId !== "string" || !patientId.trim()) {
      return NextResponse.json(
        { error: "Invalid data: patientId must be a valid non-empty string" },
        { status: 400 }
      );
    }

    // Insert into Consultation table
    try {
      const response = await prisma.consultation.create({
        data: {
          PatientID: patientId,
          Conversation: transcript.trim(),
          DigiPrescription: "", // Default empty string as per schema
        },
      });
      console.log("Insert successful:", response);
      return NextResponse.json({ success: true, data: response }, { status: 201 });
    } catch (error) {
      console.error("Prisma insert error:", error);
      let errorMsg = "Failed to insert into Consultation";
      if (error.code === "P2002") {
        errorMsg = "Unique constraint violation: PatientID already exists in Consultation table";
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