import { useEffect, useState } from "react"
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"
import { getMessagesEs, localizer } from "../../helpers"
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks"


export const CalendarPage = () => {

  const { user } = useAuthStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()
  const { openDateModal } = useUiStore()
  const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'week' )

  const eventStyleGetter = (event) => {
    
    const isMyEvent = ( user.uid === event.user._id ) || (user.uid === event.user.uid);

    const style = {
      backgroundColor: isMyEvent ? '#367CF7' :'#465660',
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
    setActiveEvent(e);
  }

  const onViewChanged = (e) => {
    localStorage.setItem('lastView', e);
    setLastView(e);
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])
  

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
      <FabAddNew />
      <FabDelete />
    </>
  )
}