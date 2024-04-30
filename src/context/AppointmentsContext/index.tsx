import { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import ClinicService from '@/service/ClinicService';
import { IChildren, IAppointments, IAppointmentContext, IPatients } from '@/core/types'

const defaultAppointment: IAppointmentContext = {
  appointments: [],
  setAppointments: () => [],
  saveAppointment: () => null,
  removeAppointment: () => null,
  updateAppointment: () => null
}

const AppointmentsContext = createContext(defaultAppointment)
const useAppointmentsContext = () => useContext(AppointmentsContext)
const AppointmentProvider = ({ children }: IChildren) => {
  const [appointments, setAppointments] = useState<IAppointments[]>([])

  const saveAppointment = async (appointment: IAppointments) => {
    try {
      await ClinicService.addAppointment(appointment);
      toast.success(`Consulta criada!`);
    } catch (error) {
      toast.error('Erro ao criar consulta. Por favor, tente novamente.');
    }
  };
  
  const removeAppointment = async(id: string) => {
    try {
      await ClinicService.deleteAppointment(id);
      toast.success(`Consulta excluida!`);
    } catch (error) {
      toast.error('Erro ao excluir consulta. Por favor, tente novamente.');
    }
  }

  const updateAppointment = async(appointment: IAppointments) => {
    try {
      await ClinicService.addAppointment(appointment);
      toast.success(`Consulta atualizada!`);
    } catch (error) {
      toast.error('Erro ao criar consulta. Por favor, tente novamente.');
    }
  }

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        setAppointments,
        saveAppointment,
        removeAppointment,
        updateAppointment
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  )
}

export { AppointmentProvider, useAppointmentsContext }
