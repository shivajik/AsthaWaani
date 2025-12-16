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
      <g>
        <circle cx="200" cy="200" r="180" stroke={color} strokeWidth="1" opacity="0.5" />
        <circle cx="200" cy="200" r="160" stroke={color} strokeWidth="1" opacity="0.6" />
        <circle cx="200" cy="200" r="140" stroke={color} strokeWidth="1" opacity="0.5" />
        <circle cx="200" cy="200" r="120" stroke={color} strokeWidth="1" opacity="0.6" />
        <circle cx="200" cy="200" r="100" stroke={color} strokeWidth="1" opacity="0.5" />
        <circle cx="200" cy="200" r="80" stroke={color} strokeWidth="1" opacity="0.6" />
        <circle cx="200" cy="200" r="60" stroke={color} strokeWidth="1" opacity="0.5" />
        <circle cx="200" cy="200" r="40" stroke={color} strokeWidth="1" opacity="0.6" />
        
        {[...Array(24)].map((_, i) => {
          const angle = (i * 15 * Math.PI) / 180;
          const x1 = 200 + Math.cos(angle) * 40;
          const y1 = 200 + Math.sin(angle) * 40;
          const x2 = 200 + Math.cos(angle) * 180;
          const y2 = 200 + Math.sin(angle) * 180;
          return (
            <line
              key={`ray-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={color}
              strokeWidth="0.8"
              opacity="0.4"
            />
          );
        })}
        
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const cx = 200 + Math.cos(angle) * 100;
          const cy = 200 + Math.sin(angle) * 100;
          return (
            <g key={`petal-group-${i}`}>
              <ellipse
                cx={cx}
                cy={cy}
                rx="12"
                ry="30"
                transform={`rotate(${i * 30} ${cx} ${cy})`}
                stroke={color}
                strokeWidth="1.5"
                fill={color}
                fillOpacity="0.15"
                opacity="0.7"
              />
            </g>
          );
        })}
        
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const cx = 200 + Math.cos(angle) * 140;
          const cy = 200 + Math.sin(angle) * 140;
          return (
            <g key={`outer-petal-${i}`}>
              <ellipse
                cx={cx}
                cy={cy}
                rx="18"
                ry="40"
                transform={`rotate(${i * 45} ${cx} ${cy})`}
                stroke={color}
                strokeWidth="1"
                fill={color}
                fillOpacity="0.1"
                opacity="0.6"
              />
            </g>
          );
        })}
        
        {[...Array(16)].map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          const cx = 200 + Math.cos(angle) * 165;
          const cy = 200 + Math.sin(angle) * 165;
          return (
            <circle
              key={`dot-${i}`}
              cx={cx}
              cy={cy}
              r="4"
              fill={color}
              opacity="0.5"
            />
          );
        })}
        
        {[...Array(8)].map((_, i) => {
          const angle = ((i * 45 + 22.5) * Math.PI) / 180;
          const cx = 200 + Math.cos(angle) * 60;
          const cy = 200 + Math.sin(angle) * 60;
          return (
            <path
              key={`inner-leaf-${i}`}
              d={`M ${cx} ${cy - 10} Q ${cx + 8} ${cy} ${cx} ${cy + 10} Q ${cx - 8} ${cy} ${cx} ${cy - 10}`}
              transform={`rotate(${i * 45 + 22.5} ${cx} ${cy})`}
              stroke={color}
              strokeWidth="1"
              fill={color}
              fillOpacity="0.2"
              opacity="0.6"
            />
          );
        })}

        <circle cx="200" cy="200" r="20" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.2" opacity="0.7" />
        <circle cx="200" cy="200" r="10" fill={color} opacity="0.4" />
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
      viewBox="0 0 150 150"
      className={cn("absolute pointer-events-none", className)}
      style={{ transform: `rotate(${rotations[position]}deg)` }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 0 0 Q 75 8 150 0"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.6"
      />
      <path
        d="M 0 0 Q 8 75 0 150"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.6"
      />
      
      <circle cx="20" cy="20" r="15" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" opacity="0.6" />
      <circle cx="20" cy="20" r="8" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.2" opacity="0.7" />
      <circle cx="20" cy="20" r="3" fill={color} opacity="0.5" />
      
      <path
        d="M 45 5 Q 50 25 70 30 Q 50 35 45 55 Q 40 35 20 30 Q 40 25 45 5"
        stroke={color}
        strokeWidth="1"
        fill={color}
        fillOpacity="0.1"
        opacity="0.5"
      />
      <path
        d="M 5 45 Q 25 50 30 70 Q 35 50 55 45 Q 35 40 30 20 Q 25 40 5 45"
        stroke={color}
        strokeWidth="1"
        fill={color}
        fillOpacity="0.1"
        opacity="0.5"
      />
      
      <ellipse cx="85" cy="15" rx="8" ry="20" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.1" opacity="0.5" transform="rotate(15 85 15)" />
      <ellipse cx="15" cy="85" rx="20" ry="8" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.1" opacity="0.5" transform="rotate(15 15 85)" />
      
      <circle cx="60" cy="60" r="5" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.2" opacity="0.4" />
      <circle cx="100" cy="25" r="3" fill={color} opacity="0.4" />
      <circle cx="25" cy="100" r="3" fill={color} opacity="0.4" />
      <circle cx="120" cy="40" r="2" fill={color} opacity="0.3" />
      <circle cx="40" cy="120" r="2" fill={color} opacity="0.3" />
    </svg>
  );
}
