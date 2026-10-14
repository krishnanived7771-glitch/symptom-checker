export interface Condition {
  id: string;
  name: string;
  medicalTitle: string;
  category: 'Cardiovascular' | 'Metabolic' | 'Infectious Disease' | 'Respiratory' | 'Viral / Rash';
  isEmergency: boolean;
  signatureSymptoms: { [symptomId: string]: number }; // weight 1 to 5
  description: string;
  immediateActions: string[];
  whenToSeekEmergency: string[];
  consultationNote: string;
}

export const CONDITIONS: Condition[] = [
  {
    id: 'heart_attack',
    name: 'Heart Attack',
    medicalTitle: 'Acute Myocardial Infarction',
    category: 'Cardiovascular',
    isEmergency: true,
    signatureSymptoms: {
      chest_pain: 5,
      pain_radiating_arm_jaw_back: 5,
      shortness_of_breath: 4,
      cold_clammy_skin: 4,
      sense_of_doom: 4,
      fast_heartbeat: 3,
      weak_pulse: 4,
      nausea: 3,
      indigestion_heartburn: 3,
      rapid_shallow_breathing: 3,
      pale_skin: 3,
      dizziness: 3,
      sudden_onset: 3,
    },
    description:
      'A life-threatening medical emergency where blood flow to a portion of the heart muscle is severely blocked. Every minute of delay causes further muscle damage.',
    immediateActions: [
      'Call emergency dispatch (108) immediately. Do not drive yourself.',
      'Chew and swallow one adult aspirin (325 mg) or two low-dose aspirins if not allergic and instructed by emergency dispatch.',
      'Sit or lie down in a comfortable position, loosen tight clothing around neck and waist, and try to remain calm.',
      'If you have prescribed nitroglycerin, take it as directed by your physician.',
    ],
    whenToSeekEmergency: [
      'Any unexplained chest pressure, squeezing, or radiating pain to the left arm, neck, jaw, or upper back.',
      'Shortness of breath accompanied by cold sweat, dizziness, or profound anxiety.',
    ],
    consultationNote:
      'A heart attack is an emergency. If you have chest pain or pressure, call your local emergency number immediately.',
  },
  {
    id: 'dengue',
    name: 'Dengue Fever',
    medicalTitle: 'Dengue Virus Infection',
    category: 'Infectious Disease',
    isEmergency: false,
    signatureSymptoms: {
      high_fever: 5,
      severe_frontal_headache: 5,
      pain_behind_eyes: 5,
      bone_joint_pain: 5,
      rash: 4,
      muscle_aches: 4,
      nausea: 3,
      vomiting: 3,
      swollen_lymph_nodes: 3,
      mosquito_bites: 4,
      travel_endemic_area: 4,
      sudden_onset: 4,
      // Warning signs:
      gum_bleeding: 5,
      nosebleed: 5,
      severe_abdominal_pain: 5,
      easy_bruising: 4,
      vomiting_blood: 5,
      blood_in_stool: 5,
    },
    description:
      'A mosquito-borne viral infection caused by the dengue virus. Characterized by sudden high fever, intense retro-orbital headache, and severe deep joint and bone pain ("breakbone fever").',
    immediateActions: [
      'Consult a physician promptly for a complete blood count (CBC) to monitor platelet count and hematocrit.',
      'Maintain strict hydration with oral rehydration solution (ORS), coconut water, or electrolyte fluids.',
      'Use acetaminophen / paracetamol for fever if cleared by a doctor. STRICTLY AVOID ibuprofen, aspirin, naproxen, or NSAIDs, as they dramatically increase internal bleeding risk.',
      'Rest in a cool room, preferably under a mosquito net to prevent transmission.',
    ],
    whenToSeekEmergency: [
      'Any warning signs: bleeding from gums or nose, vomiting blood, black stools, persistent severe belly pain, or extreme drowsiness/restlessness.',
      'Sudden drop in body temperature with rapid pulse or cold/clammy extremities (Dengue Shock Syndrome).',
    ],
    consultationNote:
      'Needs a blood test to confirm. Rest and drink fluids, and ask a doctor before taking painkillers. Seek urgent care for bleeding, severe stomach pain, or repeated vomiting.',
  },
  {
    id: 'malaria',
    name: 'Malaria',
    medicalTitle: 'Plasmodium Parasite Infection',
    category: 'Infectious Disease',
    isEmergency: false,
    signatureSymptoms: {
      cyclic_fever_chills: 5,
      high_fever: 4,
      chills: 5,
      sweating: 4,
      headache: 3,
      muscle_aches: 3,
      fatigue: 4,
      nausea: 3,
      vomiting: 3,
      jaundice: 4,
      mosquito_bites: 4,
      travel_endemic_area: 5,
    },
    description:
      'A serious, potentially life-threatening infectious disease caused by Plasmodium parasites transmitted through the bites of infected female Anopheles mosquitoes.',
    immediateActions: [
      'Seek immediate clinical diagnostic evaluation (rapid diagnostic test or thick/thin blood smear).',
      'If confirmed, start targeted prescription antimalarial therapy (such as artemisinin-based combination therapy) without delay.',
      'Hydrate extensively and rest.',
    ],
    whenToSeekEmergency: [
      'Altered consciousness, severe confusion, seizure, or coma (Cerebral Malaria).',
      'Yellow skin or yellow eyes (jaundice), severe dark/tea-colored urine, or difficulty breathing.',
    ],
    consultationNote:
      'Needs a blood test to confirm. See a doctor promptly, especially after spending time in an affected or tropical area.',
  },
  {
    id: 'low_blood_sugar',
    name: 'Low Blood Sugar',
    medicalTitle: 'Hypoglycemia',
    category: 'Metabolic',
    isEmergency: false,
    signatureSymptoms: {
      shakiness: 5,
      sweating: 4,
      hunger: 5,
      irritability_anxiety: 4,
      dizziness: 4,
      fast_heartbeat: 4,
      pale_skin: 3,
      tingling_around_mouth: 4,
      blurred_vision: 3,
      clumsiness: 3,
      sudden_onset: 4,
      // severe signs:
      confusion: 5,
      slurred_speech: 4,
      fainting: 5,
      seizure: 5,
    },
    description:
      'A clinical condition caused by abnormally low levels of glucose in the bloodstream (< 70 mg/dL or 3.9 mmol/L). Common in people taking insulin or specific diabetes medications, but can occur after fasting or extreme exertion.',
    immediateActions: [
      'Follow the "Rule of 15": Consume 15–20 grams of fast-acting carbohydrates immediately (e.g., 4 oz / 120 mL of fruit juice, regular soda, 3–4 glucose tablets, or 1 tablespoon of sugar/honey).',
      'Wait 15 minutes, rest, and recheck blood sugar level if a glucometer is available.',
      'If still below 70 mg/dL, repeat the 15 grams of fast carbs.',
      'Once glucose returns to normal, eat a small balanced meal or snack with complex carbs and protein (e.g., crackers with cheese or peanut butter).',
    ],
    whenToSeekEmergency: [
      'The person becomes confused, cannot swallow safely, loses consciousness, or experiences a seizure. (Administer glucagon if trained and call emergency services immediately; DO NOT put liquids into an unconscious person\'s mouth).',
    ],
    consultationNote:
      "If you're awake and able to swallow, something sugary usually helps. Get help right away if there's confusion, fainting, or a seizure.",
  },
  {
    id: 'low_blood_pressure',
    name: 'Low Blood Pressure',
    medicalTitle: 'Hypotension / Orthostatic Hypotension',
    category: 'Cardiovascular',
    isEmergency: false,
    signatureSymptoms: {
      lightheaded_on_standing: 5,
      dizziness: 5,
      fainting: 4,
      blurred_vision: 4,
      weakness: 4,
      fatigue: 3,
      cold_clammy_skin: 3,
      pale_skin: 3,
      rapid_shallow_breathing: 3,
      weak_pulse: 3,
      thirst_dry_mouth: 3,
    },
    description:
      'Blood pressure readings consistently or acutely below 90/60 mmHg, or a dramatic drop upon standing upright, depriving the brain and vital organs of adequate oxygenated blood flow.',
    immediateActions: [
      'Sit or lie down immediately with legs elevated above heart level to restore blood flow to the head.',
      'Drink 1–2 glasses of water or electrolyte solution to expand circulating blood volume.',
      'Stand up slowly and deliberately in gradual stages: lie to sit, pause, then sit to stand.',
      'Avoid sudden hot showers or prolonged motionless standing.',
    ],
    whenToSeekEmergency: [
      'Fainting episode with head strike or injury.',
      'Low blood pressure accompanied by chest pain, shortness of breath, dark tarry stools, or persistent high fever (septic or cardiogenic shock).',
    ],
    consultationNote:
      'Sit or lie down and drink fluids. See a doctor if you faint or feel dizzy often.',
  },

  {
    id: 'common_cold',
    name: 'Common Cold',
    medicalTitle: 'Upper Respiratory Tract Infection (Rhinovirus)',
    category: 'Respiratory',
    isEmergency: false,
    signatureSymptoms: {
      runny_nose: 5,
      nasal_congestion: 5,
      sneezing: 5,
      sore_throat: 4,
      cough: 4,
      headache: 2,
      fatigue: 2,
      contact_sick_person: 3,
    },
    description:
      'A mild viral infection of the upper respiratory tract, most commonly caused by rhinoviruses. Typically self-limiting and clears without specialized treatment.',
    immediateActions: [
      'Ensure plenty of restful sleep and hydrate with water, broths, and warm tea with honey.',
      'Use saline nasal sprays or rinses to clear nasal passages gently.',
      'Suck on throat lozenges or gargle with warm salt water for throat relief.',
      'Wash hands frequently to avoid spreading virus to others.',
    ],
    whenToSeekEmergency: [
      'High sustained fever (> 38.5°C / 101.3°F), severe earache, shortness of breath, or symptoms persisting longer than 10–14 days without improvement.',
    ],
    consultationNote:
      'Usually clears up within about a week with rest and fluids.',
  },
  {
    id: 'chickenpox',
    name: 'Chickenpox',
    medicalTitle: 'Varicella Zoster Virus Infection',
    category: 'Viral / Rash',
    isEmergency: false,
    signatureSymptoms: {
      itchy_rash: 5,
      rash_different_stages: 5,
      fluid_filled_blisters: 5,
      scabs_crusts: 4,
      rash: 4,
      fever: 4,
      fatigue: 3,
      loss_of_appetite: 3,
      headache: 3,
      contact_sick_person: 4,
    },
    description:
      'A highly contagious infection caused by the Varicella-Zoster virus. Hallmark is a telltale polymorphic rash where pink bumps, fluid-filled clear blisters, and crusted scabs are present on the body simultaneously.',
    immediateActions: [
      'Isolate strictly at home until all blisters have fully dried into scabs (typically 7–10 days).',
      'Stay away from newborns, pregnant individuals, and immunocompromised persons.',
      'Apply calamine lotion or cool compresses to soothe severe itching; take oatmeal baths.',
      'Trim fingernails short to prevent skin scratching and secondary bacterial skin infections.',
      'NEVER give aspirin to children or teenagers with chickenpox (risk of life-threatening Reye\'s syndrome).',
    ],
    whenToSeekEmergency: [
      'Rash spreads to eyes, skin sores become extremely red, hot, swollen, or leak yellow pus.',
      'Extreme drowsiness, unsteady walking, or persistent high fever.',
    ],
    consultationNote:
      'Try not to scratch. Stay away from newborns, pregnant women, and people with weak immunity, and see a doctor to confirm.',
  },
];

export const CONDITION_MAP = new Map<string, Condition>(
  CONDITIONS.map((c) => [c.id, c])
);
