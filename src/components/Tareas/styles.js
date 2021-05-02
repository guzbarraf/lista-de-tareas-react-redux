import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyleTareas = createGlobalStyle`
  .classCancelado{
    text-decoration: line-through;
    color: #dedede !important;
    
    & > div{
      color: #dedede !important;
    }
  }
  
  .btnGuardar{
    height: 40px !important;
    padding: 10px 15px;
    font-size: 16px;
    background-color: #16a085;
    color: #ecf0f1;
  }
  .btnEditar{
    background-color: #f1c40f;
    color: #34495e;
  }
  .btnCancelar{
    background-color: #c0392b;
    color: #ecf0f1;
  }
`
export const ContNuevaTarea = styled.div`
  display: grid;
  grid-template-columns: 400px 200px;
  grid-template-rows: auto;
  gap: 0px 0px;
  grid-template-areas: ". .";
  
  margin: 15px;
`
export const Input = styled.input`
  position: relative;
  width: 100%;
  height: 30px;
  
  margin-left: 15px;
  padding-left: 10px;
  
  font: 18px Verdana;
  color: #666666;
`
export const ContMenu = styled.div`
  position: relative;
  
  margin-bottom: 15px;
  
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`
export const ContTasks = styled.div`
  position: relative;
  
  width: 600px;
  height: auto;
  
  margin: 10px auto;
  
  border: 1px solid #dadada;
  border-radius: 8px;
`
export const TituloApp = styled.div`
  padding: 15px;
  
  font: 25px Verdana;
  color: #666;
`
export const ContItemTask = styled.div`
  display: grid;
  grid-template-columns: 50px 400px 150px;
  grid-template-rows: auto;
  gap: 0px 0px;
  grid-template-areas: ". . .";
  
  padding: 7px;
`
export const ContCheck = styled.div`
  width: 100%;
  height: auto;
`
export const NombreTarea = styled.div`
  font: 14px Verdana;
  text-align: start;
  color: #5d5d5d;
`
export const FechaTarea = styled.div`
  font: 11px Verdana;
  color: #5d5d5d;
`
export const ContBotones = styled.div`
  position: relative;
  float: right;
  
  display: flex;
  justify-content: space-evenly;
`
export const BotonAccion = styled.button`
  width: auto;
  height: 22px;
  
  font: 12px Verdana;
  color: #494450;
  
  border: 1px solid transparent;
  border-radius: 3px;
  
  cursor: pointer;
`
