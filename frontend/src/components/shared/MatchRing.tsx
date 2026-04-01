import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MatchRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const MatchRing = ({ score, size = 80, strokeWidth = 6, className }: MatchRingProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const ref = useRef<SVGSVGElement>(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  const color = score >= 90 ? 'hsl(160, 84%, 39%)' : score >= 70 ? 'hsl(217, 91%, 60%)' : 'hsl(38, 92%, 50%)';

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 200);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg ref={ref} width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(230, 25%, 20%)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute text-sm font-bold font-heading">{Math.round(animatedScore)}%</span>
    </div>
  );
};
