import { ViewState } from '@devexpress/dx-react-scheduler'
import {
  Appointments,
  DayView,
} from '@devexpress/dx-react-scheduler-material-ui'
import Paper from '@mui/material/Paper'
import Scheduler from '@/devexpress/dx-react-scheduler-material-ui'

import { useStateContext } from '@/context/StateContext'
import { ISchedulerView } from '@/core/types'

export const ScheduleView: React.FC<ISchedulerView> = ({
  appointments,
  currentDate
}) => {
  const { search } = useStateContext()

  const filtered = (appointments ?? []).filter(({ title }) =>
    title?.toLocaleLowerCase().includes(search?.toLocaleLowerCase())
  );
  
  return (
    <Paper>
      <Scheduler data={filtered} locale='pt-br'>
        <ViewState currentDate={currentDate} />
        <DayView startDayHour={8} endDayHour={18} />
        <Appointments />
      </Scheduler>
    </Paper>
  )
}
