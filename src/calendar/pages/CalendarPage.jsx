import { addHours } from "date-fns"
import { Calendar } from 'react-big-calendar'
import { CalendarEvent, Navbar } from "../"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessagesEs } from "../../helpers"

const events = [{
  title: 'Cumpleaños del Jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'John'
  }
}]


export const CalendarPage = () => {

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return {
      style
    }
  }

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={ events }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={ getMessagesEs() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
      />
    </>
  )
}