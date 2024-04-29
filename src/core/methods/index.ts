import { IAppointments } from '@/core/types'

export const LocalStorage = () => {
  const get = (key: string) => {
    const getItem = localStorage.getItem(key)
    const response: IAppointments[] = getItem ? JSON.parse(getItem) : []

    return response
  }

  const set = (key: string, data: string) => {
    localStorage.setItem(key, data)
  }

  return { get, set }
}

export const CRUD = () => {
  const add = (appointments: IAppointments[], appointment: IAppointments) => {
    return [...appointments, appointment]
  }
  const remove = (appointments: IAppointments[], appointmentId: string) => {
    return appointments.filter(({ id_consulta }) => id_consulta !== appointmentId)
  }

  const update = (appointment: IAppointments, appointments: IAppointments[]) => {
    return [appointment, ...appointments.filter(({ id_consulta }) => id_consulta !== appointment.id_consulta)]
  }

  return { add, update, remove }
}
