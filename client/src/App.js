import React, { useState } from 'react';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import Features from './components/Landing/Features/Features';
import Home from './components/Landing/Home/Home';
import Login from './components/Landing/Login/Login';
import FirstStep from './components/Landing/Register/FirstStep';
import SecondStep from './components/Landing/Register/SecondStep';
import Progress from './components/Landing/Register/Progress';
import NavBarHandle from './components/Navigation/NavBar/NavBarHandle'

const App = () => {

  const [citizen, setCitizen] = useState({});

  const updateCitizen = (data) => {
    setCitizen((prevCitizen) => ({ ...prevCitizen, ...data }));
  };

  const resetCitizen = () => {
    setCitizen({});
  };

  return (
    <BrowserRouter>
      <NavBarHandle />
      <Progress />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/smartctzens-features">
            <Features />
          </Route>

          <Route path="/smartctzens-login">
            <Login />
          </Route>

          <Route
             render={(props) => (
              <FirstStep {...props} citizen={citizen} updateCitizen={updateCitizen} />
            )}
            path="/first"
             exact={true}
          />

          <Route
            render={(props) => (
              <SecondStep {...props} citizen={citizen} updateCitizen={updateCitizen} />
            )}
            path="/second"
          />

          <Route render={() => <Redirect to="/" />} />
         </Switch>
    </BrowserRouter>
  );
}

export default App;
