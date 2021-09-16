import React, { useState, useContext } from 'react';
import { Context } from './context/Context';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingNavBar from './components/Landing/Navigation/LandingNavBar';
import Home from './pages/Landing/Home/Home';
import CitizenLogin from './pages/Landing/CitizenLogin/CitizenLogin';
import CitizenForgot from './pages/Landing/CitizenForgot/CitizenForgot';
import CitizenEmail from './pages/Landing/CitizenEmail/CitizenEmail';
import Features from './pages/Landing/Feature/Features';
import Progress from './components/Landing/Register/Progress';
import FirstStep from './pages/Landing/Register/FirstStep';
import SecondStep from './pages/Landing/Register/SecondStep';
import ThirdStep from './pages/Landing/Register/ThirdStep';
import FourthStep from './pages/Landing/Register/FourthStep';
import FifthStep from './pages/Landing/Register/FifthStep';
import SixthStep from './pages/Landing/Register/SixthStep';
import SeventhStep from './pages/Landing/Register/SeventhStep';

import CitizenNavBar from './components/Citizen/CitizenNav/CitizenNav';
import CitizenProposalsSideBar from './components/Citizen/CitizenCatNav/CitizenSideBar';
import CitizenProfile from './pages/Citizen/CitizenProfile/CitizenProfile';
import CitizenProposals from './pages/Citizen/CitizenProposals/CitizenProposals';
import CitizenReports from './pages/Citizen/CitizenReports/CitizenReports';
import CitizenProjects from './pages/Citizen/CitizenProjects/CitizenProjects';

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

import SANavBar from './components/SuperAdmin/SaSideBar';
import SALogin from './pages/SuperAdmin/SALogin/SALogin';
import SAForgot from './pages/SuperAdmin/SAForgot/SAForgot';
import SAEmail from './pages/SuperAdmin/SAEmail/SAEmail';
import SAContentHome from './pages/SuperAdmin/SAContentHome/SAContentHome';
import SAContentFeature from './pages/SuperAdmin/SAContentFeature/SAContentFeature';
import SAAddFeature from './pages/SuperAdmin/SAAddFeature/SAAddFeature';
import SAManage from './pages/SuperAdmin/SAManage/SAManage';
import SASearchAdmin from './pages/SuperAdmin/SASearchAdmin/SASearchAdmin';
import SAAddAdmin from './pages/SuperAdmin/SAAddAdmin/SAAddAdmin';
import SAAccount from './pages/SuperAdmin/SAAccount/SAAccount';

const App = () => {
  const [citizen, setCitizen] = useState({});

  const updateCitizen = (data) => {
    setCitizen((prevCitizen) => ({ ...prevCitizen, ...data }));
  };

  const resetCitizen = () => {
    setCitizen({});
  };

  const { user } = useContext(Context);
  const { saUser } = useContext(Context);

  return (
    <BrowserRouter>
      <LandingNavBar />
      <Progress />

      <CitizenNavBar />
      <CitizenProposalsSideBar />

      <SANavBar />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/features">
            <Features />
          </Route>

          <Route path="/login">
            {user ? <Redirect to="/citizen-profile" /> : <CitizenLogin />}
          </Route>

          <Route path="/forgot-password">
            <CitizenForgot />
          </Route>

          <Route path="/change-password">
            <CitizenEmail />
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
            {user ? <CitizenProfile /> : <Redirect to="/" />}
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
          
          <Route path="/superAdmin-login">
            {saUser ? <Redirect to="/SAContent-home" /> : <SALogin />}
          </Route>

          <Route path="/superAdmin-forgot">
            <SAForgot />
          </Route>

          <Route path="/superAdmin-changePassword">
            <SAEmail />
          </Route>

          <Route path="/SAContent-home">
            {saUser ? <SAContentHome /> : <Redirect to="/superAdmin-login" />}
          </Route>

          <Route path="/SAContent-feature">
            {saUser ? <SAContentFeature /> : <Redirect to="/superAdmin-login" />}
          </Route>

          <Route path="/SAAdd-feature">
            {saUser ? <SAAddFeature /> : <Redirect to="/superAdmin-login" />}
          </Route>

          <Route path="/SAManage-admin">
            {saUser ? <SAManage /> : <Redirect to="/superAdmin-login" />}
          </Route>

          <Route path="/SASearch-admin">
            {saUser ? <SASearchAdmin /> : <Redirect to="/superAdmin-login" />}
          </Route>

          <Route path="/SAAdd-admin">
            {saUser ? <SAAddAdmin /> : <Redirect to="/superAdmin-login" />}
          </Route>

          <Route path="/SA-account">
            {saUser ? <SAAccount /> : <Redirect to="/superAdmin-login" />}
          </Route>

          <Route render={() => <Redirect to="/" />} />

        </Switch>
    </BrowserRouter>
  );
} 

export default App;
