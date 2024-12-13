import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface CalendarProps {
  onSelect: (date: Date) => void;
  selectedDate: Date | null;
}

export function Calendar({ onSelect, selectedDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.getTime() === today.getTime();
      const isSelected = selectedDate?.getTime() === date.getTime();
      const isPast = date < today;

      days.push(
        <button
          key={day}
          onClick={() => !isPast && onSelect(date)}
          disabled={isPast}
          className={`
            h-12 rounded-lg font-medium transition-all duration-200 flex items-center justify-center
            ${isPast ? 'text-gray-500 cursor-not-allowed' : 'text-white hover:bg-amber-500/20'}
            ${isToday ? 'border border-amber-500' : ''}
            ${isSelected ? 'bg-amber-500 text-white' : ''}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const prevMonth = () => {
    const today = new Date();
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    if (newDate.getMonth() >= today.getMonth() || newDate.getFullYear() > today.getFullYear()) {
      setCurrentDate(newDate);
    }
  };

  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long' });
  const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  return (
    <div className="w-full bg-black/40 p-6 rounded-lg border border-amber-500/20">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={prevMonth} size="icon">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h3 className="text-lg font-semibold text-white capitalize">
          {`${capitalizedMonth} ${currentDate.getFullYear()}`}
        </h3>
        <Button variant="outline" onClick={nextMonth} size="icon">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
          <div key={day} className="h-8 flex items-center justify-center text-amber-400 font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {generateCalendarDays()}
      </div>
    </div>
  );
}