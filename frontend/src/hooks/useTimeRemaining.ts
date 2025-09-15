import { useState, useEffect, useRef } from "react";

type TimeRemainingProps = {
  targetDate: Date | string;
};

type TimeUnits = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/**
 * Custom hook to calculate and update time remaining until a target date
 * @param targetDate The target date to count down to
 * @returns Object containing time units and status
 */
export function useTimeRemaining({ targetDate }: TimeRemainingProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeUnits>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate;
    
    // Define calculateTimeRemaining function first
    function calculateTimeRemaining() {
      const now = new Date();
      const difference = target.getTime() - now.getTime();
      
      if (difference <= 0) {
        setIsExpired(true);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeRemaining({ days, hours, minutes, seconds });
    }
    
    // Initial calculation
    calculateTimeRemaining();
    
    // Update every second
    intervalRef.current = setInterval(calculateTimeRemaining, 1000);
    
    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [targetDate]);
  
  return { ...timeRemaining, isExpired };
}