import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Conteudo from './pages/Conteudo'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Conteudo}/>
      </Router>
    </div>
  );
}

export default App;
