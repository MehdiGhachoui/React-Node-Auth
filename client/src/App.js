import React  , {Component , Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import Routes from './routes/index'


function App() {

  return (
    <div className="App">

      <Fragment>
          <Router>
            <Switch>

              <Route  component={Routes} />

            </Switch>
          </Router>
      </Fragment>

    </div>
  );
}

export default App;
