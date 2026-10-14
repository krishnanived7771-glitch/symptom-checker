import React from 'react';
import { AlertCircle, Phone } from 'lucide-react';

interface EmergencyAlertProps {
  emergencySymptoms: string[];
}

export const EmergencyAlert: React.FC<EmergencyAlertProps> = ({
  emergencySymptoms,
}) => {
  if (emergencySymptoms.length === 0) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="p-5 rounded-2xl bg-[#FCF4F3] border border-[#F4CCC8] shadow-soft transition-all my-4"
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2.5 rounded-xl bg-[#A62C21] text-white shrink-0 shadow-xs">
          <AlertCircle className="w-5 h-5" aria-hidden="true" />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#F5D8D5] text-[#8C1F16]">
              Urgent Clinical Advisory
            </span>
            <h3 className="font-editorial text-base font-semibold text-[#66160F]">
              Potentially Critical Symptoms Identified
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-[#73221A] leading-relaxed">
            One or more symptoms you selected warrant immediate professional evaluation.
            If you are experiencing severe difficulty breathing, sudden chest pain, loss of consciousness, or acute bleeding, please connect with emergency medical services (dial <strong>108</strong>) without delay.
          </p>

          <div className="pt-2 border-t border-[#F5D5D1]/80">
            <span className="text-[11px] font-semibold text-[#8C231A] block mb-1">
              Flagged acute symptoms:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {emergencySymptoms.map((symptom, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-lg bg-white/90 text-[#8C231A] font-medium border border-[#F2C5C0]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A62C21]" />
                  {symptom}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-1 flex items-center gap-3">
            <a
              href="tel:108"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#A62C21] hover:bg-[#8C231A] text-white text-xs font-semibold shadow-soft transition-colors"
            >
              <Phone className="w-3.5 h-3.5" /> Call Emergency (108)
            </a>
            <span className="text-[11px] text-[#8C2A22]">
              Do not drive yourself if experiencing chest pressure or severe weakness.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
