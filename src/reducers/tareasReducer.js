import {
  LISTAR_TAREAS,
  GUARDAR,
  ACTUALIZAR,
  COMPLETAR,
  CANCELAR,
  ERROR
} from '../types/tareasTypes';

const INITIAL_STATE = {
  tareas: {},
  regresar: false
}

const tareasReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LISTAR_TAREAS:
      return {
        ...state,
        tareas: action.payload,
        regresar: false
      }

    case COMPLETAR:
      return { ...state, tareas: action.payload }
    case CANCELAR:
      return { ...state, tareas: action.payload }
    case ERROR:
      return { ...state, error: action.payload, cargando: false }
    default:
      return state
  }
}

export default tareasReducer;
