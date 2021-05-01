<?php
// variables adaptables a cada sitio:
  class clsMysql{
    var $server = 'localhost';
    var $database = 'db_tareas';
    var $username = 'root';
    var $password = 'root';
    var $debug = 'true';
    
    #########################
    var $conexion;
    var $buscar;
    var $insert_id;
    var $row = array();

    // constructor para crear la conexiónn
    function __construct(){
      $this->conexion = @mysqli_connect($this->server, $this->username, $this->password, $this->database);
      @mysqli_query($this->conexion, "SET NAMES 'utf8'");
      if(!$this->conexion) {
        if($this->debug) {
          $strError = '';
          $strError .= "Error: No se pudo conectar a MySQL.".PHP_EOL;
          $strError .= "errno de depuración: ".mysqli_connect_errno().PHP_EOL;
          $strError .= "error de depuración: ".mysqli_connect_error().PHP_EOL;
          echo $strError;
        }
        exit;
      }
      return $this->conexion;
    }

    // ejecuta las sentencias SQL
    function query($sql){
      #mysql_query("SET NAMES 'utf8'");
      $this->buscar = @mysqli_query($this->conexion, $sql);
      if(!$this->buscar) {
        if($this->debug) {
          $strError = '';
          $strError .= "errno de depuración: ".mysqli_connect_errno().PHP_EOL;
          $strError .= "error de depuración: ".mysqli_connect_error().PHP_EOL;
          $strError .= "<pre>ERROR: En la sentencia: <b>'$sql'</b>.</pre>";
          echo $strError;
        }
      }
      return $this->buscar;
    }

    //  recorrer los registros
    function fetchRow(){
      if(isset($this->buscar)) {
        return $this->row = @mysqli_fetch_array($this->buscar);
      } else {
        if($this->debug) {
          $strError = '';
          $strError .= "errno de depuración: ".mysqli_connect_errno().PHP_EOL;
          $strError .= "error de depuración: ".mysqli_connect_error().PHP_EOL;
          $strError .= "<pre>ERROR: Sentencia no espcificada.</pre>";
          echo $strError;
        }
      }
    }

    //  recorrer los registros Object
    function fetchRowObject(){
      if(isset($this->buscar)) {
        return $this->row = @mysqli_fetch_object($this->buscar);
      } else {
        if($this->debug) {
          $strError = '';
          $strError .= "errno de depuración: ".mysqli_connect_errno().PHP_EOL;
          $strError .= "error de depuración: ".mysqli_connect_error().PHP_EOL;
          $strError .= "<pre>ERROR: Sentencia no espcificada.</pre>";
          echo $strError;
        }
      }
    }

    // recuperar el total de filas resultantes
    function resultCount(){
      $this->totalrecords = mysqli_num_rows($this->buscar);
      return $this->totalrecords;
    }
    
    //  recuperar el total de filas afectadas
    function affectedCount(){
      $this->totalrecords = mysqli_affected_rows($this->conexion);
      return $this->totalrecords;
    }
    
    // si existe un registro
    function resultExist(){
      if(isset($this->buscar) && ($this->resultCount() > 0)) {
        return TRUE;
      }
      return FALSE;
    }

    # moverse al principio de los registros
    function MoveFirst(){
      mysqli_data_seek($this->buscar, 0);
    }

    # moverse a un registro determinado
    function MoveNumReg($NumReg){
      mysqli_data_seek($this->buscar, $NumReg);
    }

    // Ultimo ID insertado
    function LastInsertId(){
      $this->insert_id = mysqli_insert_id($this->conexion);
      return $this->insert_id;
    }

    # Liberar Memoria
    function Free(){
      return mysqli_free_result($this->buscar);
    }

    # Cerrar Conexion
    function Close(){
      return mysqli_close($this->conexion);
    }

    #Quita caracteres espciales
    function RealEscape($q){
      if(is_array($q))
        foreach($q as $k => $v)
          $q[$k] = $this->RealEscape($v); //recursive
      else if(is_string($q))
        $q = mysqli_real_escape_string($this->conexion, $q);
      return $q;
    }

    # Codifica la cadena
    function fn_utf8_encode($q){
      if(is_array($q))
        foreach($q as $k => $v)
          $q[$k] = $this->fn_utf8_encode($v); //recursive
      else if(is_string($q))
        $q = utf8_encode($q);
      return $q;
    }

    # Decodifica la cadena
    function fn_utf8_decode($q){
      if(is_array($q))
        foreach($q as $k => $v)
          $q[$k] = $this->fn_utf8_decode($v); //recursive
      else if(is_string($q))
        $q = utf8_decode($q);
      return $q;
    }
  }

?>
