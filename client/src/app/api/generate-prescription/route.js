import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Ensure DB connection
    await prisma.$connect();
    console.log("Database connected successfully");

    // Get latest conversation
    const latest = await prisma.main.findFirst({
      orderBy: { VisitID: "desc" },
      select: { Conversation: true },
    });

    if (!latest || !latest.Conversation?.trim()) {
      return NextResponse.json(
        { error: "No valid conversation found in Main table" },
        { status: 404 }
      );
    }

    console.log("Fetched latest conversation:", latest.Conversation);

    return NextResponse.json({ success: true, conversation: latest.Conversation });
  } catch (error) {
    console.error("Error in GET /generate-prescription:", error.stack);
    return NextResponse.json(
      {
        error: "Failed to fetch conversation",
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
