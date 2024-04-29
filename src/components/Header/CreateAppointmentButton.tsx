import { AppointmentForm } from '@/components/AppointmentForm'
import { useStateContext } from '@/context/StateContext'

export const CreateAppointmentsButton = () => {
  const { setModal } = useStateContext()

  return (
    <button
      onClick={() => {
        setModal({
          open: true,
          title: <p>Adicionar consulta</p>,
          body: <AppointmentForm />
        })
      }}
      className="rounded-lg bg-button py-2 px-4 hover:opacity-80"
    >
      <p className="font-normal text-eventBtn">
        + Adicionar consulta
      </p>
    </button>
  )
}