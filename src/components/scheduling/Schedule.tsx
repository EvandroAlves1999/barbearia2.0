import { useState } from 'react';
import { Calendar } from './Calendar';
import { TimeSlots } from './TimeSlots';
import { AppointmentForm } from './AppointmentForm';
import { Card } from '../ui/Card';
import { useScheduling } from '../../contexts/SchedulingContext';

export function Schedule() {
  const { selectedDate, setSelectedDate } = useScheduling();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setIsFormOpen(true);
  };

  return (
    <section id="schedule" className="py-32 relative">
      {/* Vintage barbershop background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=2074)',
          opacity: '0.15'
        }}
      />
      
      {/* Textured overlay for vintage feel */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px] opacity-20"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 text-white">Agendamento</h2>
          <p className="text-white max-w-2xl mx-auto text-lg">
            Escolha o melhor horário para seu atendimento
          </p>
        </div>

        <Card className="max-w-5xl mx-auto bg-[rgba(8,8,8,0.9)] backdrop-blur-xl border border-[#3a2c1f]/30">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="border-r border-[#3a2c1f]/30 pr-8">
              <h3 className="text-xl font-semibold text-[#d4b69b] mb-6">
                Selecione uma Data
              </h3>
              <Calendar onSelect={handleDateSelect} selectedDate={selectedDate} />
            </div>
            <div className="pl-4">
              <h3 className="text-xl font-semibold text-[#d4b69b] mb-6">
                {selectedDate ? 'Horários Disponíveis' : 'Selecione uma data para ver os horários'}
              </h3>
              {selectedDate && (
                <TimeSlots
                  date={selectedDate}
                  selectedTime={selectedTime}
                  onTimeSelect={handleTimeSelect}
                />
              )}
            </div>
          </div>
        </Card>

        <AppointmentForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          date={selectedDate}
          time={selectedTime}
        />
      </div>
    </section>
  );
}