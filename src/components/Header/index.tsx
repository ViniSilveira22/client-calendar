import { Hamburguer } from '@/components/Hamburguer'
import { CreateAppointmentsButton } from './CreateAppointmentButton'
import HeaderDate from './Date'

export const Header = () => {
  return (
    <header className="flex w-full flex-row border-b border-slate-300 p-10">
      <nav className="flex w-full flex-wrap items-center justify-center gap-5 xl:justify-between">
        <div className="flex gap-4">
          <Hamburguer />
        </div>
        <HeaderDate />
        <div className="flex flex-wrap items-center justify-center gap-2 xl:justify-end">
          <CreateAppointmentsButton />
        </div>
      </nav>
    </header>
  )
}