import React from 'react';
import { RegionId } from '../data/symptoms';

interface BodyChartProps {
  activeRegion: RegionId;
  onSelectRegion: (region: RegionId) => void;
  selectedCountsByRegion: Record<RegionId, number>;
}

export const BodyChart: React.FC<BodyChartProps> = ({
  activeRegion,
  onSelectRegion,
  selectedCountsByRegion,
}) => {
  const getRegionStyle = (region: RegionId) => {
    const isActive = activeRegion === region;
    const hasSelections = (selectedCountsByRegion[region] || 0) > 0;

    if (isActive) {
      return {
        fill: '#2C5E4A',
        stroke: '#1B3F31',
        strokeWidth: '1.5',
        filter: 'drop-shadow(0 2px 8px rgba(44, 94, 74, 0.25))',
        className: 'cursor-pointer transition-all duration-300 transform scale-[1.01] origin-center',
      };
    }
    if (hasSelections) {
      return {
        fill: '#DCE8E1',
        stroke: '#7C9E8E',
        strokeWidth: '1.5',
        className: 'cursor-pointer transition-all duration-300 hover:fill-[#CADBD1]',
      };
    }
    return {
      fill: '#EEF0EB',
      stroke: '#E2E5DD',
      strokeWidth: '1.2',
      className: 'cursor-pointer transition-all duration-300 hover:fill-[#E3E7DE]',
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent, region: RegionId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectRegion(region);
    }
  };

  const headStyle = getRegionStyle('head');
  const chestStyle = getRegionStyle('chest');
  const abdomenStyle = getRegionStyle('abdomen');
  const skinStyle = getRegionStyle('skin');
  const bodyStyle = getRegionStyle('body');

  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative w-full max-w-[210px] aspect-[1/1.8] flex items-center justify-center py-2">
        <svg
          viewBox="0 0 200 360"
          className="w-full h-full overflow-visible"
          role="region"
          aria-label="Interactive anatomical body figure"
        >
          <defs>
            <radialGradient id="glowPulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2C5E4A" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2C5E4A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Subtle Ambient Silhouette Shadow / Grounding */}
          <ellipse cx="100" cy="344" rx="42" ry="7" fill="#E8EBE3" opacity="0.6" />

          {/* Delicate Anatomical Centerline Guide */}
          <line
            x1="100"
            y1="55"
            x2="100"
            y2="195"
            stroke="#DCDFD7"
            strokeWidth="0.8"
            strokeDasharray="2 3"
          />

          {/* HEAD & NECK */}
          <g
            tabIndex={0}
            role="button"
            aria-label={`Head, throat and senses. ${selectedCountsByRegion.head || 0} active symptoms.`}
            aria-pressed={activeRegion === 'head'}
            onClick={() => onSelectRegion('head')}
            onKeyDown={(e) => handleKeyDown(e, 'head')}
            className="outline-none focus-visible:ring-2 focus-visible:ring-[#2C5E4A] rounded-full"
          >
            {/* Neck transition */}
            <path
              d="M93 54 C93 60, 91 66, 88 70 L112 70 C109 66, 107 60, 107 54 Z"
              fill={headStyle.fill}
              stroke={headStyle.stroke}
              strokeWidth="1"
            />
            {/* Contoured Cranium & Jaw */}
            <path
              d="M100 16 
                 C114 16, 122 26, 122 38 
                 C122 50, 114 60, 107 64 
                 C103 66, 97 66, 93 64 
                 C86 60, 78 50, 78 38 
                 C78 26, 86 16, 100 16 Z"
              fill={headStyle.fill}
              stroke={headStyle.stroke}
              strokeWidth={headStyle.strokeWidth}
              filter={headStyle.filter}
              className={headStyle.className}
            />
          </g>

          {/* CHEST & RESPIRATORY CAGE */}
          <g
            tabIndex={0}
            role="button"
            aria-label={`Chest, heart and lungs. ${selectedCountsByRegion.chest || 0} active symptoms.`}
            aria-pressed={activeRegion === 'chest'}
            onClick={() => onSelectRegion('chest')}
            onKeyDown={(e) => handleKeyDown(e, 'chest')}
            className="outline-none focus-visible:ring-2 focus-visible:ring-[#2C5E4A]"
          >
            <path
              d="M74 74 
                 C83 72, 100 70, 126 74 
                 C136 76, 140 84, 137 106 
                 C134 122, 128 132, 123 135 
                 C110 137, 90 137, 77 135 
                 C72 132, 66 122, 63 106 
                 C60 84, 64 76, 74 74 Z"
              fill={chestStyle.fill}
              stroke={chestStyle.stroke}
              strokeWidth={chestStyle.strokeWidth}
              filter={chestStyle.filter}
              className={chestStyle.className}
            />
            {/* Delicate Clavicle hint */}
            <path
              d="M84 81 Q100 85 116 81"
              stroke={activeRegion === 'chest' ? '#A2C2B3' : '#D4D8CF'}
              strokeWidth="0.9"
              fill="none"
            />
          </g>

          {/* ABDOMEN & STOMACH */}
          <g
            tabIndex={0}
            role="button"
            aria-label={`Stomach and abdominal core. ${selectedCountsByRegion.abdomen || 0} active symptoms.`}
            aria-pressed={activeRegion === 'abdomen'}
            onClick={() => onSelectRegion('abdomen')}
            onKeyDown={(e) => handleKeyDown(e, 'abdomen')}
            className="outline-none focus-visible:ring-2 focus-visible:ring-[#2C5E4A]"
          >
            <path
              d="M76 139 
                 C88 141, 112 141, 124 139 
                 C130 148, 132 165, 129 178 
                 C125 190, 115 194, 100 194 
                 C85 194, 75 190, 71 178 
                 C68 165, 70 148, 76 139 Z"
              fill={abdomenStyle.fill}
              stroke={abdomenStyle.stroke}
              strokeWidth={abdomenStyle.strokeWidth}
              filter={abdomenStyle.filter}
              className={abdomenStyle.className}
            />
          </g>

          {/* ARMS & SKIN (Left & Right graceful curves) */}
          <g
            tabIndex={0}
            role="button"
            aria-label={`Skin, arms and blood. ${selectedCountsByRegion.skin || 0} active symptoms.`}
            aria-pressed={activeRegion === 'skin'}
            onClick={() => onSelectRegion('skin')}
            onKeyDown={(e) => handleKeyDown(e, 'skin')}
            className="outline-none focus-visible:ring-2 focus-visible:ring-[#2C5E4A]"
          >
            {/* Left Arm */}
            <path
              d="M58 80 
                 C51 92, 42 116, 38 138 
                 C35 152, 33 172, 32 186 
                 C32 192, 36 195, 41 192 
                 C46 188, 50 170, 52 154 
                 C55 138, 60 114, 66 94 Z"
              fill={skinStyle.fill}
              stroke={skinStyle.stroke}
              strokeWidth={skinStyle.strokeWidth}
              filter={skinStyle.filter}
              className={skinStyle.className}
            />
            {/* Right Arm */}
            <path
              d="M142 80 
                 C149 92, 158 116, 162 138 
                 C165 152, 167 172, 168 186 
                 C168 192, 164 195, 159 192 
                 C154 188, 150 170, 148 154 
                 C145 138, 140 114, 134 94 Z"
              fill={skinStyle.fill}
              stroke={skinStyle.stroke}
              strokeWidth={skinStyle.strokeWidth}
              filter={skinStyle.filter}
              className={skinStyle.className}
            />
          </g>

          {/* BODY & LEGS (Graceful anatomical thighs, knees, calves) */}
          <g
            tabIndex={0}
            role="button"
            aria-label={`Musculoskeletal joints and legs. ${selectedCountsByRegion.body || 0} active symptoms.`}
            aria-pressed={activeRegion === 'body'}
            onClick={() => onSelectRegion('body')}
            onKeyDown={(e) => handleKeyDown(e, 'body')}
            className="outline-none focus-visible:ring-2 focus-visible:ring-[#2C5E4A]"
          >
            {/* Left Leg */}
            <path
              d="M74 196 
                 C80 200, 94 200, 97 206 
                 C95 228, 93 252, 92 270 
                 C92 284, 93 306, 91 328 
                 C90 334, 85 337, 80 336 
                 C76 332, 74 322, 74 308 
                 C73 286, 73 262, 71 242 
                 C69 224, 70 208, 74 196 Z"
              fill={bodyStyle.fill}
              stroke={bodyStyle.stroke}
              strokeWidth={bodyStyle.strokeWidth}
              filter={bodyStyle.filter}
              className={bodyStyle.className}
            />
            {/* Right Leg */}
            <path
              d="M126 196 
                 C120 200, 106 200, 103 206 
                 C105 228, 107 252, 108 270 
                 C108 284, 107 306, 109 328 
                 C110 334, 115 337, 120 336 
                 C124 332, 126 322, 126 308 
                 C127 286, 127 262, 129 242 
                 C131 224, 130 208, 126 196 Z"
              fill={bodyStyle.fill}
              stroke={bodyStyle.stroke}
              strokeWidth={bodyStyle.strokeWidth}
              filter={bodyStyle.filter}
              className={bodyStyle.className}
            />
          </g>

          {/* Active Area Subtle Glowing Dots / Landmark Markers */}
          {Object.entries(selectedCountsByRegion).map(([reg, count]) => {
            if (count === 0) return null;
            let cx = 100;
            let cy = 100;
            if (reg === 'head') { cx = 100; cy = 40; }
            else if (reg === 'chest') { cx = 100; cy = 105; }
            else if (reg === 'abdomen') { cx = 100; cy = 166; }
            else if (reg === 'skin') { cx = 45; cy = 135; }
            else if (reg === 'body') { cx = 85; cy = 250; }

            return (
              <g key={reg} className="pointer-events-none">
                <circle cx={cx} cy={cy} r="10" fill="url(#glowPulse)" />
                <circle cx={cx} cy={cy} r="3.5" fill="#2C5E4A" stroke="#FFFFFF" strokeWidth="1.5" />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-[#69756F] font-medium mt-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2C5E4A]" />
        <span>Tap any area on the body to focus</span>
      </div>
    </div>
  );
};
