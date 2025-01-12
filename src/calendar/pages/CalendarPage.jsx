import { Calendar } from 'react-big-calendar'
import { CalendarEvent, CalendarModal, Navbar } from "../"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessagesEs } from "../../helpers"
import { useState } from "react"
import { useCalendarStore, useUiStore } from "../../hooks"


export const CalendarPage = () => {

  const { events } = useCalendarStore()
  const { openDateModal } = useUiStore()
  const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'week' )

  const eventStyleGetter = () => {
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

  const onDoubleClick = () => {
    openDateModal()
  }

  const onSelect = (e) => {
    console.log({ click: e })
  }

  const onViewChanged = (e) => {
    localStorage.setItem('lastView', e);
    setLastView(e);
  }

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={ getMessagesEs() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal />
    </>
  )
}