<?php
  header('Access-Control-Allow-Origin: *');
  header("Content-type: application/json; charset=utf-8");
  
  include ('mysql.php');
  $objDB = new clsMysql();
  
  $_REQUEST = $objDB->RealEscape($_REQUEST);
  
  $accion = $_REQUEST['accion'];
  
  switch($accion){
    case 'listar':
      $sql = "SELECT * FROM tareas";
      $objDB->query($sql);
  
      $rows = 0;
      
      while($objDB->fetchRowObject()){
        $arr[] = $objDB->row;
        $rows++;
      }
  
      #$data = array('total' => $rows, 'data' => $arr);
      $data = $arr;
      echo json_encode($data);
      
      break;
  
    case 'nueva':
      $fecha = getdate();
      $fecha = $fecha['year']."-".$fecha['mon']."-".$fecha['mday']." ".$fecha['hours'].":".$fecha['minutes'].":".$fecha['seconds'];
      
      $val = $_REQUEST['val'];
      $sql = "INSERT INTO tareas (tarea, status, fecha_creacion) VALUES('".$val."', 'activo', '".$fecha."') ";
      $objDB->query($sql);
    
      $sql = "SELECT * FROM tareas";
      $objDB->query($sql);
    
      $rows = 0;
    
      while($objDB->fetchRowObject()){
        $arr[] = $objDB->row;
        $rows++;
      }
    
      #$data = array('total' => $rows, 'data' => $arr);
      $data = $arr;
      echo json_encode($data);
    
      break;
  
    case 'editar':
      $fecha = getdate();
      $fecha = $fecha['year']."-".$fecha['mon']."-".$fecha['mday']." ".$fecha['hours'].":".$fecha['minutes'].":".$fecha['seconds'];
      
      $id = $_REQUEST['id'];
      $val = $_REQUEST['val'];
      $sql = "UPDATE tareas SET tarea = '".$val."', fecha_ultima_modificacion = '".$fecha."' WHERE id = '".$id."'";
      $objDB->query($sql);
    
      $sql = "SELECT * FROM tareas";
      $objDB->query($sql);
    
      $rows = 0;
    
      while($objDB->fetchRowObject()){
        $arr[] = $objDB->row;
        $rows++;
      }
    
      #$data = array('total' => $rows, 'data' => $arr);
      $data = $arr;
      echo json_encode($data);
    
      break;
      
    case 'completar':
      $id = $_REQUEST['id'];
      $val = $_REQUEST['val'] == 'true' ? 'completado' : 'activo';
      $sql = "UPDATE tareas SET status = '".$val."' WHERE id = '".$id."'";
      $objDB->query($sql);
    
      $sql = "SELECT * FROM tareas";
      $objDB->query($sql);
    
      $rows = 0;
    
      while($objDB->fetchRowObject()){
        $arr[] = $objDB->row;
        $rows++;
      }
    
      #$data = array('total' => $rows, 'data' => $arr);
      $data = $arr;
      echo json_encode($data);
    
      break;
    case 'cancelar':
      $id = $_REQUEST['id'];
      $sql = "UPDATE tareas SET status = 'cancelado' WHERE id = '".$id."'";
      $objDB->query($sql);
      
      $sql = "SELECT * FROM tareas";
      $objDB->query($sql);
  
      $rows = 0;
  
      while($objDB->fetchRowObject()){
        $arr[] = $objDB->row;
        $rows++;
      }
  
      #$data = array('total' => $rows, 'data' => $arr);
      $data = $arr;
      echo json_encode($data);
    
      break;
  
    default:
      echo '{"data": "Sin datos"}';
      break;
  }
  
