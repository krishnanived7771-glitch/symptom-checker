import React, { useState, useEffect, useMemo } from 'react';
import { REGIONS, RegionId, SYMPTOM_MAP } from './data/symptoms';
import {
  getAllSymptoms,
  predictTop3,
  PredictResponse,
  ApiSymptomItem,
  EMERGENCY_SET,
  EMERGENCY_MESSAGE,
} from './utils/repoPredictor';
import { BodyChart } from './components/BodyChart';
import { SymptomChecklist } from './components/SymptomChecklist';
import { EmergencyAlert } from './components/EmergencyAlert';
import { ResultsPanel } from './components/ResultsPanel';
import { DoctorHandoutModal } from './components/DoctorHandoutModal';
import {
  RotateCcw,
  Sparkles,
  Printer,
  ChevronRight,
  X,
  Stethoscope,
  PhoneCall,
  Info,
  FileText,
} from 'lucide-react';

export default function App() {
  const [symptomsList, setSymptomsList] = useState<ApiSymptomItem[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());
  const [activeRegion, setActiveRegion] = useState<RegionId>('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<PredictResponse | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showScopeInfo, setShowScopeInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDoctorHandoutOpen, setIsDoctorHandoutOpen] = useState(false);

  // Initialize symptoms from /api/symptoms (identical to Flask backend in repo)
  useEffect(() => {
    async function loadSymptoms() {
      try {
        const res = await fetch('/api/symptoms');
        if (res.ok) {
          const data: ApiSymptomItem[] = await res.json();
          setSymptomsList(data);
        } else {
          setSymptomsList(getAllSymptoms());
        }
      } catch {
        // Fallback to internal list if network is not ready
        setSymptomsList(getAllSymptoms());
      }
    }
    loadSymptoms();
  }, []);

  // Count of selected symptoms per anatomical region
  const selectedCountsByRegion = useMemo(() => {
    const counts: Record<RegionId, number> = {
      general: 0,
      head: 0,
      chest: 0,
      abdomen: 0,
      skin: 0,
      body: 0,
      situation: 0,
    };
    for (const id of selectedSymptoms) {
      const sym = SYMPTOM_MAP.get(id);
      if (sym) {
        counts[sym.region] = (counts[sym.region] || 0) + 1;
      }
    }
    return counts;
  }, [selectedSymptoms]);

  // List of emergency symptoms currently selected
  const emergencySymptomsList = useMemo(() => {
    const list: string[] = [];
    for (const id of selectedSymptoms) {
      if (EMERGENCY_SET.has(id)) {
        const sym = SYMPTOM_MAP.get(id);
        list.push(sym ? sym.label : id.replace(/_/g, ' '));
      }
    }
    return list;
  }, [selectedSymptoms]);

  const toggleSymptom = (id: string) => {
    const next = new Set(selectedSymptoms);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedSymptoms(next);
    setErrorMessage(null);
    if (results) {
      if (next.size === 0) {
        setResults(null);
      } else {
        // Automatically re-evaluate if results were already shown
        evaluateWithBackend(Array.from(next));
      }
    }
  };

  const removeSymptom = (id: string) => {
    const next = new Set(selectedSymptoms);
    next.delete(id);
    setSelectedSymptoms(next);
    setErrorMessage(null);
    if (results) {
      if (next.size === 0) {
        setResults(null);
      } else {
        evaluateWithBackend(Array.from(next));
      }
    }
  };

  const clearAll = () => {
    setSelectedSymptoms(new Set());
    setResults(null);
    setErrorMessage(null);
  };

  const evaluateWithBackend = async (symptoms: string[]) => {
    if (symptoms.length === 0) {
      setResults(null);
      return;
    }
    setIsEvaluating(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${res.status}`);
      }

      const data: PredictResponse = await res.json();
      setResults(data);
    } catch (err: any) {
      // Graceful fallback to identical local predictor
      try {
        const fallback = predictTop3(symptoms);
        setResults(fallback);
      } catch (localErr: any) {
        setErrorMessage(localErr.message || 'Evaluation error');
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleRunEvaluation = () => {
    if (selectedSymptoms.size === 0) return;
    evaluateWithBackend(Array.from(selectedSymptoms)).then(() => {
      if (window.innerWidth < 1024) {
        const el = document.getElementById('triage-results-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  };

  // Sample illustrative scenarios matching repo tests
  const applyScenario = (type: 'cardiac' | 'dengue' | 'cold' | 'malaria') => {
    let ids: string[] = [];
    if (type === 'cardiac') {
      ids = ['chest_pain', 'pain_radiating_arm_jaw_back', 'sweating', 'shortness_of_breath'];
    } else if (type === 'dengue') {
      ids = ['high_fever', 'severe_frontal_headache', 'pain_behind_eyes', 'bone_joint_pain', 'mosquito_bites'];
    } else if (type === 'cold') {
      ids = ['runny_nose', 'nasal_congestion', 'sneezing', 'sore_throat'];
    } else if (type === 'malaria') {
      ids = ['fever', 'chills', 'cyclic_fever_chills', 'sweating', 'mosquito_bites'];
    }
    const newSet = new Set(ids);
    setSelectedSymptoms(newSet);
    evaluateWithBackend(ids);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#1F2923] flex flex-col font-sans selection:bg-[#2C5E4A] selection:text-white">
      {/* Soft, Serene Header */}
      <header className="border-b border-[#EBE8E1] bg-white/80 backdrop-blur-md sticky top-0 z-30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
          {/* Brand Logo & Editorial Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#244F3E] text-white flex items-center justify-center shadow-soft ring-1 ring-black/5">
              <Stethoscope className="w-5 h-5 stroke-[1.8]" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-2xl font-bold tracking-tight text-[#163327]">
                  MediCore
                </span>
                <span className="hidden sm:inline-block text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-[#EBF2EE] text-[#244F3E]">
                  Symptom Checker
                </span>
              </div>
              <p className="text-xs text-[#717F77] hidden md:block">
                Evaluates seven common conditions
              </p>
            </div>
          </div>

          {/* Center Subtle Helper Navigation */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-[#5E6D65]">
            <span className="text-[#8B9890]">Explore example cases:</span>
            <button
              type="button"
              onClick={() => applyScenario('cardiac')}
              className="px-2.5 py-1 rounded-lg bg-[#F4F3EE] hover:bg-[#EAE8E0] text-[#2C3831] font-medium transition-colors"
            >
              Heart attack
            </button>
            <button
              type="button"
              onClick={() => applyScenario('malaria')}
              className="px-2.5 py-1 rounded-lg bg-[#F4F3EE] hover:bg-[#EAE8E0] text-[#2C3831] font-medium transition-colors"
            >
              Malaria
            </button>
            <button
              type="button"
              onClick={() => applyScenario('dengue')}
              className="px-2.5 py-1 rounded-lg bg-[#F4F3EE] hover:bg-[#EAE8E0] text-[#2C3831] font-medium transition-colors"
            >
              Dengue
            </button>
            <button
              type="button"
              onClick={() => applyScenario('cold')}
              className="px-2.5 py-1 rounded-lg bg-[#F4F3EE] hover:bg-[#EAE8E0] text-[#2C3831] font-medium transition-colors"
            >
              Common cold
            </button>
          </div>

          {/* Right Action: Emergency Link */}
          <div className="flex items-center gap-3">
            <a
              href="tel:108"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FBF0EE] hover:bg-[#F8E4E1] text-[#9E281F] text-xs font-semibold border border-[#F2C7C2] transition-colors"
              title="Immediate Emergency Ambulance Hotline (108)"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Emergency (108)</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7">
        {/* Soft, Welcoming Editorial Hero Banner */}
        <section className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#F5F8F6] via-[#FAF9F5] to-[#F3F5F2] border border-[#E7E5DD] shadow-soft">
          <div className="max-w-3xl space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2C5E4A]" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#4A6356]">
                Student Project · Symptom Checker
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal tracking-tight text-[#142A20]">
              Select what you&apos;re feeling on the chart.
            </h2>
            <p className="text-sm sm:text-base text-[#57695F] leading-relaxed max-w-2xl">
              See the closest match among seven common conditions — with an immediate flag for anything serious.
            </p>
          </div>

          {/* Quick Conditions Pill Strip */}
          <div className="mt-5 pt-4 border-t border-[#E3E1D7] flex items-center justify-between flex-wrap gap-2 text-xs text-[#697970]">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-medium text-[#293E33]">Recognized conditions:</span>
              <span className="text-[#4E6156]">
                Low Blood Sugar · Low Blood Pressure · Malaria · Dengue · Common Cold · Chickenpox · Heart Attack
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowScopeInfo(!showScopeInfo)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#244F3E] hover:underline"
            >
              <Info className="w-3.5 h-3.5" />
              <span>{showScopeInfo ? 'Hide disclaimer' : 'About the model'}</span>
            </button>
          </div>

          {/* Expandable Clinical Scope Note */}
          {showScopeInfo && (
            <div className="mt-3 p-4 rounded-2xl bg-white/90 border border-[#E2DFD4] text-xs text-[#526359] leading-relaxed space-y-2">
              <p>
                <strong>Not medical advice:</strong> It only knows seven conditions — low blood sugar, low blood pressure, malaria, dengue, common cold, chickenpox and heart attack — so anything else will still be matched to one of these. See a doctor if you&apos;re worried.
              </p>
            </div>
          )}
        </section>

        {/* Global Emergency Alert (displays smoothly when red-flag signs are selected) */}
        <EmergencyAlert emergencySymptoms={emergencySymptomsList} />

        {/* Error message banner if any */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-[#FDF0EE] border border-[#F2C5C0] text-xs text-[#9E281F] flex items-center justify-between">
            <span>{errorMessage}</span>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="p-1 hover:opacity-80"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 3-Column Harmonious Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* LEFT COLUMN: Anatomical Figure Explorer (3.5 cols) */}
          <section
            aria-label="Anatomical body navigator"
            className="lg:col-span-4 space-y-4"
          >
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EBE8E1] shadow-card">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-editorial text-lg font-bold text-[#163327]">
                    Body Areas
                  </h3>
                  <p className="text-xs text-[#717F77]">
                    Tap an area on the chart to filter
                  </p>
                </div>
                {selectedSymptoms.size > 0 && (
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#EBF2EE] text-[#244F3E] font-semibold">
                    {selectedSymptoms.size} selected
                  </span>
                )}
              </div>

              {/* Contoured SVG Body Chart */}
              <BodyChart
                activeRegion={activeRegion}
                onSelectRegion={(reg) => {
                  setActiveRegion(reg);
                  setSearchQuery('');
                }}
                selectedCountsByRegion={selectedCountsByRegion}
              />

              {/* Elegant Region Selector Strip */}
              <div className="mt-4 pt-4 border-t border-[#F0EFEA] space-y-1">
                {REGIONS.map((region) => {
                  const isCurrent = activeRegion === region.id && !searchQuery;
                  const count = selectedCountsByRegion[region.id] || 0;
                  return (
                    <button
                      key={region.id}
                      type="button"
                      onClick={() => {
                        setActiveRegion(region.id);
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isCurrent
                          ? 'bg-[#244F3E] text-white font-semibold shadow-soft'
                          : 'text-[#415047] hover:bg-[#F6F5F0] hover:text-[#183428]'
                      }`}
                    >
                      <span>{region.label}</span>
                      {count > 0 && (
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isCurrent
                              ? 'bg-white text-[#244F3E]'
                              : 'bg-[#E5ECE7] text-[#244F3E]'
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CENTER COLUMN: Symptom Search & Checklist (4.5 cols) */}
          <section
            aria-label="Symptom selection checklist"
            className="lg:col-span-4 space-y-4"
          >
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EBE8E1] shadow-card">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-editorial text-lg font-bold text-[#163327]">
                    Symptoms
                  </h3>
                  <p className="text-xs text-[#717F77]">
                    Select what you&apos;re currently feeling
                  </p>
                </div>
                {selectedSymptoms.size > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-xs text-[#9E281F] hover:underline font-medium inline-flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>

              {/* Refined Checklist Component */}
              <SymptomChecklist
                activeRegion={activeRegion}
                onSelectRegion={(r) => {
                  setActiveRegion(r);
                  setSearchQuery('');
                }}
                selectedSymptoms={selectedSymptoms}
                onToggleSymptom={toggleSymptom}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCountsByRegion={selectedCountsByRegion}
              />
            </div>
          </section>

          {/* RIGHT COLUMN: Profile Summary & Clinical Analysis (4 cols) */}
          <section
            aria-label="Triage evaluation summary"
            id="triage-results-section"
            className="lg:col-span-4 space-y-4"
          >
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EBE8E1] shadow-card sticky top-22">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EFEA]">
                <div>
                  <h3 className="font-editorial text-lg font-bold text-[#163327]">
                    Your Symptoms
                  </h3>
                  <p className="text-xs text-[#717F77]">
                    {selectedSymptoms.size === 0
                      ? 'Nothing selected yet'
                      : `${selectedSymptoms.size} ${
                          selectedSymptoms.size === 1 ? 'symptom' : 'symptoms'
                        } selected`}
                  </p>
                </div>

                {selectedSymptoms.size > 0 && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#EAF2ED] text-[#244F3E]">
                    Ready to check
                  </span>
                )}
              </div>

              {/* Selected Symptom Chips */}
              <div className="py-3">
                {selectedSymptoms.size === 0 ? (
                  <div className="py-8 text-center text-[#8C9890] space-y-1">
                    <p className="text-xs font-medium text-[#5F6E65]">
                      Choose an area on the chart, or search above.
                    </p>
                    <p className="text-[11px] text-[#8C9890]">
                      Or pick one of the example scenarios above.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-[#717F77] uppercase tracking-wider block">
                      Selected:
                    </span>
                    <ul className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto pr-1">
                      {[...selectedSymptoms].map((id) => {
                        const sym = SYMPTOM_MAP.get(id);
                        const label = sym ? sym.label : id.replace(/_/g, ' ');
                        const isEmergency = EMERGENCY_SET.has(id);
                        return (
                          <li key={id}>
                            <button
                              type="button"
                              onClick={() => removeSymptom(id)}
                              className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full transition-all border ${
                                isEmergency
                                  ? 'bg-[#FDF0EE] text-[#9E281F] border-[#F2C5C0] font-medium'
                                  : 'bg-[#F4F7F5] text-[#244F3E] border-[#D5E3DB] hover:border-[#96B8A5]'
                              }`}
                              title={`Click to remove ${label}`}
                            >
                              <span>{label}</span>
                              <X className="w-3 h-3 opacity-60 hover:opacity-100" />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>

              {/* Primary Action Button */}
              <div className="pt-3 border-t border-[#F0EFEA] space-y-2">
                <button
                  type="button"
                  disabled={selectedSymptoms.size === 0 || isEvaluating}
                  onClick={handleRunEvaluation}
                  className={`w-full py-3.5 px-5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                    selectedSymptoms.size === 0 || isEvaluating
                      ? 'bg-[#F0EEE8] text-[#9C998F] cursor-not-allowed border border-[#E7E5DE]'
                      : 'bg-[#244F3E] hover:bg-[#1A3E30] text-white shadow-soft hover:shadow-card active:scale-[0.99]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>
                    {isEvaluating ? 'Checking…' : 'Check symptoms'}
                  </span>
                </button>

                {results && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsDoctorHandoutOpen(true)}
                      className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold bg-[#EAF2ED] text-[#1E4334] hover:bg-[#DEEDE5] border border-[#CADED3] flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#244F3E]" />
                      <span>Doctor&apos;s Handout</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="py-2.5 px-3 rounded-xl text-xs font-medium text-[#46544C] hover:bg-[#F5F4EE] border border-[#E7E5DE] flex items-center justify-center gap-1.5 transition-colors"
                      title="Quick print page"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#5F6E65]" />
                      <span>Print</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Live Triage Results */}
              <ResultsPanel
                results={results}
                onOpenDoctorHandout={() => setIsDoctorHandoutOpen(true)}
              />
            </div>
          </section>
        </div>

        {/* Formatted Doctor's Consultation Modal */}
        <DoctorHandoutModal
          handout={results?.doctor_handout || null}
          isOpen={isDoctorHandoutOpen}
          onClose={() => setIsDoctorHandoutOpen(false)}
        />
      </main>

      {/* Mobile Bottom Bar for 1-Thumb Interaction */}
      <aside
        aria-label="Mobile quick triage bar"
        className="lg:hidden fixed bottom-0 left-0 right-0 p-3.5 bg-white/95 backdrop-blur-md border-t border-[#EAE8E1] shadow-card z-40 flex items-center justify-between gap-3"
      >
        <div>
          <span className="text-xs font-bold text-[#1E2522] block">
            {selectedSymptoms.size} selected
          </span>
          <span className="text-[11px] text-[#69756F]">
            {emergencySymptomsList.length > 0
              ? 'Urgent warning present'
              : 'Tap to check'}
          </span>
        </div>

        <button
          type="button"
          disabled={selectedSymptoms.size === 0 || isEvaluating}
          onClick={handleRunEvaluation}
          className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
            selectedSymptoms.size === 0 || isEvaluating
              ? 'bg-[#F0EEE8] text-[#9C998F]'
              : 'bg-[#244F3E] text-white shadow-soft'
          }`}
        >
          <span>{isEvaluating ? 'Checking…' : 'Check symptoms'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </aside>

      {/* Refined Editorial Footer */}
      <footer className="mt-auto border-t border-[#EBE8E1] bg-white py-8 text-center text-xs text-[#717F77]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-editorial text-base font-bold text-[#163327]">MediCore</span>
            <span>·</span>
            <span>Symptom Checker Student Project</span>
          </div>
          <p className="text-[11px] text-[#86948B]">
            This tool is for educational purposes only and is not medical advice. See a doctor for any health concern.
          </p>
        </div>
      </footer>
    </div>
  );
}
