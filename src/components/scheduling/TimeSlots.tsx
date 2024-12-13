import { useEffect } from 'react';
import { useScheduling } from '../../contexts/SchedulingContext';
import { Button } from '../ui/Button';
import { Clock } from 'lucide-react';

interface TimeSlotsProps {
  date: Date;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

export function TimeSlots({ date, selectedTime, onTimeSelect }: TimeSlotsProps) {
  const { getAvailableSlots, availableSlots } = useScheduling();

  useEffect(() => {
    getAvailableSlots(date, 'default-barber');
  }, [date]);

  // Group time slots by period
  const periods = {
    morning: availableSlots.filter(slot => {
      const hour = parseInt(slot.time.split(':')[0]);
      return hour >= 9 && hour < 12;
    }),
    afternoon: availableSlots.filter(slot => {
      const hour = parseInt(slot.time.split(':')[0]);
      return hour >= 12 && hour < 18;
    }),
    evening: availableSlots.filter(slot => {
      const hour = parseInt(slot.time.split(':')[0]);
      return hour >= 18;
    })
  };

  return (
    <div className="space-y-6">
      {Object.entries(periods).map(([period, slots]) => slots.length > 0 && (
        <div key={period} className="space-y-4">
          <h4 className="text-lg font-medium text-amber-400 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {period === 'morning' ? 'Manhã' : period === 'afternoon' ? 'Tarde' : 'Noite'}
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {slots.map(({ time, available }) => (
              <Button
                key={time}
                variant={selectedTime === time ? 'neon' : 'outline'}
                disabled={!available}
                onClick={() => available && onTimeSelect(time)}
                className={`${!available && 'opacity-50'} transition-all duration-200`}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      ))}

      {availableSlots.length === 0 && (
        <p className="text-amber-400 text-center py-4">
          Nenhum horário disponível para esta data.
        </p>
      )}
    </div>
  );
}