import React, { useState } from 'react';
import './App.css';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingNavBar from './components/Landing/Navigation/LandingNavBar';
import Home from './pages/Landing/Home/Home';
import CitizenLogin from './pages/Landing/CitizenLogin/CitizenLogin';
import CitizenForgot from './pages/Landing/CitizenForgot/CitizenForgot';
import Features from './pages/Landing/Feature/Features';
import Progress from './components/Landing/Register/Progress';
import FirstStep from './pages/Landing/Register/FirstStep';
import SecondStep from './pages/Landing/Register/SecondStep';
import ThirdStep from './pages/Landing/Register/ThirdStep';
import FourthStep from './pages/Landing/Register/FourthStep';
import FifthStep from './pages/Landing/Register/FifthStep';
import SixthStep from './pages/Landing/Register/SixthStep';
import SeventhStep from './pages/Landing/Register/SeventhStep';

import AdminProfile from './components/AllAdmin/Administrator/AdminProfile/AdminProfile';
import AdminLogin from './components/AllAdmin/Administrator/AdminLogin/AdminLogin';
import AdminProposals from './components/AllAdmin/Administrator/AdminProposals/AdminProposals';
import AdminReports from './components/AllAdmin/Administrator/AdminReports/AdminReports';
import AdminMessages from './components/AllAdmin/Administrator/AdminMessages/AdminMessages';
import AdminProjects from './components/AllAdmin/Administrator/AdminProjects/AdminProjects';
import AdminUsers from './components/AllAdmin/Administrator/AdminUsers/AdminUsers';
import AdminApplicants from './components/AllAdmin/Administrator/AdminApplicants/AdminApplicants';
import AdminLogout from './components/AllAdmin/Administrator/AdminLogout/AdminLogout';
import AdminCreateProposals from './components/AllAdmin/Administrator/AdminCreateProposals/AdminCreateProposals';
import AdminCreateProjects from './components/AllAdmin/Administrator/AdminCreateProjects/AdminCreateProjects';

import CitizenNavBar from './components/Citizen/CitizenNav/CitizenNav';
import CitizenProposalsSideBar from './components/Citizen/CitizenCatNav/CitizenSideBar';
import CitizenProfile from './pages/Citizen/CitizenProfile/CitizenProfile';
import CitizenProposals from './pages/Citizen/CitizenProposals/CitizenProposals';
import CitizenReports from './pages/Citizen/CitizenReports/CitizenReports';
import CitizenProjects from './pages/Citizen/CitizenProjects/CitizenProjects';
import CitizenLogout from './pages/Citizen/CitizenLogout/CitizenLogout';

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
      <LandingNavBar />
      <Progress />
      <CitizenNavBar />
      <CitizenProposalsSideBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/features">
            <Features />
          </Route>

          <Route path="/login">
            <CitizenLogin />
          </Route>

          <Route path="/forgot-password">
            <CitizenForgot />
          </Route>

          <Route
             render={(props) => (
              <FirstStep {...props} citizen={citizen} updateCitizen={updateCitizen} resetCitizen={resetCitizen}/>
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

          {/**************************** CITIZEN Routes ****************************/}

          <Route path="/citizen-profile">
            <CitizenProfile />
          </Route>

          <Route path="/citizen-proposals">
            <CitizenProposals/>
          </Route>

          <Route path="/citizen-reports">
            <CitizenReports/>
          </Route> 

          <Route path="/citizen-projects">
            <CitizenProjects/>
          </Route> 

          <Route path="/citizen-logout">
            <CitizenLogout/>
          </Route>  

          {/**************************** ADMIN Routes ****************************/}

          <Route path="/admin-login">
            <AdminLogin />
          </Route>

          <Route path="/admin-profile">
            <AdminProfile />
          </Route>
          
          <Route path="/admin-proposals">
            <AdminProposals />
          </Route>

          <Route path="/admin-create-proposals">
            <AdminCreateProposals />
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

          <Route path="/admin-create-projects">
            <AdminCreateProjects />
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

          {/**************************** SUPER ADMIN Routes ****************************/}
          

          <Route render={() => <Redirect to="/" />} />

        </Switch>
    </BrowserRouter>
  );
} 

export default App;
