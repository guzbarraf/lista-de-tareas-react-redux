import axios from 'axios';
import {
  LISTAR_TAREAS,
  GUARDAR,
  ACTUALIZAR,
  COMPLETAR,
  CANCELAR,
  ERROR
} from '../types/tareasTypes';

// url a donde se encuentra la api para alamcenar las tareas
const SERVER = 'http://tareas.maestrodiablero.com/';
//const SERVER = 'http://localhost/lista-de-tareas-react-redux/api';

// Acción de Redux para listar las tareas
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

// Acción de Redux para crear
export const nuevaTarea = (val) => async (dispatch) => {
    try{
      axios({
        method: "post",
        mode: 'no-cors',
        url: `${SERVER}?accion=nueva&val=${val}`,
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
          type: GUARDAR,
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

// Acción de Redux para actualizar el status de la tarea a copmpletada o activa
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

// Acción de Redux para editar una tarea
export const editarTarea = (id, val) => (dispatch) => {
  try{
    axios({
      method: "post",
      mode: 'no-cors',
      url: `${SERVER}?accion=editar&id=${id}&val=${val}`,
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
        type: ACTUALIZAR,
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

// Acción de Redux para cancelar una tarea
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
