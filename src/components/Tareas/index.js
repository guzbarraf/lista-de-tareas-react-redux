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
  FechaTarea
} from "./styles";

import * as tareasActions from '../../actions/tareasActions';

class Tareas extends Component {

  componentDidMount() {
    if (!Object.keys(this.props.tareas).length) {
      this.props.listarTareas();
    }
  }

  componentDidUpdate() {
    const {tareas, cargando, listarTareas} = this.props;

    if (!Object.keys(tareas).length && !cargando) {
      listarTareas()
      //console.log(this.props)
    }
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
            <BotonAccion>
              <a to={`/tareas/guardar/${item.id}/`}>
                Editar
              </a>
            </BotonAccion>
            <BotonAccion>
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

        {this.mostrarTareas()}
      </ContTasks>

    )
  }
}

const mapStateToProps = ({tareasReducer}) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);
