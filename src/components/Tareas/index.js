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

  componentDidMount() {
    if (!Object.keys(this.props.tareas).length) {
      this.props.listarTareas();
      console.log('component did mount')
      console.log('props => ',this.props.listarTareas())
    }
  }

  componentDidUpdate() {
    const {tareas, cargando, listarTareas} = this.props;

    if (!Object.keys(tareas).length && !cargando) {
      listarTareas()
      console.log('this.props')
    }
  }

  ocultarTareasCanceladas = () => {
    console.log('ocultarTareasCanceladas')
  }

  crearTarea = () => {
    const {nuevaTarea} = this.props;

    let val = document.getElementById('txtNuevaTarea').value;

    nuevaTarea(val);

    document.getElementById('txtNuevaTarea').value = '';
  }

  mostrarTareas = () => {
    const {tareas, chkStatusTarea, cancelarTarea} = this.props;

    console.log('Tareas => ', tareas);

    return Object.values(tareas).map(item => {

      let classCancelado = (item.status === 'cancelado') ? 'classCancelado' : '';

      return (
        <ContItemTask key={item.id} className={classCancelado}>
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
            <FechaTarea>{item.fecha_creacion}</FechaTarea>
          </NombreTarea>

          <ContBotones>
            <BotonAccion className={'btnEditar'}>
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
          <BotonAccion onClick={() => this.ocultarTareasCanceladas()}>
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
