import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import Features from './components/Landing/Features/Features';
import Home from './components/Landing/Home/Home';
import Login from './components/Landing/Login/Login';
import Layout from './components/Layout/Layout';
import classes from './components/Layout/Layout.module.css';
import React, { useState } from 'react';
import FirstStep from './components/Landing/Register/FirstStep';
import SecondStep from './components/Landing/Register/SecondStep';
import Progress from './components/Landing/Register/Progress';

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
      <div className={classes.Background}>
        <Layout>
            <Progress />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/smartctzens-features" component={Features} />
              <Route path="/smartctzens-login" component={Login} />
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
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
