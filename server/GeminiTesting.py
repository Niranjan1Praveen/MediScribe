import os
from dotenv import load_dotenv
from supabase import create_client
from google import genai
from google.genai import types

# ─── Load environment variables ────────────────────────────────────────────────
load_dotenv()  # this will read .env in the current directory

SUPABASE_URL   = os.getenv("SUPABASE_URL")
SUPABASE_KEY   = os.getenv("SUPABASE_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not (SUPABASE_URL and SUPABASE_KEY and GEMINI_API_KEY):
    missing = [k for k in ("SUPABASE_URL", "SUPABASE_KEY", "GEMINI_API_KEY") if not os.getenv(k)]
    raise EnvironmentError(f"Missing environment variables: {', '.join(missing)}")

# ─── Initialize clients ────────────────────────────────────────────────────────
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
genai_client = genai.Client(api_key=GEMINI_API_KEY)

# ─── Helper: call Gemini to draft prescription ─────────────────────────────────
def generate_prescription_text(conversation: str) -> str:
    """
    Uses Google Gemini (gemini-2.0-flash) to draft a prescription in bullet-point form
    from the given conversation string.
    """
    response = genai_client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[conversation],
        config=types.GenerateContentConfig(
            system_instruction=(
                "You are an expert scribe. Review the dialogue and extract the key points, organizing them into clear, logical sections. "
                "Use concise bullet points under headings such as ‘Summary’, ‘Key Issues’, ‘Background’, ‘Decisions’, and ‘Action Items’. "
                "If any details are missing, infer reasonable phrasing to ensure each section is clear and complete."
            ),
            max_output_tokens=500,
            temperature=0.2
        )
    )
    return response.text.strip()

# ─── Batch‐update all pending records ───────────────────────────────────────────
def update_all():
    # Fetch VisitID, Conversation, and existing DigiPrescription
    rows = supabase.table("Main") \
        .select("VisitID, Conversation, DigiPrescription") \
        .execute().data

    # Only keep rows where DigiPrescription is null or empty
    pending = [r for r in rows if not r.get("DigiPrescription")]

    if not pending:
        print("Found 0 records to process.")
        return

    for row in pending:
        vid  = row["VisitID"]
        conv = row["Conversation"]
        try:
            # Generate prescription text via Gemini API
            prescription = generate_prescription_text(conv)

            # Write back to Supabase
            supabase.table("Main") \
                .update({"DigiPrescription": prescription}) \
                .eq("VisitID", vid) \
                .execute()

            print(f"[✔] VisitID {vid} updated.")
        except Exception as e:
            print(f"[✖] VisitID {vid} failed: {e}")

# ─── Entrypoint ────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    update_all()
