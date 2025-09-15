import { useTimeRemaining } from "@/hooks/useTimeRemaining";
import { useEffect } from "react";

type CountdownTimerProps = {
  targetDate: Date | string;
  className?: string;
  onExpire?: () => void;
};

/**
 * Component to display a countdown timer to a target date
 */
export function CountdownTimer({ targetDate, className = "", onExpire }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired } = useTimeRemaining({ targetDate });
  
  // Call the onExpire callback when timer expires using useEffect
  useEffect(() => {
    if (isExpired && onExpire) {
      onExpire();
    }
  }, [isExpired, onExpire]);
  
  return (
    <div className={`flex flex-col ${className}`}>
      {isExpired ? (
        <div className="text-red-500 font-bold">Time's up!</div>
      ) : (
        <>
          <div className="flex gap-2 text-center">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{days}</span>
              <span className="text-xs text-muted-foreground">Days</span>
            </div>
            <div className="text-xl font-bold">:</div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{hours}</span>
              <span className="text-xs text-muted-foreground">Hours</span>
            </div>
            <div className="text-xl font-bold">:</div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{minutes}</span>
              <span className="text-xs text-muted-foreground">Min</span>
            </div>
            <div className="text-xl font-bold">:</div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{seconds}</span>
              <span className="text-xs text-muted-foreground">Sec</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}