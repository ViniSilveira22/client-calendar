import { StrictMode, useEffect, useState } from 'react';
import { ScheduleView } from '@/components/ScheduleTable';
import { CalendarComponent } from './Calendar';
import { AppointmentCard } from './AppointmentCard';
import { useGetAppointmentByDate } from '@/service/ClinicService'; 
import { IAppointments } from '@/core/types';

export const AppointmentsCalendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const { data: appointments } = useGetAppointmentByDate(currentDate);



  function getDate(date: Date | string) {
    const selectedDate = new Date(date);
    setCurrentDate(selectedDate);
  }

  return (
    <section className="flex w-full flex-col items-center xl:w-fit xl:flex-row xl:items-start">
      <div className="w-80 py-8">
        <CalendarComponent getDate={getDate} />
        <div className="mt-7 flex w-full flex-col">
          <p className="mb-3">Consultas do dia</p>
          <div className="h-22 flex w-full flex-col overflow-y-auto py-4 scrollbar-thin">
            {appointments?.length ? (
              appointments.map((appointment: IAppointments) => (
                <StrictMode key={appointment.id.toString()}>
                  <AppointmentCard {...appointment} />
                </StrictMode>
              ))
            ) : (
              <p className="p-4">Não há nada aqui</p>
            )}
          </div>
        </div>
      </div>

      <div className="mx-8 flex w-full overflow-y-auto py-8 scrollbar-thin scrollbar-thumb-transparent xl:flex-1">
        <ScheduleView
          appointments={appointments?.map(({ id, consultationDate, startTime, endTime, patient }: IAppointments) => ({
            id: id,
            startDate: new Date(`${consultationDate}T${startTime}`),
            endDate: new Date(`${consultationDate}T${endTime}`),
            title: `Consulta com ${patient.name}`,
          }))}
          currentDate={currentDate}
        />
      </div>
    </section>
  );
};
