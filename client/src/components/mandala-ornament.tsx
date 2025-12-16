import { cn } from "@/lib/utils";

interface MandalaOrnamentProps {
  className?: string;
  side?: "left" | "right";
  color?: string;
}

export function MandalaOrnament({ className, side = "left", color = "#C4A052" }: MandalaOrnamentProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={cn(
        "absolute pointer-events-none",
        side === "right" && "scale-x-[-1]",
        className
      )}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`mandalaGradient-${side}`} cx="0%" cy="50%" r="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="50%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <g opacity="0.6">
        <circle cx="50" cy="200" r="180" stroke={color} strokeWidth="0.5" opacity="0.3" />
        <circle cx="50" cy="200" r="150" stroke={color} strokeWidth="0.5" opacity="0.4" />
        <circle cx="50" cy="200" r="120" stroke={color} strokeWidth="0.5" opacity="0.5" />
        <circle cx="50" cy="200" r="90" stroke={color} strokeWidth="0.5" opacity="0.6" />
        <circle cx="50" cy="200" r="60" stroke={color} strokeWidth="0.5" opacity="0.7" />
        
        {[...Array(16)].map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          const x1 = 50 + Math.cos(angle) * 60;
          const y1 = 200 + Math.sin(angle) * 60;
          const x2 = 50 + Math.cos(angle) * 180;
          const y2 = 200 + Math.sin(angle) * 180;
          return (
            <line
              key={`ray-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={color}
              strokeWidth="0.3"
              opacity="0.3"
            />
          );
        })}
        
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const cx = 50 + Math.cos(angle) * 100;
          const cy = 200 + Math.sin(angle) * 100;
          return (
            <g key={`petal-group-${i}`}>
              <ellipse
                cx={cx}
                cy={cy}
                rx="15"
                ry="30"
                transform={`rotate(${i * 45 + 90} ${cx} ${cy})`}
                stroke={color}
                strokeWidth="0.5"
                fill="none"
                opacity="0.4"
              />
              <ellipse
                cx={cx}
                cy={cy}
                rx="10"
                ry="20"
                transform={`rotate(${i * 45 + 90} ${cx} ${cy})`}
                stroke={color}
                strokeWidth="0.3"
                fill="none"
                opacity="0.3"
              />
            </g>
          );
        })}
        
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const cx = 50 + Math.cos(angle) * 140;
          const cy = 200 + Math.sin(angle) * 140;
          return (
            <circle
              key={`dot-${i}`}
              cx={cx}
              cy={cy}
              r="3"
              fill={color}
              opacity="0.3"
            />
          );
        })}
        
        {[...Array(8)].map((_, i) => {
          const angle = ((i * 45 + 22.5) * Math.PI) / 180;
          const cx = 50 + Math.cos(angle) * 160;
          const cy = 200 + Math.sin(angle) * 160;
          return (
            <path
              key={`leaf-${i}`}
              d={`M ${cx} ${cy - 12} Q ${cx + 8} ${cy} ${cx} ${cy + 12} Q ${cx - 8} ${cy} ${cx} ${cy - 12}`}
              transform={`rotate(${i * 45 + 22.5} ${cx} ${cy})`}
              stroke={color}
              strokeWidth="0.5"
              fill="none"
              opacity="0.35"
            />
          );
        })}

        <path
          d="M 50 20 Q 80 60 50 100 Q 20 60 50 20"
          stroke={color}
          strokeWidth="0.5"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M 50 300 Q 80 340 50 380 Q 20 340 50 300"
          stroke={color}
          strokeWidth="0.5"
          fill="none"
          opacity="0.3"
        />
      </g>
    </svg>
  );
}

export function CornerOrnament({ className, position = "top-left", color = "#C4A052" }: { 
  className?: string; 
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color?: string;
}) {
  const rotations = {
    "top-left": 0,
    "top-right": 90,
    "bottom-right": 180,
    "bottom-left": 270,
  };
  
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("absolute pointer-events-none", className)}
      style={{ transform: `rotate(${rotations[position]}deg)` }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 0 0 Q 50 5 100 0"
        stroke={color}
        strokeWidth="0.5"
        opacity="0.4"
      />
      <path
        d="M 0 0 Q 5 50 0 100"
        stroke={color}
        strokeWidth="0.5"
        opacity="0.4"
      />
      <path
        d="M 0 0 C 20 20 40 40 60 60"
        stroke={color}
        strokeWidth="0.3"
        opacity="0.3"
      />
      <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <circle cx="10" cy="10" r="4" stroke={color} strokeWidth="0.3" opacity="0.4" />
      <path
        d="M 25 0 Q 27 15 40 20 Q 27 25 25 40 Q 23 25 10 20 Q 23 15 25 0"
        stroke={color}
        strokeWidth="0.4"
        fill="none"
        opacity="0.35"
      />
      <path
        d="M 0 25 Q 15 27 20 40 Q 25 27 40 25 Q 25 23 20 10 Q 15 23 0 25"
        stroke={color}
        strokeWidth="0.4"
        fill="none"
        opacity="0.35"
      />
    </svg>
  );
}
