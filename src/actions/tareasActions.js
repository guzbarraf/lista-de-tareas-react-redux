import axios from 'axios';
import {
  LISTAR_TAREAS,
  GUARDAR,
  ACTUALIZAR,
  COMPLETAR,
  CANCELAR,
  ERROR
} from '../types/tareasTypes';

const SERVER = 'http://tareas.maestrodiablero.com/';
//const SERVER = 'http://localhost/lista-de-tareas-react-redux/api';

export const listarTareas = () => async (dispatch) => {
  try{

    axios({
      method: "get",
      mode: 'no-cors',
      url: `${SERVER}?accion=listar`,
      headers: {
        "content-type": "application/json"
      }
    })
    .then(respuesta => {
      //console.log(respuesta);

      const tareas = {};

      respuesta.data.map(tarea => (
        tareas[tarea.id] = {
          ...tarea
        }
      ));

      //console.log(tareas);

      dispatch({
        type: LISTAR_TAREAS,
        payload: tareas
      });

    })
    .catch(error => console.log(error.message ));

  }
  catch (error) {
    //console.log(`Error: `, error)
    dispatch({
      type: ERROR,
      payload: 'Tareas no disponibles.'
    })
  }
}

export const chkStatusTarea = (id, val) => (dispatch) => {
  try{
    axios({
      method: "post",
      mode: 'no-cors',
      url: `${SERVER}?accion=completar&id=${id}&val=${val}`,
      headers: {
        "content-type": "application/json"
      }
    })
    .then(respuesta => {
      //console.log(respuesta);

      const tareas = {};

      respuesta.data.map(tarea => (
        tareas[tarea.id] = {
          ...tarea
        }
      ));

      //console.log(tareas);

      dispatch({
        type: COMPLETAR,
        payload: tareas
      });

    })
    .catch(error => console.log(error.message ));

    dispatch({
      type: LISTAR_TAREAS,
      payload: {}
    })
  }
  catch(error){
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: 'No se puede acceder'
    })
  }
}


export const cancelarTarea = (id) => async (dispatch) => {
  try{
    axios({
      method: "post",
      mode: 'no-cors',
      url: `${SERVER}?accion=cancelar&id=${id}`,
      headers: {
        "content-type": "application/json"
      }
    })
    .then(respuesta => {
      //console.log(respuesta);

      const tareas = {};

      respuesta.data.map(tarea => (
        tareas[tarea.id] = {
          ...tarea
        }
      ));

      //console.log(tareas);

      dispatch({
        type: CANCELAR,
        payload: tareas
      });

    })
    .catch(error => console.log(error.message ));

    dispatch({
      type: LISTAR_TAREAS,
      payload: {}
    })
  }
  catch(error){
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: 'No se puede acceder'
    })
  }
}
