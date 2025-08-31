
import { useCountdown } from '@/hooks/useCountdown';

interface CountdownTimerProps {
  endDate: Date;
  className?: string;
}

const CountdownTimer = ({ endDate, className = "" }: CountdownTimerProps) => {
  const timeLeft = useCountdown(endDate);
  
  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && 
                   timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isExpired) {
    return (
      <div className={`countdown-timer ${className}`}>
        Offer Expired
      </div>
    );
  }

  return (
    <div className={`countdown-timer ${className} flex gap-1`}>
      <span>{String(timeLeft.days).padStart(2, '0')}d</span>
      <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
      <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
      <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
    </div>
  );
};

export default CountdownTimer;
