import Modal from "react-modal";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarModal } from "../hooks/useCalendarModal";
import { useUiStore } from "../../hooks";

registerLocale('es', es)
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  
  const {
    isDateModalOpen,
  } = useUiStore()

  const {
    formValues,
    onCloseModal,
    onDateChanged,
    onInputChange,
    onSubmit,
    titleClass,
  } = useCalendarModal();


  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker 
            selected={formValues.start}
            wrapperClassName="form-control"
            className="form-control"
            onChange={ (event) => onDateChanged(event, 'start') }
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker 
            minDate={formValues.start}
            selected={formValues.end}
            wrapperClassName="form-control"
            className="form-control"
            onChange={ (event) => onDateChanged(event, 'end') }
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${ titleClass }`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ formValues.title }
            onChange={ onInputChange }
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ formValues.notes }
            onChange={ onInputChange }
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
