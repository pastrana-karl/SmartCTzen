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
import FifthStep from './components/Landing/Register/FifthStep';
import SixthStep from './components/Landing/Register/SixthStep';
import SeventhStep from './components/Landing/Register/SeventhStep';
import Progress from './components/Landing/Register/Progress';
import NavBarHandle from './components/UI/Navigation/NavBar/NavBarHandle'


import AdminProposals from './components/AllAdmin/Administrator/AdminProposals/AdminProposals';
import AdminReports from './components/AllAdmin/Administrator/AdminReports/AdminReports';
import AdminMessages from './components/AllAdmin/Administrator/AdminMessages/AdminMessages';
import AdminProjects from './components/AllAdmin/Administrator/AdminProjects/AdminProjects';
import AdminUsers from './components/AllAdmin/Administrator/AdminUsers/AdminUsers';
import AdminApplicants from './components/AllAdmin/Administrator/AdminApplicants/AdminApplicants';
import AdminLogout from './components/AllAdmin/Administrator/AdminLogout/AdminLogout';

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

          <Route path="/features">
            <Features />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route
             render={(props) => (
              <Register {...props} citizen={citizen} updateCitizen={updateCitizen} />
            )}
            path="/create-account"
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
              <FourthStep {...props} citizen={citizen} updateCitizen={updateCitizen} />
            )}
            path="/fourth"
          />

          <Route
            render={(props) => (
              <FifthStep {...props} citizen={citizen} updateCitizen={updateCitizen} />
            )}
            path="/fifth"
          />

          <Route
            render={(props) => (
              <SixthStep {...props} citizen={citizen} updateCitizen={updateCitizen} />
            )}
            path="/sixth"
          />

          <Route
            render={(props) => (
              <SeventhStep {...props} citizen={citizen} updateCitizen={updateCitizen} resetCitizen={resetCitizen} />
            )}
            path="/seventh"
          />

          {/* SUPER ADMIN and ADMIN Login */}
          <Route path="/admin-login">
            <AllAdminsLogin />
          </Route>

          {/* ADMIN Routes */}
          <Route path="/admin-profile">
            <AdminProfile />
          </Route>
          
          <Route path="/admin-proposals">
            <AdminProposals />
          </Route>

          <Route path="/admin-reports">
            <AdminReports />
          </Route>

          <Route path="/admin-messages">
            <AdminMessages />
          </Route>

          <Route path="/admin-projects">
            <AdminProjects />
          </Route>

          <Route path="/admin-users">
            <AdminUsers />
          </Route>

          <Route path="/admin-applicants">
            <AdminApplicants />
          </Route>

          <Route path="/admin-logout">
            <AdminLogout />
          </Route>

          <Route render={() => <Redirect to="/" />} />

        </Switch>
    </BrowserRouter>
  );
}

export default App;
