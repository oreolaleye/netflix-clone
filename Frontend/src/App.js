import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CreateMovieList from './components/CreateMovieList';
import MainPage from './components/MainPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={MainPage} /> 
          <Route path="/create" exact component={CreateMovieList} />
        </Switch>
      </div>
    </Router>
      
  );
}

export default App;
