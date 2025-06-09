from supabase import create_client, Client

# Supabase config
SUPABASE_URL = "https://bnminmdgnjnkfkxfdgcf.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJubWlubWRnbmpua2ZreGZkZ2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDU0NzAsImV4cCI6MjA2NDc4MTQ3MH0.SoQYKjq_QMNKs5W6zK-ujVE2t9i1Zr-uiiEHJyzqifk"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_patient_by_name(name: str):

    response = supabase.table("Patient").select("*").eq("name", name).limit(1).execute()
    if not response.data:
        return None
    return response.data[0]

def search_patient_names(query: str):

    response = (
        supabase.table("Patient")
        .select("name")
        .ilike("name", f"%{query}%")
        .limit(10)
        .execute()
    )
    return [item["name"] for item in response.data]
