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
  id_consulta?: string
  data_consulta?: string
  hora_inicio?: string
  hora_fim?: string
  edit?: boolean
}

export interface IAppointments {
  id_consulta: string
  id_paciente: string
  nome_paciente: string
  data_consulta: string
  hora_inicio: string
  hora_fim: string
}

export interface IPatientForm {
  id_paciente?: string
  nome_crianca?: number
  data_nascimento?: string
  sexo?: string
  telefone?: string
  email?: string
  nome_pai?: string
  telefone_pai?: number
  email_pai?: string
  nome_mae?: string
  telefone_mae?: number
  email_mae?: string
  edit?: boolean
}

export interface IPatients {
  id_paciente: string
  nome_crianca: number
  data_nascimento: string
  sexo: string
  telefone: string
  email: string
  nome_pai: string
  telefone_pai: number
  email_pai: string
  nome_mae: string
  telefone_mae: number
  email_mae: string
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
