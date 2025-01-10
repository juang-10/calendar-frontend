import { addHours, differenceInSeconds } from "date-fns";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";

export const useCalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);
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
    setIsOpen(false);
  };

  const onSubmit = (event) => {
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
  }

  return {
    formValues,
    isOpen,
    onCloseModal,
    onDateChanged,
    onInputChange,
    onSubmit,
    titleClass,
  }
}