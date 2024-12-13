import { createContext, useContext, useState, ReactNode } from 'react';

interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  barber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface SchedulingContextType {
  appointments: Appointment[];
  availableSlots: TimeSlot[];
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  bookAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => Promise<void>;
  getAvailableSlots: (date: Date, barberId: string) => Promise<TimeSlot[]>;
  cancelAppointment: (appointmentId: string) => Promise<void>;
}

const SchedulingContext = createContext<SchedulingContextType | undefined>(undefined);

const WORKING_HOURS = {
  start: 9, // 9 AM
  end: 20, // 8 PM
  duration: 30, // 30 minutes per appointment
};

export function SchedulingProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  const generateTimeSlots = (date: Date, barberId: string): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const currentDate = new Date();
    
    for (let hour = WORKING_HOURS.start; hour < WORKING_HOURS.end; hour++) {
      for (let minute = 0; minute < 60; minute += WORKING_HOURS.duration) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Check if the slot is in the past
        const slotDate = new Date(date);
        slotDate.setHours(hour, minute);
        
        const isAvailable = slotDate > currentDate && !appointments.some(
          apt => apt.date === date.toISOString().split('T')[0] && 
                apt.time === timeString && 
                apt.status !== 'cancelled'
        );

        slots.push({
          time: timeString,
          available: isAvailable,
        });
      }
    }
    
    return slots;
  };

  const getAvailableSlots = async (date: Date, barberId: string) => {
    // In a real application, this would make an API call
    const slots = generateTimeSlots(date, barberId);
    setAvailableSlots(slots);
    return slots;
  };

  const bookAppointment = async (appointmentData: Omit<Appointment, 'id' | 'status'>) => {
    // In a real application, this would make an API call
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
    };

    setAppointments([...appointments, newAppointment]);
  };

  const cancelAppointment = async (appointmentId: string) => {
    // In a real application, this would make an API call
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
    ));
  };

  return (
    <SchedulingContext.Provider
      value={{
        appointments,
        availableSlots,
        selectedDate,
        setSelectedDate,
        bookAppointment,
        getAvailableSlots,
        cancelAppointment,
      }}
    >
      {children}
    </SchedulingContext.Provider>
  );
}

export function useScheduling() {
  const context = useContext(SchedulingContext);
  if (context === undefined) {
    throw new Error('useScheduling must be used within a SchedulingProvider');
  }
  return context;
}