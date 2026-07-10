// MedAssist mock logic — frontend-only placeholders.
// Replace these with real OCR + AI backend calls later.

export interface MedicationInfo {
  medication: string;
  info: {
    what: string;
    uses: string[];
    dosage: string[];
    warnings: string[];
    interactions: string[];
    storage: string;
  };
  ai: string;
}

// Small mock "database" of common medications.
const MEDICATION_DB: Record<string, MedicationInfo> = {
  paracetamol: {
    medication: "Paracetamol (Acetaminophen)",
    info: {
      what: "A common over-the-counter pain reliever and fever reducer.",
      uses: ["Pain relief", "Fever reduction", "Headache & body aches"],
      dosage: [
        "Adults: 500–1000 mg every 4–6 hours",
        "Max 4000 mg per day (general guidance)",
      ],
      warnings: [
        "Avoid overdose — risk of liver damage",
        "Use caution with existing liver conditions",
        "Do not combine with other paracetamol products",
      ],
      interactions: ["Alcohol", "Warfarin", "Other paracetamol-containing drugs"],
      storage: "Store at room temperature, away from moisture and heat.",
    },
    ai: "Paracetamol is commonly used for pain relief and fever reduction. It is generally safe when taken within recommended limits.",
  },
  amoxicillin: {
    medication: "Amoxicillin",
    info: {
      what: "A penicillin-type antibiotic used to treat bacterial infections.",
      uses: ["Chest infections", "Ear infections", "Dental & urinary infections"],
      dosage: [
        "Adults: typically 250–500 mg every 8 hours",
        "Course length as directed by a clinician",
      ],
      warnings: [
        "Not effective against viral infections",
        "Complete the full prescribed course",
        "Tell your doctor about any penicillin allergy",
      ],
      interactions: ["Methotrexate", "Oral contraceptives", "Allopurinol"],
      storage: "Store below 25°C. Liquid forms may need refrigeration — check the label.",
    },
    ai: "Amoxicillin is an antibiotic used to treat a range of bacterial infections. It should only be used under medical guidance.",
  },
  ibuprofen: {
    medication: "Ibuprofen",
    info: {
      what: "A non-steroidal anti-inflammatory drug (NSAID) for pain and inflammation.",
      uses: ["Pain relief", "Inflammation", "Fever reduction"],
      dosage: [
        "Adults: 200–400 mg every 4–6 hours",
        "Max 1200 mg per day without medical advice",
      ],
      warnings: [
        "Take with food to reduce stomach upset",
        "Avoid with stomach ulcers or kidney issues",
        "Not recommended in late pregnancy",
      ],
      interactions: ["Aspirin", "Blood pressure medication", "Anticoagulants"],
      storage: "Store at room temperature, away from direct light.",
    },
    ai: "Ibuprofen relieves pain, inflammation, and fever. Taking it with food helps reduce stomach irritation.",
  },
  metformin: {
    medication: "Metformin",
    info: {
      what: "A first-line medication used to manage type 2 diabetes.",
      uses: ["Blood sugar control", "Type 2 diabetes management"],
      dosage: [
        "Typically 500 mg once or twice daily with meals",
        "Adjusted gradually by a clinician",
      ],
      warnings: [
        "May cause digestive upset initially",
        "Report muscle pain or unusual tiredness",
        "Requires periodic kidney function checks",
      ],
      interactions: ["Alcohol", "Contrast dyes", "Certain diuretics"],
      storage: "Store at room temperature in a dry place.",
    },
    ai: "Metformin helps control blood sugar in type 2 diabetes and is usually taken with meals.",
  },
};

// Mock OCR — pretends to extract text from an uploaded image/PDF.
export async function mockOCR(file: File): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  const name = file.name.toLowerCase();
  const known = Object.keys(MEDICATION_DB).find((med) => name.includes(med));
  if (known) {
    return `${known.charAt(0).toUpperCase() + known.slice(1)} 500mg tablets`;
  }
  // Default placeholder extraction result.
  return "Paracetamol 500mg tablets";
}

// Mock medication lookup — matches a name against the mock DB.
export function lookupMedication(text: string): MedicationInfo | null {
  const lower = text.toLowerCase();
  const match = Object.keys(MEDICATION_DB).find((med) => lower.includes(med));
  return match ? MEDICATION_DB[match] : null;
}

// Mock AI chat response for free-text questions.
export async function mockChatResponse(question: string): Promise<{
  reply: string;
  medication: MedicationInfo | null;
}> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  const med = lookupMedication(question);
  if (med) {
    return {
      reply: `${med.ai}\n\nI've added structured details to the Medication Insights panel. This is general information and not a substitute for professional medical advice.`,
      medication: med,
    };
  }
  return {
    reply:
      "I can help you understand medications safely. Try asking about a specific medicine (e.g. \"What is amoxicillin used for?\"), or upload a photo of the packaging or a prescription. Please note I provide general, non-diagnostic information only.",
    medication: null,
  };
}
