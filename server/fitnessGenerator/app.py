from flask import Flask, render_template, request, jsonify
from services.supabase_service import get_patient_by_name, search_patient_names
from flask_cors import CORS  # Import CORS
from services.gemini_service import generate_fitness_plan  # Updated function name

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/search-patients")
def search_patients():
    query = request.args.get("q", "")
    matches = search_patient_names(query)
    return jsonify(matches)

@app.route("/generate-plan", methods=["POST"])
def generate_plan():
    patient_name = request.form.get("patient_name")
    if not patient_name:
        return jsonify({"error": "Patient name is required."}), 400

    patient = get_patient_by_name(patient_name)
    if not patient:
        return jsonify({"error": f"No patient found with name '{patient_name}'."}), 404

    # Build prompt from patient data
    prompt = f"""
You are a certified health expert. Create a customized **diet plan** and **exercise routine** for the following patient:

Name: {patient.get("name")}
Age: {patient.get("age")}
Dietary Preferences: {patient.get("dietaryPreferences")}
Health Goals: {patient.get("healthGoals")}
Conditions: {patient.get("conditions")}
Allergies: {patient.get("allergies")}
Key Issues: {patient.get("keyIssues")}
Medications: {patient.get("medications")}
Prescription Text: {patient.get("prescriptionText")} 

Instructions:
1. The diet plan should be practical, economical, and for lower, middle class indian people.
2. The exercise plan should consider the patient's health conditions and be suitable for daily practice.
3. Avoid any special characters, markdown, or formatting like asterisks and use onlhy numbers as pointers.
4. Use plain text and clear headings like 'Diet Plan:' and 'Exercise Plan:'.
5. Provide a complete and friendly plan for both diet and fitness.
6. Do not include any medical disclaimers, suggestions to consult a doctor or dietitian, or generic safety notes. Provide only the requested personalized diet and exercise plan.

"""

    try:
        full_plan = generate_fitness_plan(prompt)
    except Exception as e:
        return f"Error generating fitness plan: {e}", 500

    return render_template("index.html", full_plan=full_plan, patient_name=patient_name)

if __name__ == "__main__":
    app.run(debug=True)
