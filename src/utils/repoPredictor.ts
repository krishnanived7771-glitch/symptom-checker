import weightsData from '../data/modelWeights.json';

export const CONTEXT_SET = new Set([
  'mosquito_bites',
  'travel_endemic_area',
  'contact_sick_person',
  'sudden_onset',
]);

export const CONTEXT_TEXT: Record<string, string> = {
  mosquito_bites: 'Recently bitten by mosquitoes',
  travel_endemic_area: 'Recently travelled to a malaria/dengue area',
  contact_sick_person: 'Recent contact with a sick person',
  sudden_onset: 'Symptoms started suddenly',
};

export const EMERGENCY_SET = new Set([
  'chest_pain',
  'pain_radiating_arm_jaw_back',
  'fainting',
  'seizure',
  'vomiting_blood',
  'blood_in_stool',
  'gum_bleeding',
  'nosebleed',
  'severe_abdominal_pain',
  'shortness_of_breath',
  'slurred_speech',
  'confusion',
]);

export const DISCLAIMER =
  'This tool is for educational purposes only and is not medical advice. See a doctor for any health concern.';

export const EMERGENCY_MESSAGE =
  'Some of your symptoms can be serious. Please seek medical help immediately or call 108.';

export const NICE_LABELS: Record<string, string> = {
  cyclic_fever_chills: 'Fever and chills that come and go in cycles',
  high_fever: 'Sudden high fever',
  bone_joint_pain: 'Bone or joint pain',
  severe_frontal_headache: 'Severe headache at the front of the head',
  pain_behind_eyes: 'Pain behind the eyes',
  lightheaded_on_standing: 'Lightheaded when standing up',
  irritability_anxiety: 'Irritable or anxious',
  tingling_around_mouth: 'Tingling around the mouth',
  pain_radiating_arm_jaw_back: 'Pain spreading to arm, jaw or back',
  indigestion_heartburn: 'Indigestion or heartburn-like discomfort',
  sense_of_doom: 'Sense of impending doom',
  rapid_shallow_breathing: 'Rapid, shallow breathing',
  weak_pulse: 'Weak pulse',
  fast_heartbeat: 'Fast heartbeat',
  altered_taste: 'Bitter, metallic or lost taste',
  rash_different_stages: 'Rash with spots, blisters and scabs at the same time',
  swollen_lymph_nodes: 'Swollen glands (neck or armpits)',
  gum_bleeding: 'Bleeding gums',
  nosebleed: 'Nosebleeds',
  thirst_dry_mouth: 'Severe thirst or dry mouth',
  cold_clammy_skin: 'Cold, clammy skin',
  abdominal_pain: 'Stomach pain',
  severe_abdominal_pain: 'Severe stomach pain',
  fluid_filled_blisters: 'Fluid-filled blisters',
  scabs_crusts: 'Scabs or crusts',
  mosquito_bites: 'Recently bitten by mosquitoes',
  travel_endemic_area: 'Recently travelled to a malaria/dengue area',
  contact_sick_person: 'Recent contact with a sick person',
  sudden_onset: 'Symptoms started suddenly',
};

export const DISEASE_INFO: Record<string, string> = {
  'Low Blood Sugar':
    "If you're awake and able to swallow, something sugary usually helps. Get help right away if there's confusion, fainting or a seizure.",
  'Low Blood Pressure':
    'Sit or lie down and drink fluids. See a doctor if you faint or feel dizzy often.',
  Malaria:
    'Needs a blood test to confirm. See a doctor promptly, especially after time in an affected area.',
  Dengue:
    'Needs a blood test to confirm. Rest and drink fluids, and ask a doctor before taking painkillers. Seek urgent care for bleeding, severe stomach pain or repeated vomiting.',
  'Common Cold':
    'Usually clears up within about a week with rest and fluids.',
  Chickenpox:
    'Try not to scratch. Stay away from newborns, pregnant women and people with weak immunity, and see a doctor to confirm.',
  'Heart Attack':
    'A heart attack is an emergency. If you have chest pain or pressure, call 108 or your local emergency number immediately.',
};

/**
 * Characteristic clinical symptoms for explainability (Point 2)
 */
export const KEY_SYMPTOMS_BY_DISEASE: Record<string, string[]> = {
  'Low Blood Sugar': [
    'shakiness',
    'hunger',
    'sweating',
    'dizziness',
    'irritability_anxiety',
    'fast_heartbeat',
    'tingling_around_mouth',
    'confusion',
    'fainting',
    'seizure',
  ],
  'Low Blood Pressure': [
    'lightheaded_on_standing',
    'dizziness',
    'fainting',
    'blurred_vision',
    'weakness',
    'fatigue',
    'cold_clammy_skin',
    'pale_skin',
    'weak_pulse',
  ],
  Malaria: [
    'cyclic_fever_chills',
    'high_fever',
    'chills',
    'sweating',
    'headache',
    'muscle_aches',
    'mosquito_bites',
    'travel_endemic_area',
    'jaundice',
  ],
  Dengue: [
    'high_fever',
    'severe_frontal_headache',
    'pain_behind_eyes',
    'bone_joint_pain',
    'rash',
    'mosquito_bites',
    'gum_bleeding',
    'nosebleed',
    'severe_abdominal_pain',
  ],
  'Common Cold': [
    'runny_nose',
    'nasal_congestion',
    'sneezing',
    'sore_throat',
    'cough',
    'contact_sick_person',
  ],
  Chickenpox: [
    'itchy_rash',
    'rash_different_stages',
    'fluid_filled_blisters',
    'scabs_crusts',
    'rash',
    'fever',
    'contact_sick_person',
  ],
  'Heart Attack': [
    'chest_pain',
    'pain_radiating_arm_jaw_back',
    'shortness_of_breath',
    'sweating',
    'cold_clammy_skin',
    'sense_of_doom',
    'fast_heartbeat',
    'weak_pulse',
  ],
};

/**
 * Tailored diagnostic questions for physician consultation (Point 2 & 4)
 */
export const QUESTIONS_BY_DISEASE: Record<string, string[]> = {
  'Low Blood Sugar': [
    'Could these symptoms indicate reactive or medication-induced hypoglycemia?',
    'Should we schedule a fasting blood glucose, oral glucose tolerance test, or HbA1c test?',
    'What target blood sugar range and fast-acting carbohydrate rescue plan do you advise?',
  ],
  'Low Blood Pressure': [
    'Could this be orthostatic hypotension, dehydration, or a medication side effect?',
    'Should we compare my sitting versus standing blood pressure and pulse?',
    'What fluid, electrolyte, or dietary measures should I follow to avoid fainting?',
  ],
  Malaria: [
    'Given my fever cycles and mosquito/travel history, should we run an immediate Malaria Rapid Diagnostic Test (RDT) or thick and thin blood smears?',
    'What specific antimalarial therapy (such as ACT) should be initiated if confirmed?',
    'Are there red-flag signs (like jaundice or dark urine) I should immediately watch out for?',
  ],
  Dengue: [
    'Could my acute fever and retro-orbital/joint pain indicate dengue virus infection?',
    'Should we check my Complete Blood Count (CBC) today to establish a baseline platelet count and hematocrit?',
    'What exact emergency warning signs (such as gum bleeding or persistent vomiting) require urgent hospital admission?',
  ],
  'Common Cold': [
    'Does my presentation appear to be an uncomplicated viral upper respiratory infection?',
    'Are there secondary bacterial complications (like sinusitis or otitis) to look out for if symptoms persist past 7 days?',
    'Which supportive remedies or nasal rinses are most appropriate for my health profile?',
  ],
  Chickenpox: [
    'Can you clinically examine the rash to confirm varicella (chickenpox)?',
    'Would an oral antiviral (such as acyclovir) be beneficial if started within the initial window?',
    'How many days of home isolation are required until all blisters form dry crusts to protect others?',
  ],
  'Heart Attack': [
    'URGENT: Can we perform an immediate 12-lead ECG and stat cardiac troponin blood tests?',
    'What emergency coronary care protocols should be initiated right now?',
    'What is the safest immediate position and oxygenation strategy while undergoing evaluation?',
  ],
};

export function pretty(symptomId: string): string {
  if (CONTEXT_TEXT[symptomId]) return CONTEXT_TEXT[symptomId];
  if (NICE_LABELS[symptomId]) return NICE_LABELS[symptomId];
  return symptomId.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

export interface ApiSymptomItem {
  id: string;
  label: string;
  type: 'context' | 'symptom';
  emergency: boolean;
}

export function getAllSymptoms(): ApiSymptomItem[] {
  return weightsData.features.map((s: string) => ({
    id: s,
    label: pretty(s),
    type: CONTEXT_SET.has(s) ? 'context' : 'symptom',
    emergency: EMERGENCY_SET.has(s),
  }));
}

export interface PredictionItem {
  disease: string;
  label: 'Most likely' | 'Possible' | 'Less likely';
  score: number;
  matched_symptoms: string[];
  unreported_key_symptoms: string[];
  questions_for_doctor: string[];
}

export interface DoctorHandout {
  report_id: string;
  generated_at: string;
  total_symptoms_reported: number;
  emergency_warning: boolean;
  flagged_red_flags: string[];
  top_condition: string;
  top_confidence: number;
  symptoms_reported: { id: string; label: string; is_emergency: boolean }[];
  suggested_questions: string[];
  clinical_disclaimer: string;
}

export interface PredictResponse {
  predictions: PredictionItem[];
  emergency_flags: string[];
  few_symptoms_warning: boolean;
  emergency: boolean;
  emergency_message: string;
  disclaimer: string;
  doctor_handout?: DoctorHandout;
}

/**
 * Exact Bernoulli Naive Bayes implementation matching scikit-learn's BernoulliNB()
 * with Clinical Explainability (Point 2) and Formatted Doctor Handout (Point 4).
 */
export function predictTop3(selectedSymptoms: string[]): PredictResponse {
  if (!Array.isArray(selectedSymptoms) || selectedSymptoms.length === 0) {
    throw new Error("Send a non-empty list called 'symptoms'.");
  }

  const featureSet = new Set(weightsData.features);
  const unknown = selectedSymptoms.filter((s) => !featureSet.has(s));
  if (unknown.length > 0) {
    throw new Error(`Unknown symptoms: [${unknown.map((u) => `'${u}'`).join(', ')}]`);
  }

  const selectedSet = new Set(selectedSymptoms);
  // Guarantee COVID-19 is filtered out
  const diseases = (weightsData.diseases as string[]).filter((d) => d !== 'COVID-19');
  const counts = weightsData.counts as Record<string, Record<string, number>>;
  const totals = weightsData.totals as Record<string, number>;
  const totalSamples = weightsData.total_samples as number;

  const logScores: Record<string, number> = {};

  for (const d of diseases) {
    const N = totals[d] || 300;
    let logProb = Math.log(N / totalSamples); // prior log P(d)

    for (const f of weightsData.features) {
      const fCount = (counts[d] && counts[d][f]) || 0;
      // Laplace smoothing with alpha = 1.0 (scikit-learn default)
      const p1 = (fCount + 1) / (N + 2);
      if (selectedSet.has(f)) {
        logProb += Math.log(p1);
      } else {
        logProb += Math.log(1 - p1);
      }
    }
    logScores[d] = logProb;
  }

  // Softmax to normalize probabilities
  const maxLog = Math.max(...diseases.map((d) => logScores[d]));
  const expScores: Record<string, number> = {};
  let sumExp = 0;

  for (const d of diseases) {
    const val = Math.exp(logScores[d] - maxLog);
    expScores[d] = val;
    sumExp += val;
  }

  const probs = diseases.map((d) => ({
    disease: d,
    prob: expScores[d] / sumExp,
  }));

  probs.sort((a, b) => b.prob - a.prob);
  const ranked = probs.slice(0, 3);

  function getLabel(rank: number, p: number): 'Most likely' | 'Possible' | 'Less likely' {
    if (rank === 0) {
      return p >= 0.4 ? 'Most likely' : 'Possible';
    }
    return p >= 0.1 ? 'Possible' : 'Less likely';
  }

  // Generate explainability breakdown for each prediction (Point 2)
  const predictions: PredictionItem[] = ranked.map((item, idx) => {
    const keySymptoms = KEY_SYMPTOMS_BY_DISEASE[item.disease] || [];
    
    // Matched symptoms: symptoms the patient selected that are characteristic of this disease
    const matched = keySymptoms
      .filter((s) => selectedSet.has(s))
      .map((s) => pretty(s));

    // Also include any other reported symptoms if none of key symptoms matched directly
    if (matched.length === 0) {
      selectedSymptoms.slice(0, 3).forEach((s) => matched.push(pretty(s)));
    }

    // Unreported key symptoms: characteristic symptoms that patient did NOT report
    const unreported = keySymptoms
      .filter((s) => !selectedSet.has(s))
      .slice(0, 3)
      .map((s) => pretty(s));

    // Tailored questions for doctor
    const questions = QUESTIONS_BY_DISEASE[item.disease] || [
      'What specific diagnostic test can definitively confirm or rule out this condition?',
      'Are there warning signs I should monitor that require urgent medical attention?',
    ];

    return {
      disease: item.disease,
      label: getLabel(idx, item.prob),
      score: Math.round(item.prob * 1000) / 10,
      matched_symptoms: matched,
      unreported_key_symptoms: unreported,
      questions_for_doctor: questions,
    };
  });

  const emergencyFlags = [...selectedSet].filter((s) => EMERGENCY_SET.has(s)).sort();
  const isEmergency = emergencyFlags.length > 0;

  // Generate Doctor Handout (Point 4)
  const reportCode = 'MC-' + Math.floor(10000 + Math.random() * 90000);
  const now = new Date();
  const topCond = predictions[0] ? predictions[0].disease : 'Undetermined';
  const topQuestions = predictions[0] ? predictions[0].questions_for_doctor : [];

  const doctorHandout: DoctorHandout = {
    report_id: reportCode,
    generated_at: now.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
    total_symptoms_reported: selectedSymptoms.length,
    emergency_warning: isEmergency,
    flagged_red_flags: emergencyFlags.map((id) => pretty(id)),
    top_condition: topCond,
    top_confidence: predictions[0] ? predictions[0].score : 0,
    symptoms_reported: selectedSymptoms.map((id) => ({
      id,
      label: pretty(id),
      is_emergency: EMERGENCY_SET.has(id),
    })),
    suggested_questions: topQuestions,
    clinical_disclaimer: DISCLAIMER,
  };

  return {
    predictions,
    emergency_flags: emergencyFlags,
    few_symptoms_warning: selectedSymptoms.length < 3,
    emergency: isEmergency,
    emergency_message: isEmergency ? EMERGENCY_MESSAGE : '',
    disclaimer: DISCLAIMER,
    doctor_handout: doctorHandout,
  };
}
