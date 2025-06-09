import google.generativeai as genai
import os

os.environ["GOOGLE_API_KEY"] = "AIzaSyC4q5Dn5S4iujdsbcQsvM_8gwWajbVp_yk"

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

def generate_fitness_plan(prompt: str) -> str:
    try:
        model = genai.GenerativeModel("models/gemini-1.5-flash")
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Gemini API error: {e}")
        return "Sorry, could not generate the plan at the moment."
