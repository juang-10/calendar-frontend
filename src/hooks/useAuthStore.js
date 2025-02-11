import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { onChecking, onLogin, onLogout, clearErrorMessage } from "../store"

export const useAuthStore = () => {

  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async({email, password}) => {
    dispatch( onChecking())
    try {
      const { data } = await calendarApi.post('/auth', {email, password});
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch( onLogin({ name: data.name, uid: data.uid }));
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      dispatch( onLogout('Credenciales incorrectas'));
      setTimeout(() => {
        dispatch( clearErrorMessage() );
      }, 1000);
    }
  }

  return {
    //* Propiedades
    status,
    user,
    errorMessage,

    //* Métodos
    startLogin,
  }
}