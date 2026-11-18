"use client";

export default function IsometricStudio() {
  return (
    <div className="relative w-full max-w-[520px] mx-auto select-none">
      <svg
        viewBox="0 0 560 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[6px_8px_0px_rgba(0,0,0,0.28)]"
        role="img"
        aria-label="Isometric engineering studio showing dual workstations, Cisco router rack, and GI architectural monoliths"
      >
        {/* Background Memphis Geometric Accents */}
        <circle
          cx="82"
          cy="82"
          r="24"
          fill="var(--theme-secondary)"
          stroke="var(--theme-border)"
          strokeWidth="3"
        />
        <circle
          cx="488"
          cy="352"
          r="18"
          fill="var(--theme-surface)"
          stroke="var(--theme-border)"
          strokeWidth="3"
        />
        <path
          d="M44 290 C 65 250, 105 250, 118 282"
          stroke="var(--theme-hero-ink)"
          strokeWidth="3"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />
        <polygon
          points="495,88 518,124 472,124"
          fill="var(--theme-secondary)"
          stroke="var(--theme-border)"
          strokeWidth="3"
        />

        {/* Dot Matrix Grid Top Right */}
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <circle
              key={`dot-${row}-${col}`}
              cx={422 + col * 14}
              cy={52 + row * 14}
              r="2.6"
              fill="var(--theme-hero-ink)"
              opacity="0.7"
            />
          ))
        )}

        {/* Isometric Base Studio Plinth */}
        <polygon
          points="280,260 510,360 280,444 50,360"
          fill="var(--theme-surface-alt)"
          stroke="var(--theme-border)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <polygon
          points="50,360 280,444 280,456 50,372"
          fill="var(--theme-console-bg)"
          stroke="var(--theme-border)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <polygon
          points="510,360 280,444 280,456 510,372"
          fill="var(--theme-secondary)"
          stroke="var(--theme-border)"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Left Isometric Monolith Block ("G" Architectural Wing) */}
        <g>
          {/* Side face */}
          <polygon
            points="92,165 215,108 215,310 92,365"
            fill="var(--theme-surface)"
            stroke="var(--theme-border)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Top roof */}
          <polygon
            points="92,165 215,108 275,134 152,192"
            fill="var(--theme-surface-alt)"
            stroke="var(--theme-border)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Front thickness */}
          <polygon
            points="152,192 275,134 275,164 152,222"
            fill="var(--theme-surface)"
            stroke="var(--theme-border)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Cutout window bay */}
          <polygon
            points="126,225 198,191 198,282 126,316"
            fill="var(--theme-console-bg)"
            stroke="var(--theme-border)"
            strokeWidth="3"
          />
          {/* Live Packet Graph Inside Bay */}
          <polyline
            points="135,292 150,270 164,279 180,238 191,250"
            stroke="var(--theme-secondary)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="180" cy="238" r="3.5" fill="var(--theme-accent)" />
        </g>

        {/* Right Isometric Monolith Block ("I" / Server Tower Wing) */}
        <g>
          {/* Main Tower Front */}
          <polygon
            points="318,74 410,115 410,318 318,278"
            fill="var(--theme-surface)"
            stroke="var(--theme-border)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Tower Right Wall */}
          <polygon
            points="410,115 462,90 462,293 410,318"
            fill="var(--theme-surface-alt)"
            stroke="var(--theme-border)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Tower Top */}
          <polygon
            points="318,74 370,50 462,90 410,115"
            fill="var(--theme-secondary)"
            stroke="var(--theme-border)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Cisco Switch Rack Blades */}
          {[0, 1, 2, 3].map((slot) => {
            const yOff = slot * 36;
            return (
              <g key={`rack-${slot}`}>
                <polygon
                  points={`334,${125 + yOff} 394,${151 + yOff} 394,${173 + yOff} 334,${147 + yOff}`}
                  fill="var(--theme-console-bg)"
                  stroke="var(--theme-border)"
                  strokeWidth="2.5"
                />
                <circle
                  cx="344"
                  cy={141 + yOff}
                  r="3"
                  fill={slot === 0 ? "var(--theme-accent)" : "#34D399"}
                />
                <circle cx="354" cy={145 + yOff} r="2.5" fill="var(--theme-secondary)" />
              </g>
            );
          })}
        </g>

        {/* Center Isometric Engineering Desk */}
        <g>
          {/* Desk Surface */}
          <polygon
            points="170,295 295,238 402,286 277,344"
            fill="var(--theme-surface)"
            stroke="var(--theme-border)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Desk Front Apron */}
          <polygon
            points="170,295 277,344 277,364 170,315"
            fill="var(--theme-accent)"
            stroke="var(--theme-border)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <polygon
            points="277,344 402,286 402,306 277,364"
            fill="var(--theme-surface-alt)"
            stroke="var(--theme-border)"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Primary Wide Monitor */}
          <polygon
            points="220,214 316,170 316,238 220,282"
            fill="var(--theme-console-bg)"
            stroke="var(--theme-border)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Code / CLI Lines inside Monitor */}
          <line x1="234" y1="226" x2="278" y2="206" stroke="var(--theme-accent)" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="234" y1="240" x2="296" y2="212" stroke="var(--theme-secondary)" strokeWidth="3" strokeLinecap="round" />
          <line x1="234" y1="254" x2="272" y2="236" stroke="#34D399" strokeWidth="3" strokeLinecap="round" />
          <line x1="234" y1="267" x2="290" y2="241" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />

          {/* Mechanical Keyboard */}
          <polygon
            points="232,295 288,269 314,281 258,307"
            fill="var(--theme-console-bg)"
            stroke="var(--theme-border)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Coffee Mug */}
          <ellipse
            cx="338"
            cy="280"
            rx="11"
            ry="6"
            fill="var(--theme-secondary)"
            stroke="var(--theme-border)"
            strokeWidth="2.5"
          />
          <path
            d="M327 280 V296 C327 300 349 300 349 296 V280"
            fill="var(--theme-surface)"
            stroke="var(--theme-border)"
            strokeWidth="2.5"
          />
        </g>

        {/* Floating Isometric Spec Chips */}
        <g transform="translate(215, 72)">
          <rect
            x="0"
            y="0"
            width="86"
            height="30"
            rx="15"
            fill="var(--theme-surface)"
            stroke="var(--theme-border)"
            strokeWidth="3"
          />
          <circle cx="16" cy="15" r="5" fill="var(--theme-accent)" />
          <text
            x="27"
            y="19"
            fill="var(--theme-ink)"
            fontSize="11"
            fontWeight="800"
            fontFamily="var(--font-mono-code), monospace"
          >
            CCNA
          </text>
        </g>

        <g transform="translate(388, 365)">
          <rect
            x="0"
            y="0"
            width="106"
            height="30"
            rx="15"
            fill="var(--theme-console-bg)"
            stroke="var(--theme-border)"
            strokeWidth="3"
          />
          <circle cx="16" cy="15" r="5" fill="#34D399" />
          <text
            x="27"
            y="19"
            fill="var(--theme-console-ink)"
            fontSize="11"
            fontWeight="800"
            fontFamily="var(--font-mono-code), monospace"
          >
            NEXT.JS
          </text>
        </g>
      </svg>
    </div>
  );
}
