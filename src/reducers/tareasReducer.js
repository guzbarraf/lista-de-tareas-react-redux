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

// Reducer para las tareas
const tareasReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LISTAR_TAREAS:
      return {
        ...state,
        tareas: action.payload,
        regresar: false
      }
    case GUARDAR:
      return {
        ...state,
        tareas: {},
        regresar: false
      }
    case ACTUALIZAR:
      return { ...state, tareas: action.payload }
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
