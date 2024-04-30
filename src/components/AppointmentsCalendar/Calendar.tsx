import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import { useAppointmentsContext } from '@/context/AppointmentsContext';
import { ICalendarComponent, IAppointments } from '@/core/types';
import { ArrowLeft, ArrowRight } from '@/Images';
import ClinicService from '@/service/ClinicService';

export const CalendarComponent = ({ getDate }: ICalendarComponent) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<IAppointments[]>([]);
  const { setAppointments: setGlobalAppointments } = useAppointmentsContext();

  useEffect(() => {
    async function fetchAppointmentsForMonth() {
      try {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const response = await ClinicService.getAppointmentByMonth(year, month);
        setAppointments(response);
        setGlobalAppointments(response);
      } catch (error) {
        console.error('Erro ao buscar as consultas do mês:', error);
      }
    }
  
    fetchAppointmentsForMonth();
  }, [selectedDate, setGlobalAppointments]);
  
  const handleDateChange = (value: Date) => {
    setSelectedDate(value);
    getDate(value);
  };

  const handlePrevMonthClick = () => {
    const prevMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
    setSelectedDate(prevMonth);
  };

  const handleNextMonthClick = () => {
    const nextMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
    setSelectedDate(nextMonth);
  };

  const hasAppointments = (date: Date): boolean => {
    const appointmentDates = appointments.map(appointment => {
      const utcDate = new Date(appointment.consultationDate);
      const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
      return localDate.toLocaleDateString();
    });
    const currentDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toLocaleDateString();

    return appointmentDates.includes(currentDate);
  };

  const tileContent: (props: { date: Date; view: string }) => JSX.Element | null = ({ date, view }) => {
    if (view === 'month' && hasAppointments(date)) {
      return <div className="text-red-500">●</div>;
    }
    return null;
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="-slate-300 p-4 text-xs"
        onClickDecade={undefined}
        locale="pt-br"
        next2Label={null}
        prev2Label={null}
        prevLabel={<ArrowLeft onClick={handlePrevMonthClick} />}
        nextLabel={<ArrowRight onClick={handleNextMonthClick} />}
        tileContent={tileContent}
      />
    </div>
  );
};
