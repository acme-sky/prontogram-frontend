import { useState } from 'react'
import './App.css'
import SignInSide from './components/SignInSide'
import { BrowserRouter as Router, Route} from 'react-router-dom';

function App() {

  return (
    <Router>
      <div>
      <Switch>
        <Route path="/login" component={SignInSide} />
        <Redirect from="/" to="/login" />
      </Switch>
      </div>
    </Router>
  );
}

export default App
