import React, { useState } from 'react';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import Features from './components/Landing/Features/Features';
import Home from './components/Landing/Home/Home';
import Login from './components/Landing/Login/Login';
import AdminProfile from './components/AllAdmin/Administrator/AdminProfile/AdminProfile';
import AllAdminsLogin from './components/AllAdmin/AllAdminLogin';
import Register from './components/Landing/Register/Register';
import SecondStep from './components/Landing/Register/SecondStep';
import ThirdStep from './components/Landing/Register/ThirdStep';
import FourthStep from './components/Landing/Register/FourthStep';
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
              <Register {...props} citizen={citizen} updateCitizen={updateCitizen} />
            )}
            path="/Register"
             exact={true}
          />

          <Route
            render={(props) => (
              <SecondStep {...props} citizen={citizen} updateCitizen={updateCitizen} />
            )}
            path="/second"
          />

          <Route
            render={(props) => (
              <ThirdStep {...props} citizen={citizen} updateCitizen={updateCitizen} />
            )}
            path="/third"
          />

          <Route
            render={(props) => (
              <ThirdStep {...props} citizen={citizen} updateCitizen={updateCitizen} />
            )}
            path="/fourth"
          />

          {/* SUPER ADMIN and ADMIN Login */}
          <Route path="/admin-login">
            <AllAdminsLogin />
          </Route>

          {/* ADMIN Routes */}
          <Route path="/admin-profile">
            <AdminProfile />
          </Route>

          <Route render={() => <Redirect to="/" />} />
         </Switch>
    </BrowserRouter>
  );
}

export default App;
