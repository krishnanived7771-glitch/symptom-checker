import React, { useState } from 'react';
import { PredictResponse, DISEASE_INFO } from '../utils/repoPredictor';
import { Info, ArrowRight, Check, Eye, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface ResultsPanelProps {
  results: PredictResponse | null;
  onOpenDoctorHandout?: () => void;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({
  results,
  onOpenDoctorHandout,
}) => {
  const [expandedDisease, setExpandedDisease] = useState<string | null>(null);

  if (!results || !results.predictions || results.predictions.length === 0) return null;

  const toggleExplain = (disease: string) => {
    setExpandedDisease(expandedDisease === disease ? null : disease);
  };

  return (
    <div
      className="space-y-4 pt-4 border-t border-[#EAE8E1]"
      aria-live="polite"
      id="triage-results"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-editorial text-lg font-bold text-[#1E2522]">
            Closest Matches
          </h3>
          <p className="text-xs text-[#69756F]">
            Correlated against seven reference conditions
          </p>
        </div>

        {onOpenDoctorHandout && (
          <button
            type="button"
            onClick={onOpenDoctorHandout}
            className="text-xs font-semibold text-[#244F3E] hover:underline"
          >
            View Doctor Handout
          </button>
        )}
      </div>

      {/* Few Symptoms Warning */}
      {results.few_symptoms_warning && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF6EA] border border-[#EFE5C6] text-xs text-[#7A6224]">
          <Info className="w-4 h-4 text-[#A88224] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Only a few symptoms selected:</strong> Pattern matching is tentative with fewer than 3 symptoms — add more for a more definitive match.
          </p>
        </div>
      )}

      {/* Condition Cards with Clinical Explainability (Point 2) */}
      <div className="space-y-3.5">
        {results.predictions.map((pred, index) => {
          const isTopMatch = index === 0 && pred.label === 'Most likely';
          const infoText = DISEASE_INFO[pred.disease] || '';
          const isExpanded = expandedDisease === pred.disease || (isTopMatch && expandedDisease === null);

          return (
            <div
              key={pred.disease}
              className={`p-4 rounded-2xl transition-all border ${
                isTopMatch
                  ? 'bg-[#F4F8F5] border-[#BDDEC9] shadow-soft'
                  : 'bg-white border-[#EAE8E1]'
              }`}
            >
              {/* Header row: Badge, Score, Toggle */}
              <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${
                    pred.label === 'Most likely'
                      ? 'bg-[#2C5E4A] text-white'
                      : pred.label === 'Possible'
                      ? 'bg-[#EAECE6] text-[#344139]'
                      : 'bg-[#F3F2EE] text-[#69756F]'
                  }`}
                >
                  {pred.label}
                </span>

                <div className="flex items-center gap-2">
                  {typeof pred.score === 'number' && (
                    <span className="text-xs text-[#69756F] font-mono tabular-nums">
                      {pred.score}% score
                    </span>
                  )}
                </div>
              </div>

              {/* Disease Title & Overview */}
              <h4 className="font-editorial text-lg font-bold text-[#1E2522] mt-1">
                {pred.disease}
              </h4>

              {infoText && (
                <p className="text-xs sm:text-[13px] text-[#425048] leading-relaxed mt-1 mb-2">
                  {infoText}
                </p>
              )}

              {pred.disease === 'Heart Attack' && (
                <div className="mt-2.5 pt-2 border-t border-[#F2C5C0] text-xs text-[#9E281F] font-semibold flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Immediate medical emergency. Call 108 or ambulance dispatch immediately.</span>
                </div>
              )}

              {/* Point 2: Clinical Explainability Section */}
              <div className="mt-3 pt-3 border-t border-[#EAE8E1]/80">
                <button
                  type="button"
                  onClick={() => toggleExplain(pred.disease)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-[#244F3E] hover:text-[#163327] transition-colors py-1"
                >
                  <span className="flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>Why this match? Clinical breakdown</span>
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#7A8880]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#7A8880]" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-2.5 space-y-3 text-xs bg-white/80 p-3 rounded-xl border border-[#E3E8E5] transition-all">
                    {/* Symptoms that aligned */}
                    {pred.matched_symptoms && pred.matched_symptoms.length > 0 && (
                      <div>
                        <span className="text-[11px] font-bold text-[#2C5E4A] uppercase tracking-wide block mb-1">
                          Reported symptoms that align ({pred.matched_symptoms.length}):
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {pred.matched_symptoms.map((sym, sIdx) => (
                            <span
                              key={sIdx}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#EDF4F0] text-[#1D3E30] font-medium text-[11px]"
                            >
                              <Check className="w-3 h-3 text-[#2C5E4A]" />
                              {sym}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key symptoms not reported */}
                    {pred.unreported_key_symptoms && pred.unreported_key_symptoms.length > 0 && (
                      <div>
                        <span className="text-[11px] font-bold text-[#7A6A34] uppercase tracking-wide block mb-1">
                          Characteristic symptoms to monitor (not reported):
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {pred.unreported_key_symptoms.map((sym, uIdx) => (
                            <span
                              key={uIdx}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FBF7EC] text-[#6E5D2A] text-[11px]"
                            >
                              <Eye className="w-3 h-3 text-[#A88224]" />
                              {sym}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Questions for doctor */}
                    {pred.questions_for_doctor && pred.questions_for_doctor.length > 0 && (
                      <div className="pt-2 border-t border-[#EDEBE4]">
                        <span className="text-[11px] font-bold text-[#35433B] uppercase tracking-wide flex items-center gap-1 mb-1">
                          <HelpCircle className="w-3.5 h-3.5 text-[#244F3E]" />
                          Suggested questions for your doctor:
                        </span>
                        <ul className="space-y-1.5 pl-1 text-[11px] text-[#47574D]">
                          {pred.questions_for_doctor.map((q, qIdx) => (
                            <li key={qIdx} className="flex items-start gap-1.5 leading-snug">
                              <span className="text-[#244F3E] font-bold">•</span>
                              <span>{q}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Medical Disclaimer */}
      <div className="p-3.5 rounded-xl bg-[#F6F5F0] border border-[#EAE8E0] text-[11px] text-[#727D77] leading-relaxed">
        <p>{results.disclaimer}</p>
      </div>
    </div>
  );
};
