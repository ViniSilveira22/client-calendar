import { AppointmentModel, SchedulerDateTime } from '@devexpress/dx-react-scheduler'
import { Asset } from '@/Images'

export interface IChildren {
  children: React.ReactNode
}

export interface ISchedule {
  data_consulta: string
  hora_inicio: string
  hora_fim: string
}

export interface ISchedulerView {
  appointments: AppointmentModel[]
  currentDate: SchedulerDateTime
}

export interface IAppointmentContext {
  appointments: IAppointments[]
  setAppointments: React.Dispatch<React.SetStateAction<IAppointments[]>>
  saveAppointment(appointment: IAppointments): void
  removeAppointment(id: string): void
  updateAppointment(appointment: IAppointments): void
}

export interface IAppointmentForm {
  id_appointment?: string
  appointment_date: string;
  beginning: string;
  end: string;
  edit?: boolean
}

export interface IAppointments {
  id_appointment: string;
  appointment_date: string;
  beginning: string;
  end: string;
}


export interface IPatientForm {
  id_patient?: string
  name?: string;
  age?: number;
  birth?: string;
  father?: string;
  mother?: string;
  guardian: string;
  address?: string;
  phone?: string;
  school?: string;
  diagnosis?: string;
  edit?: boolean
}

export interface IPatients {
  id_patient: string
  name: string;
  age: number;
  birth: string;
  father: string;
  mother: string;
  guardian: string;
  address: string;
  phone: string;
  school: string;
  diagnosis: string;
}

export interface ILocalStorage {
  get(key: string): IAppointments | null
  set(key: string, data: string): void
}

export interface IStateContext {
  search: string
  menu: boolean
  modal: IModal
  selected: Omit<IItem, 'icon'>
}

export interface IValuesContext extends IStateContext {
  setSelected(selected: Omit<IItem, 'icon'>): void
  setSearch(search: string): void
  setMenu(menu: boolean): void
  setModal(modal: IModal): void
}

export type TActionContext =
  | { type: 'search'; search: string }
  | { type: 'menu'; menu: boolean }
  | { type: 'modal'; modal: IModal }
  | { type: 'selected'; selected: Omit<IItem, 'icon'> }

export interface IItem {
  name: string
  href: string
  icon: Asset
}

export interface INavButtons {
  item: IItem[]
}

export interface IModal {
  open: boolean
  body?: JSX.Element
  title?: JSX.Element
}

export interface ICalendarComponent {
  getDate(date: Date | string): void
}
