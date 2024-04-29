import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import ClinicService from '@/service/ClinicService';
import { useAppointmentsContext } from '@/context/AppointmentsContext';
import { useStateContext } from '@/context/StateContext';
import { IAppointments, IPatients } from '@/core/types';

interface IAppointmentForm {
  appointment?: IAppointments;
}

export const AppointmentForm = ({ appointment }: IAppointmentForm) => {
  const { saveAppointment, removeAppointment, updateAppointment } =
    useAppointmentsContext();
  const { setModal } = useStateContext();
  const { register, handleSubmit } = useForm<IAppointments>();
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null); 

  useEffect(() => {
    async function fetchPatients() {
      try {
        const patients: IPatients[] = await ClinicService.getPatients();
        setPatients(patients);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    }    
    fetchPatients();
  }, []);

  const onSubmit: SubmitHandler<IAppointments> = async (data) => {
    try {
      if (appointment) {
        updateAppointment(data);
      } else {
        data.id_paciente = selectedPatient.value;
        data.nome_paciente = selectedPatient.label;
        saveAppointment(data);
      }
      setModal({ open: false });
    } catch (error) {
      console.error('Error submitting appointment:', error);
    }
  };

  return (
    <div className="flex w-full justify-center bg-primary p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
        <label htmlFor="title" className="text-sm font-medium">
          Paciente:
        </label>
        <input
          {...register('id_paciente')}
          id="id_paciente"
          type="hidden"
          value={appointment?.id_paciente}
        />
        <Select
          className="text-sm font-medium"
          isClearable={true}
          options={patients.map(patient => ({
            value: patient.id_paciente,
            label: patient.nome_crianca.toString(),
          }))}
          onChange={(selectedOption) => setSelectedPatient(selectedOption)}
          value={selectedPatient} 
          required
        />
        <label htmlFor="date" className="text-sm font-medium">
          Data consulta:
        </label>
        <input
          {...register('data_consulta', { required: true })}
          type="date"
          defaultValue={appointment?.data_consulta}
          className="mb-2 rounded-lg bg-search p-2 text-sm font-medium text-navTitle"
        />
        <label htmlFor="time" className="text-sm font-medium">
          Hora início:
        </label>
        <input
          {...register('hora_inicio', { required: true })}
          type="time"
          defaultValue={appointment?.hora_inicio}
          className="mb-2 rounded-lg bg-search p-2 text-sm font-medium text-navTitle"
        />
        <label htmlFor="time" className="text-sm font-medium">
          Hora fim:
        </label>
        <input
          {...register('hora_fim', { required: true })}
          type="time"
          defaultValue={appointment?.hora_fim}
          className="mb-2 rounded-lg bg-search p-2 text-sm font-medium text-navTitle"
        />
        {appointment ? (
          <span className="flex flex-row gap-x-2">
            <button className="mt-3 flex flex-1 justify-center rounded-lg bg-navHover py-2 px-4 text-primary transition-colors hover:bg-secondary hover:text-textHover">
              Atualizar
            </button>
            <button
              className="mt-3 flex rounded-lg bg-deleteBtn py-2 px-4 transition-colors hover:bg-deleteBtnHover hover:text-secondary"
              onClick={(e) => {
                e.preventDefault()
                removeAppointment(appointment.id_consulta)
                setModal({ open: false })
              }}
            >
              Excluir
            </button>
          </span>
        ) : (
          <button
            type="submit"
            className="mt-3 rounded-lg bg-navHover py-2 px-4 text-primary transition-colors hover:bg-secondary hover:text-textHover"
          >
          {appointment ? 'Atualizar' : 'Marcar consulta'}
        </button>
        )}
      </form>
    </div>
  )
}
