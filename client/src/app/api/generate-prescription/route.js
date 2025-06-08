import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function GET() {
  let latest;
  try {
    await prisma.$connect();
    // Check if Consultation model exists
    if (!prisma.Consultation) {
      console.error("Consultation model not found in Prisma client");
      return NextResponse.json(
        { error: "Consultation model not found in Prisma client. Ensure Prisma schema is correctly defined and generated." },
        { status: 500 }
      );
    }

    latest = await prisma.Consultation.findFirst({
      orderBy: { VisitID: "desc" },
      select: { 
        Conversation: true,
        DigiPrescription: true
      },
    });

    if (!latest?.Conversation?.trim()) {
      return NextResponse.json(
        { error: "No conversation found" },
        { status: 404 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analyze this conversation and extract as JSON:
    ${latest.Conversation}
    
    Return ONLY valid JSON (no Markdown formatting) with these fields:
    {
      "name": "string",
      "age": "string",
      "healthGoals": "string",
      "allergies": "string",
      "conditions": "string",
      "signature": "string",
      "keyIssues": "string",
      "decisions": "string",
      "actionItems": "string",
      "medications": "string"
    }`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    
    // Clean the response
    const cleanedText = text.replace(/```json|```/g, '').trim();
    const extractedFields = JSON.parse(cleanedText);

    return NextResponse.json({ 
      success: true,
      conversation: latest.Conversation,
      digiPrescription: latest.DigiPrescription,  
      fields: extractedFields
    });

  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json(
      {
        error: error.message.includes("JSON") 
          ? "Failed to process AI response" 
          : "AI service unavailable",
        conversation: latest?.Conversation || "",
        digiPrescription: latest?.DigiPrescription || "", 
        fields: {}
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}