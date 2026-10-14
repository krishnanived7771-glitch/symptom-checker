import { CONDITIONS, Condition } from '../data/conditions';
import { SYMPTOM_MAP } from '../data/symptoms';

export interface PredictionResult {
  diseaseId: string;
  disease: string;
  medicalTitle: string;
  category: string;
  label: 'Most likely' | 'Possible' | 'Less likely';
  confidenceScore: number; // 0 to 100
  matchedSymptoms: string[];
  missingKeySymptoms: string[];
  isEmergency: boolean;
  advice: string;
  immediateActions: string[];
  whenToSeekEmergency: string[];
}

export interface TriageOutput {
  hasEmergencySymptoms: boolean;
  emergencySymptomsList: string[];
  fewSymptomsWarning: boolean;
  predictions: PredictionResult[];
  disclaimer: string;
  topCondition: PredictionResult | null;
}

export function evaluateSymptoms(selectedSymptomIds: string[]): TriageOutput {
  const selectedSet = new Set(selectedSymptomIds);
  const emergencySymptomsList: string[] = [];

  for (const id of selectedSymptomIds) {
    const s = SYMPTOM_MAP.get(id);
    if (s && s.emergency) {
      emergencySymptomsList.push(s.label);
    }
  }

  const results: PredictionResult[] = [];

  for (const cond of CONDITIONS) {
    const sigKeys = Object.keys(cond.signatureSymptoms);
    let matchedWeight = 0;
    let totalPossibleWeight = 0;
    const matchedSymptoms: string[] = [];
    const missingKeySymptoms: string[] = [];

    for (const [symId, weight] of Object.entries(cond.signatureSymptoms)) {
      totalPossibleWeight += weight;
      if (selectedSet.has(symId)) {
        matchedWeight += weight;
        const sym = SYMPTOM_MAP.get(symId);
        if (sym) matchedSymptoms.push(sym.label);
      } else {
        if (weight >= 4) {
          const sym = SYMPTOM_MAP.get(symId);
          if (sym) missingKeySymptoms.push(sym.label);
        }
      }
    }

    // Unmatched selected symptoms penalty (slight specificity adjustment)
    const extraSymptomsCount = selectedSymptomIds.filter(
      (id) => !cond.signatureSymptoms[id]
    ).length;
    const extraPenalty = Math.min(extraSymptomsCount * 1.5, 12);

    // Raw score based on weighted match
    const rawScore = totalPossibleWeight > 0 ? (matchedWeight / totalPossibleWeight) * 100 : 0;
    const adjustedScore = Math.max(0, Math.round(rawScore - extraPenalty));

    // Boost score if specific emergency hallmark matches (e.g. chest_pain + arm radiation for heart attack)
    let finalScore = adjustedScore;
    if (cond.id === 'heart_attack' && selectedSet.has('chest_pain') && selectedSet.has('pain_radiating_arm_jaw_back')) {
      finalScore = Math.min(100, finalScore + 18);
    }
    if (cond.id === 'malaria' && selectedSet.has('cyclic_fever_chills') && (selectedSet.has('travel_endemic_area') || selectedSet.has('mosquito_bites'))) {
      finalScore = Math.min(100, finalScore + 20);
    }
    if (cond.id === 'chickenpox' && selectedSet.has('rash_different_stages')) {
      finalScore = Math.min(100, finalScore + 25);
    }
    if (cond.id === 'dengue' && selectedSet.has('high_fever') && selectedSet.has('pain_behind_eyes') && selectedSet.has('bone_joint_pain')) {
      finalScore = Math.min(100, finalScore + 20);
    }

    if (matchedSymptoms.length > 0) {
      results.push({
        diseaseId: cond.id,
        disease: cond.name,
        medicalTitle: cond.medicalTitle,
        category: cond.category,
        label: 'Possible', // will calibrate below
        confidenceScore: finalScore,
        matchedSymptoms,
        missingKeySymptoms: missingKeySymptoms.slice(0, 3),
        isEmergency: cond.isEmergency,
        advice: cond.consultationNote,
        immediateActions: cond.immediateActions,
        whenToSeekEmergency: cond.whenToSeekEmergency,
      });
    }
  }

  // Sort descending by confidence score
  results.sort((a, b) => b.confidenceScore - a.confidenceScore);

  // Calibrate labels
  if (results.length > 0) {
    const highestScore = results[0].confidenceScore;
    results.forEach((r, idx) => {
      if (idx === 0 && highestScore >= 35) {
        r.label = 'Most likely';
      } else if (r.confidenceScore >= 20 || (highestScore > 0 && r.confidenceScore >= highestScore * 0.65)) {
        r.label = 'Possible';
      } else {
        r.label = 'Less likely';
      }
    });
  }

  return {
    hasEmergencySymptoms: emergencySymptomsList.length > 0,
    emergencySymptomsList,
    fewSymptomsWarning: selectedSymptomIds.length > 0 && selectedSymptomIds.length < 3,
    predictions: results,
    topCondition: results.length > 0 ? results[0] : null,
    disclaimer:
      'MediCore is an educational triage screening tool for informational purposes only and does not provide a formal medical diagnosis. It evaluates seven common conditions (Heart Attack, Dengue, Malaria, Low Blood Sugar, Low Blood Pressure, Common Cold, Chickenpox). Always seek the guidance of a qualified medical doctor or emergency services for any acute illness or injury.',
  };
}
