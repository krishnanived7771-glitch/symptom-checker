import React from 'react';
import { REGIONS, RegionId, Symptom, SYMPTOMS } from '../data/symptoms';
import { Search, X, Check } from 'lucide-react';

interface SymptomChecklistProps {
  activeRegion: RegionId;
  onSelectRegion: (region: RegionId) => void;
  selectedSymptoms: Set<string>;
  onToggleSymptom: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCountsByRegion: Record<RegionId, number>;
}

export const SymptomChecklist: React.FC<SymptomChecklistProps> = ({
  activeRegion,
  onSelectRegion,
  selectedSymptoms,
  onToggleSymptom,
  searchQuery,
  onSearchChange,
  selectedCountsByRegion,
}) => {
  const isSearching = searchQuery.trim().length > 0;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const displayedSymptoms: Symptom[] = isSearching
    ? SYMPTOMS.filter(
        (s) =>
          s.label.toLowerCase().includes(normalizedQuery) ||
          s.id.toLowerCase().includes(normalizedQuery) ||
          (s.medicalTerm && s.medicalTerm.toLowerCase().includes(normalizedQuery)) ||
          s.description.toLowerCase().includes(normalizedQuery)
      )
    : SYMPTOMS.filter((s) => s.region === activeRegion);

  return (
    <div className="space-y-4">
      {/* Refined Search Input */}
      <div className="relative">
        <label htmlFor="symptom-search" className="sr-only">
          Search sensations or clinical signs
        </label>
        <div className="relative flex items-center">
          <Search
            className="absolute left-4 w-4 h-4 text-[#8C958F] pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="symptom-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search symptoms — e.g. fever, headache, fluttering heart, rash…"
            className="w-full pl-11 pr-10 py-3 bg-white border border-[#E5E3DC] rounded-xl text-[#1E2522] placeholder-[#8F9992] text-sm focus:outline-none focus:border-[#2C5E4A] focus:ring-1 focus:ring-[#2C5E4A] shadow-soft transition-all"
            autoComplete="off"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 p-1 text-[#8C958F] hover:text-[#1E2522] rounded-lg transition-colors"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Elegant Region Filter Strip */}
      {!isSearching && (
        <div className="space-y-1.5">
          <div
            className="flex flex-wrap gap-1 p-1 bg-[#F3F2ED] rounded-xl border border-[#E7E5DE]"
            role="tablist"
            aria-label="Body region tabs"
          >
            {REGIONS.map((region) => {
              const isActive = activeRegion === region.id;
              const count = selectedCountsByRegion[region.id] || 0;
              return (
                <button
                  key={region.id}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => onSelectRegion(region.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-[#1B3F31] shadow-soft font-semibold'
                      : 'text-[#5C6B62] hover:text-[#1B3F31] hover:bg-white/60'
                  }`}
                >
                  <span>{region.shortLabel}</span>
                  {count > 0 && (
                    <span
                      className={`inline-flex items-center justify-center min-w-4 h-4 px-1 rounded-full text-[10px] font-semibold ${
                        isActive
                          ? 'bg-[#2C5E4A] text-white'
                          : 'bg-[#E0DFD8] text-[#3D4741]'
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
      )}

      {/* Soft Header with Active Count & Subtle Legend */}
      <div className="flex items-center justify-between text-xs text-[#69756F] px-1 pt-0.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B3392E]" />
          <span>Indicates acute or critical warning signs</span>
        </div>
        <span className="font-mono text-[11px] text-[#7C8781]">
          {displayedSymptoms.length} available
        </span>
      </div>

      {/* Elegant Symptom Items List */}
      <div
        className="bg-white border border-[#E8E6DF] rounded-2xl overflow-hidden shadow-soft divide-y divide-[#F2F0E9]"
        role="group"
        aria-label="Symptom list"
      >
        {displayedSymptoms.length === 0 ? (
          <div className="p-10 text-center text-[#69756F]">
            <p className="font-editorial text-lg text-[#1E2522]">No symptoms match your search</p>
            <p className="text-xs text-[#8C958F] mt-1">
              Try searching for &ldquo;fever&rdquo;, &ldquo;chest&rdquo;, or reset the search to browse all categories.
            </p>
          </div>
        ) : (
          displayedSymptoms.map((symptom) => {
            const isChecked = selectedSymptoms.has(symptom.id);
            return (
              <label
                key={symptom.id}
                htmlFor={`symptom-${symptom.id}`}
                className={`flex items-start gap-3.5 p-3.5 cursor-pointer transition-all duration-200 ${
                  isChecked
                    ? 'bg-[#F4F7F5]'
                    : 'hover:bg-[#FAFAF7]'
                }`}
              >
                {/* Soft Custom Checkbox */}
                <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 shrink-0">
                  <input
                    id={`symptom-${symptom.id}`}
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleSymptom(symptom.id)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${
                      isChecked
                        ? 'bg-[#2C5E4A] border-[#2C5E4A] text-white shadow-xs'
                        : 'border-[#CBD1CC] bg-white hover:border-[#8C9E93]'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[2.5]" />}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span
                      className={`text-sm tracking-tight transition-colors ${
                        isChecked
                          ? 'font-semibold text-[#183428]'
                          : 'font-medium text-[#1E2522]'
                      }`}
                    >
                      {symptom.label}
                    </span>

                    {symptom.medicalTerm && (
                      <span className="text-[11px] text-[#7C8781] font-mono opacity-80">
                        {symptom.medicalTerm}
                      </span>
                    )}

                    {symptom.emergency && (
                      <span
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FDF0EE] text-[#A62C21] border border-[#F5C7C2]"
                        title="Serious warning indicator"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#A62C21]" />
                        Urgent Flag
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#6B756E] mt-0.5 leading-relaxed">
                    {symptom.description}
                  </p>
                </div>
              </label>
            );
          })
        )}
      </div>
    </div>
  );
};
