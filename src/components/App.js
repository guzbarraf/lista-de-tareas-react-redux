import React from "react";
import { Router } from '@reach/router';
import '../css/App.css';

import Tareas from "./Tareas";


function App() {
  return (
    <div className="App">
      <Router>
        <Tareas path={'/'} />
        <Tareas path={'/tareas'} />
      </Router>
    </div>
  )
}

export default App;
