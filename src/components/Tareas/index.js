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
      editar: 0
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

  crearTarea = () => {
    const {nuevaTarea, editarTarea} = this.props;

    let val = document.getElementById('txtNuevaTarea').value;

    console.log('this.state.editar', this.state.nueveditar);

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

  initEditarTarea = (id, tarea) => {
    //console.log('initEditarTarea', tarea);
    this.setState({
      id: id,
      editar: 1
    });
    document.getElementById('txtNuevaTarea').value = tarea;
  }

  ocultarTareasCanceladas = () => {

  }


  mostrarTareas = () => {
    const {tareas, chkStatusTarea, cancelarTarea} = this.props;

    //console.log('Tareas => ', tareas);

    return Object.values(tareas).map(item => {

      let classCancelado = (item.status === 'cancelado') ? 'tarea-cancelada' : '';

      return (
        <ContItemTask
          key={item.id}
          className={`
            ${classCancelado}
            ${this.state.ocultarCanceladas
              && classCancelado === 'tarea-cancelada'
              ? 'ocultar-canceladas'
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

        <ContMenu>
          <BotonAccion>
            Filtrar completadas
          </BotonAccion>
          <BotonAccion>
            Filtrar no completadas
          </BotonAccion>
          <BotonAccion id={'btnOcultarCanceladas'} onClick={() => this.ocultarTareasCanceladas()}>
            Ocultar canceladas
          </BotonAccion>
        </ContMenu>

        <div>
          {this.mostrarTareas()}
        </div>
      </ContTasks>

    )
  }
}

const mapStateToProps = ({tareasReducer}) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);
