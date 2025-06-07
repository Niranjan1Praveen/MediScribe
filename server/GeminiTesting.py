import os
from flask import Flask, jsonify
from supabase import create_client
import requests

app = Flask(__name__)

# Load environment variables
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')  # Set this to your Gemini API key

# Initialize Supabase client\ssupabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Gemini REST endpoint (using text-bison-001 model)
GEMINI_ENDPOINT = (
    f"https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key={GEMINI_API_KEY}"
)

@app.route('/generate_prescription/<int:visit_id>', methods=['POST'])
def generate_prescription(visit_id):
    """
    Fetches the Conversation for a given VisitID, sends it to Gemini to draft
    a prescription in key pointers, and stores the result in DigiPrescription.
    """
    # Retrieve the Main record
    resp = (
        supabase
        .table('Main')
        .select('VisitID, Conversation')
        .eq('VisitID', visit_id)
        .single()
        .execute()
    )
    record = resp.data
    if not record:
        return jsonify({'error': 'Record not found'}), 404

    conversation_text = record.get('Conversation')
    prompt_text = f"From the conversation draft a Prescription in pointers:\n{conversation_text}"

    # Call Gemini API
    payload = {
        'prompt': {'text': prompt_text},
        'temperature': 0.2,
        'maxOutputTokens': 256
    }
    api_resp = requests.post(GEMINI_ENDPOINT, json=payload)
    if api_resp.status_code != 200:
        return jsonify({'error': 'Gemini API error', 'details': api_resp.text}), 500

    gemini_data = api_resp.json()
    # Extract the generated prescription
    prescription = gemini_data['candidates'][0]['output']

    # Update the Main record with the prescription
    update_resp = (
        supabase
        .table('Main')
        .update({'DigiPrescription': prescription})
        .eq('VisitID', visit_id)
        .execute()
    )
    if update_resp.error:
        return jsonify({'error': 'Failed to update record', 'details': update_resp.error}), 500

    return jsonify({
        'VisitID': visit_id,
        'DigiPrescription': prescription
    }), 200

if __name__ == '__main__':
    # Ensure environment vars are set
    required = ['SUPABASE_URL', 'SUPABASE_KEY', 'GEMINI_API_KEY']
    missing = [var for var in required if not os.getenv(var)]
    if missing:
        raise EnvironmentError(f"Missing environment variables: {', '.join(missing)}")

    app.run(host='0.0.0.0', port=5000, debug=True)
