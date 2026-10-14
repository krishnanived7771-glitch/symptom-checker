import React from 'react';
import { DoctorHandout } from '../utils/repoPredictor';
import { Printer, X, AlertTriangle, FileText, CheckCircle2, HelpCircle } from 'lucide-react';

interface DoctorHandoutModalProps {
  handout: DoctorHandout | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DoctorHandoutModal: React.FC<DoctorHandoutModalProps> = ({
  handout,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !handout) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="handout-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-card border border-[#E5E2DA] p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EFECE5] print:hidden">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#244F3E] text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 id="handout-title" className="font-editorial text-lg font-bold text-[#163327]">
                Doctor&apos;s Consultation Handout
              </h2>
              <p className="text-xs text-[#717F77]">
                A formatted summary to share with your healthcare provider
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#244F3E] hover:bg-[#1A3E30] text-white text-xs font-semibold shadow-soft transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Handout</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#717F77] hover:text-[#1F2923] hover:bg-[#F4F3EE] transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Outpatient Triage Slip */}
        <div className="pt-5 space-y-6 text-[#1F2923]">
          {/* Slip Header */}
          <div className="flex items-start justify-between border-b border-[#E5E2DA] pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-[#244F3E] block">
                MediCore Clinical Intake Slip
              </span>
              <h3 className="font-editorial text-xl font-bold text-[#163327]">
                Patient Symptom Summary
              </h3>
              <p className="text-xs text-[#717F77] mt-0.5">
                Preliminary screening report prepared for clinical examination
              </p>
            </div>

            <div className="text-right text-xs font-mono text-[#627068]">
              <span className="font-bold text-[#244F3E] block">{handout.report_id}</span>
              <span>{handout.generated_at}</span>
            </div>
          </div>

          {/* Emergency Triage Status */}
          {handout.emergency_warning ? (
            <div className="p-3.5 rounded-xl bg-[#FDF2F0] border border-[#F3C7C2] text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-[#9E281F] font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>Urgent Warning Signs Reported</span>
              </div>
              <p className="text-[#872018]">
                Patient reported potentially acute symptoms: <strong>{handout.flagged_red_flags.join(', ')}</strong>.
                Requires prompt clinical attention.
              </p>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-[#F4F8F5] border border-[#CFE3D8] text-xs flex items-center gap-2 text-[#244F3E]">
              <CheckCircle2 className="w-4 h-4 text-[#2C5E4A]" />
              <span>No immediate acute emergency red-flags recorded during screening.</span>
            </div>
          )}

          {/* Reported Symptoms Table */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4E5D54] block">
              1. Reported Symptoms ({handout.total_symptoms_reported}):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {handout.symptoms_reported.map((sym) => (
                <div
                  key={sym.id}
                  className={`p-2.5 rounded-xl border flex items-center justify-between ${
                    sym.is_emergency
                      ? 'bg-[#FDF2F0] border-[#F2C5C0] text-[#9E281F] font-semibold'
                      : 'bg-[#F8FAF9] border-[#E5EBE7] text-[#293830]'
                  }`}
                >
                  <span>{sym.label}</span>
                  {sym.is_emergency && (
                    <span className="text-[10px] uppercase font-bold text-[#A62C21]">
                      Urgent Flag
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Preliminary Pattern Correlation */}
          <div className="space-y-2 pt-2 border-t border-[#EFECE5]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4E5D54] block">
              2. Preliminary Diagnostic Correlation:
            </span>
            <div className="p-3.5 rounded-xl bg-[#F9FBF9] border border-[#D5E3DB] space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-editorial text-base font-bold text-[#163327]">
                  {handout.top_condition}
                </span>
                <span className="font-mono font-bold text-[#244F3E]">
                  {handout.top_confidence}% match score
                </span>
              </div>
              <p className="text-[#5F6E65]">
                Determined by statistical symptom alignment among reference conditions.
              </p>
            </div>
          </div>

          {/* Suggested Physician Questions */}
          {handout.suggested_questions.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#EFECE5]">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4E5D54]">
                <HelpCircle className="w-3.5 h-3.5 text-[#244F3E]" />
                <span>3. Recommended Questions for Discussion:</span>
              </div>
              <ul className="text-xs space-y-2 text-[#3D4B42]">
                {handout.suggested_questions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-[#F6F8F7] p-2.5 rounded-xl border border-[#E7EFEA]">
                    <span className="font-bold text-[#244F3E] shrink-0">{idx + 1}.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Physician Notes Section (For printed handouts) */}
          <div className="pt-4 border-t border-[#E5E2DA] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#717F77] block">
              Clinical Assessment &amp; Doctor&apos;s Notes:
            </span>
            <div className="h-20 rounded-xl border border-dashed border-[#CBD1CD] bg-[#FAFAF8] p-3 text-[11px] text-[#8C9890]">
              Physician diagnosis, blood pressure/vitals, and recommended prescription notes...
            </div>
          </div>

          {/* Footer Disclaimer */}
          <p className="text-[10px] text-[#86948B] pt-2 border-t border-[#EFECE5] leading-relaxed">
            {handout.clinical_disclaimer} This document was prepared by the patient via the MediCore preliminary screening tool to facilitate clinical consultation.
          </p>
        </div>
      </div>
    </div>
  );
};
