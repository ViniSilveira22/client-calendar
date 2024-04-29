import { StrictMode, useEffect, useState } from 'react';
import { ScheduleView } from '@/components/ScheduleTable';
import { CalendarComponent } from './Calendar';
import { AppointmentCard } from './AppointmentCard';
import { SchedulerDateTime } from '@devexpress/dx-react-scheduler';
import ClinicService from '@/service/ClinicService';
import { IAppointments } from '@/core/types'

export const AppointmentsCalendar = () => {
  const [currentDate, setCurrentDate] = useState<SchedulerDateTime>(new Date());
  const [appointments, setAppointments] = useState<IAppointments[]>([]);

  function getDate(date: Date | string) {
    const selectedDate = new Date(date);
    setCurrentDate(selectedDate);
    
    async function fetchAppointmentsForDate(selectedDate: Date) {
      try {
        const response = await ClinicService.getAppointmentByDate(selectedDate);
        setAppointments(response);
      } catch (error) {
        console.error('Erro ao buscar as consultas do dia:', error);
      }
    }
    fetchAppointmentsForDate(selectedDate);
  }

  useEffect(() => {
    setAppointments([]);
  }, [currentDate]);
    
  return (
    <section className="flex w-full flex-col items-center xl:w-fit xl:flex-row xl:items-start">
      <div className="w-80 py-8">
      <CalendarComponent getDate={getDate} />
        <div className="mt-7 flex w-full flex-col">
          <p className="mb-3">Consultas do dia</p>
          <div className="h-22 flex w-full flex-col overflow-y-auto py-4 scrollbar-thin">
            {appointments?.length ? (
              appointments.map((appointment) => (
                <StrictMode key={appointment.id_consulta.toString()}>
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
          appointments={appointments?.map(({ id_consulta, data_consulta, hora_inicio, hora_fim, nome_paciente }) => ({
            id: id_consulta,
            startDate: new Date(`${data_consulta}T${hora_inicio}`), 
            endDate: new Date(`${data_consulta}T${hora_fim}`), 
            title: `Consulta com ${nome_paciente}`,
          }))}
          currentDate={currentDate}
        />
      </div>
    </section>
  );
};
