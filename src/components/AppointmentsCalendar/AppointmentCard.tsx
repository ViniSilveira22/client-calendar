import moment from 'moment'
import { AppointmentForm } from '@/components/AppointmentForm'
import { useStateContext } from '@/context/StateContext'
import { IAppointments } from '@/core/types'
import { Clock } from '@/Images'

export const AppointmentCard = (appointment: IAppointments) => {
  const { setModal } = useStateContext()
  const formatDate = moment(appointment.consultationDate).format('DD MMM, YYYY')
  const formatStart = moment(appointment.startTime, 'HH:mm A').format('HH:mm A')
  const formatEnd = moment(appointment.endTime, 'HH:mm A').format('HH:mm A')
  const patientName = appointment.patientName

  return (
    <article
      className="mt-3 flex w-full cursor-pointer flex-col rounded-lg border border-slate-300 p-2 transition-all hover:animate-pulse"
      onClick={() => {
        setModal({
          open: true,
          title: <p>Atualizar consulta</p>,
          body: <AppointmentForm appointment={appointment} />
        })
      }}
    >
      <p className="text-sm">{patientName}</p> 
      <p className="text-xs">{formatDate}</p>
      <span className="mt-3 flex flex-row items-center gap-x-2">
        <Clock />
        <p className="text-xs text-tertiary">
          {formatStart} - {formatEnd}
        </p>
      </span>
    </article>
  )
}
