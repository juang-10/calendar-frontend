import { addHours, differenceInSeconds } from "date-fns";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useCalendarStore, useUiStore } from "../../hooks";
import { useEffect } from "react";

export const useCalendarModal = () => {
  const { closeDateModal } = useUiStore()
  const { activeEvent, startSavingEvent } = useCalendarStore()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const [formValues, setFormValues] = useState({
    title: "Juan",
    notes: "Gonzalez",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if( !formSubmitted ) return '';

    return (formValues.title.length > 0) ? '' : 'is-invalid';

  }, [formValues.title, formSubmitted]);

  useEffect(() => {

    if( activeEvent !== null ) {
      setFormValues({...activeEvent});
    }
    
  }, [activeEvent])
  

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    });
  }

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  }

  const onCloseModal = () => {
    closeDateModal()
  };

  const onSubmit = async(event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if(isNaN(difference) || difference <= 0) { 
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
      return;
    }

    if(formValues.title.trim().length <= 0) {
      console.log('Error en titulo');
      return;
    }
    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  }

  return {
    formValues,
    onCloseModal,
    onDateChanged,
    onInputChange,
    onSubmit,
    titleClass,
  }
}