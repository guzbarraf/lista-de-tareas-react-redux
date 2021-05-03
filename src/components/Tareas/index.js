import React, {Component} from "react"
import {connect} from 'react-redux'
import {
  GlobalStyleTareas,
  ContTasks,
  ContItemTask,
  TituloApp,
  NombreTarea,
  ContBotones,
  ContCheck,
  BotonAccion,
  FechaTarea, ContMenu, ContNuevaTarea, Input
} from "./styles";

import * as tareasActions from '../../actions/tareasActions';

class Tareas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      editar: 0,
      ocultarCanceladas: 0,
      filtrarCompletadas: 0,
      filtrarNoCompletadas: 0
    };
  }

  componentDidMount() {
    if (!Object.keys(this.props.tareas).length) {
      this.props.listarTareas();
      //console.log('props => ',this.props.listarTareas());
    }
  }

  componentDidUpdate() {
    const {tareas, cargando, listarTareas} = this.props;

    if (!Object.keys(tareas).length && !cargando) {
      listarTareas();
    }
  }

  // función para crear o editar la tarea según sea el valor del estado "editar"
  crearTarea = () => {
    const {nuevaTarea, editarTarea} = this.props;

    let val = document.getElementById('txtNuevaTarea').value;

    //console.log('this.state.editar', this.state.nueveditar);

    if(this.state.editar === 0){
      nuevaTarea(val);
    }else{
      editarTarea(this.state.id, val);
    }

    document.getElementById('txtNuevaTarea').value = '';
    this.setState({
      id: 0,
      editar: 0
    });
  }

  // función que coloca la tarea en el input y cambia el valor del estado "editar"
  initEditarTarea = (id, tarea) => {
    //console.log('initEditarTarea', tarea);
    this.setState({
      id: id,
      editar: 1
    });
    document.getElementById('txtNuevaTarea').value = tarea;
  }

  // función para ocultar als tareas de la lista
  ocultarTareasCanceladas = () => {
    const textoBtn = this.state.ocultarCanceladas ? 'Ocultar canceladas' : 'Mostrar canceladas';
    document.getElementById('btnOcultarCanceladas').innerText = textoBtn;

    this.setState({
      ocultarCanceladas: !this.state.ocultarCanceladas
    });
  }
  // función para filtrar las tareas completadas
  filtrarTareasCompletadas = () => {
    const textoBtn = this.state.filtrarCompletadas ? 'Filtrar completadas' : 'Mostrar todas las tareas';
    document.getElementById('btnFiltrarCompletadas').innerText = textoBtn;

    this.setState({
      filtrarCompletadas: !this.state.filtrarCompletadas
    });
  }
  // función para filtrar las tareas no completadas
  filtrarTareasNoCompletadas = () => {
    const textoBtn = this.state.filtrarNoCompletadas ? 'Filtrar no completadas' : 'Mostrar todas las tareas';
    document.getElementById('btnFiltrarNoCompletadas').innerText = textoBtn;

    this.setState({
      filtrarNoCompletadas: !this.state.filtrarNoCompletadas
    });
  }

  // función para mostrar las tareas
  mostrarTareas = () => {
    const {tareas, chkStatusTarea, cancelarTarea} = this.props;

    //console.log('Tareas => ', tareas);

    return Object.values(tareas).map(item => {

      // asignación de clases css a las tareas cacneladas y completadas
      let classCancelado = (item.status === 'cancelado') ? 'tarea-cancelada' : '';
      let classCompletado = (item.status === 'completado') ? 'tarea-completada' : '';

      return (
        <ContItemTask
          key={item.id}
          className={`
            ${classCancelado}
            ${classCompletado}
            
            // validaciones de los estados para filtrar u ocultar tareas 
            ${this.state.ocultarCanceladas
              && classCancelado === 'tarea-cancelada'
              ? 'ocultar-canceladas'
              : ''
            }
            ${this.state.filtrarCompletadas
              && item.status !== 'completado'
              ? 'ocultar-tareas'
              : ''
            }
            ${this.state.filtrarNoCompletadas
            && item.status !== 'activo'
              ? 'ocultar-tareas'
              : ''
            }
          `}
        >
          <ContCheck>
            <input
              type='checkbox'
              defaultChecked={
                item.status === 'completado'
                  ? true
                  : null
              }
              onChange={
                (e) => chkStatusTarea(item.id, e.target.checked)
              }
            />
          </ContCheck>
          <NombreTarea>
            <div><b>{item.id}:</b> {item.tarea}</div>
            <FechaTarea>
              {item.fecha_creacion}
              {
                // si existe algún dato en la fecha de modificación también se integra
                item.fecha_ultima_modificacion
                  ? ` ### ${item.fecha_ultima_modificacion}`
                  : null
              }
            </FechaTarea>
          </NombreTarea>

          <ContBotones>
            <BotonAccion className={'btnEditar'} onClick={() => this.initEditarTarea(item.id, item.tarea)}>
              Editar
            </BotonAccion>
            <BotonAccion className={'btnCancelar'} onClick={() => cancelarTarea(item.id)}>
              Cancelar
            </BotonAccion>
          </ContBotones>
        </ContItemTask>
      )
    })
  }

  render() {
    return (
      <ContTasks>
        <GlobalStyleTareas/>

        <TituloApp>
          ⚛️ Tareas en React y Redux ⚛️
        </TituloApp>

        {
          // input para crear tareas
        }
        <ContNuevaTarea>
          <div>
            <Input type="text" id={'txtNuevaTarea'} />
          </div>
          <div>
            <BotonAccion className={'btnGuardar'}  onClick={() => this.crearTarea()}>
              Guardar
            </BotonAccion>
          </div>
        </ContNuevaTarea>

        {
          // menú para filtrar u ocultar tareas
        }
        <ContMenu>
          <BotonAccion id={'btnFiltrarCompletadas'} onClick={() => this.filtrarTareasCompletadas()}>
            Filtrar completadas
          </BotonAccion>
          <BotonAccion id={'btnFiltrarNoCompletadas'} onClick={() => this.filtrarTareasNoCompletadas()}>
            Filtrar no completadas
          </BotonAccion>
          <BotonAccion id={'btnOcultarCanceladas'} onClick={() => this.ocultarTareasCanceladas()}>
            Ocultar canceladas
          </BotonAccion>
        </ContMenu>

        {
          // llamado a la funciíon para mostra las tareas
        }
        <div>
          {this.mostrarTareas()}
        </div>
      </ContTasks>

    )
  }
}

const mapStateToProps = ({tareasReducer}) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);
