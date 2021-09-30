import React, { useState, useContext } from 'react';
import { Context } from './context/Context';
import { Redirect, Route, Switch } from 'react-router-dom';

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

import AdminForgot from './components/AllAdmin/Administrator/AdminForgot/AdminForgot';
import AdminEmail from './components/AllAdmin/Administrator/AdminEmail/AdminEmail';
import AdminProfile from './components/AllAdmin/Administrator/AdminProfile/AdminProfile';
import AdminLogin from './components/AllAdmin/Administrator/AdminLogin/AdminLogin';
import AdminProposals from './components/AllAdmin/Administrator/AdminProposals/AdminProposals';
import AdminReports from './components/AllAdmin/Administrator/AdminReports/AdminReports';
import AdminMessages from './components/AllAdmin/Administrator/AdminMessages/AdminMessages';
import AdminProjects from './components/AllAdmin/Administrator/AdminProjects/AdminProjects';
import AdminUsers from './components/AllAdmin/Administrator/AdminUsers/AdminUsers';
import Applicants from './components/AllAdmin/Administrator/Applicants/Applicants';
import SingleApplicants from './components/AllAdmin/Administrator/SingleApplicants/SingleApplicants';
import AdminLogout from './components/AllAdmin/Administrator/AdminLogout/AdminLogout';
import AdminCreateProposals from './components/AllAdmin/Administrator/AdminCreateProposals/AdminCreateProposals';
import AdminCreateProjects from './components/AllAdmin/Administrator/AdminCreateProjects/AdminCreateProjects';

import CitizenPassUpdate from './pages/Citizen/CitizenProfile/CitizenPassUpdate/CitizenPassUpdate';
import CitizenCreateProposal from './pages/Citizen/CitizenProposals/CreateProposals/CitizenCreateProposals';
import CitizenViewReport from './pages/Citizen/CitizenReports/ViewReports/CitizenViewReport';
import CitizenSubmitReport from './pages/Citizen/CitizenReports/SubmitReport/CitizenSubmitReport';
import CitizenChatReport from './pages/Citizen/CitizenReports/ChatReports/CitizenChatReport';
import CitizenViewProject from './pages/Citizen/CitizenProjects/CitizenViewProject/CitizenViewProject';
import CitizenLogout from './pages/Citizen/CitizenLogout/CitizenLogout';
import ProposalNav from './components/Citizen/ProposalNav/ProposalNav';
import ReportsNav from './components/Citizen/ReportsNav/ReportsNav';

import SANavBar from './components/SuperAdmin/SaSideBar';
import SALogin from './pages/SuperAdmin/SALogin/SALogin';
import SAForgot from './pages/SuperAdmin/SAForgot/SAForgot';
import SAEmail from './pages/SuperAdmin/SAEmail/SAEmail';
import SAContentHome from './pages/SuperAdmin/SAContentHome/SAContentHome';
import SAAnnouncements from './pages/SuperAdmin/SAAnnouncements/SAAnnouncements';
import SAFeaturedMember from './pages/SuperAdmin/SAFeaturedMember/SAFeaturedMember';
import SAEula from './pages/SuperAdmin/SAEula/SAEula';
import SAAddFeaturedMember from './pages/SuperAdmin/SAAddFeaturedMember/SAAddFeaturedMember';
import SAContentFeature from './pages/SuperAdmin/SAContentFeature/SAContentFeature';
import SAAddFeature from './pages/SuperAdmin/SAAddFeature/SAAddFeature';
import SAFeatures from './pages/SuperAdmin/SAFeatures/SAFeatures';
import SAManage from './pages/SuperAdmin/SAManage/SAManage';
import SASearchAdmin from './pages/SuperAdmin/SASearchAdmin/SASearchAdmin';
import SAAddAdmin from './pages/SuperAdmin/SAAddAdmin/SAAddAdmin';
import SAAccount from './pages/SuperAdmin/SAAccount/SAAccount';
import AdminReportsDashboard from './components/AllAdmin/Administrator/AdminReportsDashboard/AdminReportsDashboard';
import AdminProposalsDashboard from './components/AllAdmin/Administrator/AdminProposalsDashboard/AdminProposalsDashboard';
import AdminEachProposal from './components/AllAdmin/Administrator/AdminEachProposal/AdminEachProposal';
import AdminEachProject from './components/AllAdmin/Administrator/AdminEachProject/AdminEachProject';
import AdminEachReport from './components/AllAdmin/Administrator/AdminEachReport/AdminEachReport';
import AdminUpdateProject from './components/AllAdmin/Administrator/AdminUpdateProject/AdminUpdateProject';

const App = () => {

  //Register data passing...
  const [citizen, setCitizen] = useState({});

  const updateCitizen = (data) => {
    setCitizen((prevCitizen) => ({ ...prevCitizen, ...data }));
  };

  const resetCitizen = () => {
    setCitizen({});
  };

  //Citizen User...
  const { user } = useContext(Context);

  // console.log(user);

  //Super Administrator User...
  const { saUser } = useContext(Context);

  //Administrator User...
  const { aUser } = useContext(Context);

  return (
    <>
      <LandingNavBar />
      <Progress />

      <CitizenNavBar />
      {/* <ProposalNav /> */}
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
            {user ? <Redirect to="/citizen-profile" /> : <CitizenForgot />}
          </Route>

          <Route path="/change-password/:token">
            {user ? <Redirect to="/citizen-profile" /> : <CitizenEmail />}
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

          <Route path="/citizen-pass-update">
            {user ? <CitizenPassUpdate /> : <Redirect to="/" />}
          </Route>

          <Route path="/citizen-proposals">
            {user ? <CitizenProposals /> : <Redirect to="/" />}
          </Route>

          <Route path="/citizen-create-proposals">
            {user ? <CitizenCreateProposal /> : <Redirect to="/" />}
          </Route>

          <Route path="/citizen-reports">
            {user ? <CitizenReports /> : <Redirect to="/" />}
          </Route> 

          <Route path="/citizen-view-reports">
            {user ? <CitizenViewReport /> : <Redirect to="/" />}
          </Route> 

          <Route path="/citizen-submit-reports">
            {user ? <CitizenSubmitReport /> : <Redirect to="/" />}
          </Route> 

          <Route path="/citizen-chat-report">
            {user ? <CitizenChatReport /> : <Redirect to="/" />}
          </Route> 

          <Route path="/citizen-projects">
            {user ? <CitizenProjects /> : <Redirect to="/" />}
          </Route> 

          <Route path="/citizen-view-project">
            {user ? <CitizenViewProject /> : <Redirect to="/" />}
          </Route> 

          {/**************************** ADMIN Routes ****************************/} 

          <Route path="/admin-login">
            {aUser ? <Redirect to="/admin-profile" /> : <AdminLogin />}
          </Route>

          <Route path="/admin-forgot">
            <AdminForgot />
          </Route>

          <Route path="/admin-change/:token">
            <AdminEmail />
          </Route>

          <Route path="/admin-profile">
            {aUser ? <AdminProfile /> : <Redirect to="/admin-login" />}
          </Route>
          
          <Route path="/admin-proposals">
            {aUser ? <AdminProposals /> : <Redirect to="/admin-login" />}
          </Route>
          
          <Route path="/admin-proposal/:id">
            {aUser ? <AdminEachProposal /> : <Redirect to="/admin-login" />}
          </Route>

          <Route path="/admin-create-proposals">
            {aUser ? <AdminCreateProposals /> : <Redirect to="/admin-login" />}
          </Route>

          <Route path="/admin-reports">
            {aUser ? <AdminReports /> : <Redirect to="/admin-login" />}
          </Route>

          <Route path="/admin-report/:id">
            {aUser ? <AdminEachReport /> : <Redirect to="/admin-login" />}
          </Route>

          <Route path="/admin-summary/reports">
            {aUser ? <AdminReportsDashboard /> : <Redirect to="/admin-login" />}
          </Route>

          <Route path="/admin-messages">
            {aUser ? <AdminMessages /> : <Redirect to="/admin-login" />}
          </Route>

          <Route path="/admin-projects">
            {aUser ? <AdminProjects /> : <Redirect to="/admin-login" />}
          </Route>

          <Route path="/admin-project/:id">
            {aUser ? <AdminEachProject /> : <Redirect to="/admin-login" />}
          </Route>

          <Route path="/admin-summary/proposals">
            {aUser ? <AdminProposalsDashboard /> : <Redirect to="/admin-login" />}
          </Route>

          <Route path="/admin-create-projects">
            {aUser ? <AdminCreateProjects /> : <Redirect to="/admin-login" />}
          </Route>

          <Route path="/admin-update-project/:id">
            {aUser ? <AdminUpdateProject /> : <Redirect to="/admin-login" />}
          </Route>

          <Route path="/admin-users">
            {aUser ? <AdminUsers /> : <Redirect to="/admin-login" />}
          </Route>

          <Route path="/Applicants">
            {aUser ? <Applicants /> : <Redirect to="/admin-login" />}
          </Route>

          <Route path="/Applicants-Verification">
            {aUser ? <SingleApplicants /> : <Redirect to="/admin-login" />}
          </Route>

          {/**************************** SUPER ADMIN Routes ****************************/}
          
          <Route path="/superAdmin-login">
            {saUser ? <Redirect to="/SAContent-home" /> : <SALogin />}
          </Route>

          <Route path="/superAdmin-forgot">
            <SAForgot />
          </Route>

          <Route path="/superAdmin-changePassword/:token">
            <SAEmail />
          </Route>

          <Route path="/SAContent-home">
            {saUser ? <SAContentHome /> : <Redirect to="/superAdmin-login" />}
          </Route>

          <Route path="/SAContent-announcements">
            {saUser ? <SAAnnouncements /> : <Redirect to="/superAdmin-login" />}
          </Route>

          <Route path="/SAContent-FeaturedMember">
            {saUser ? <SAFeaturedMember /> : <Redirect to="/superAdmin-login" />}
          </Route>

          <Route path="/SAContent-Eula">
            {saUser ? <SAEula /> : <Redirect to="/superAdmin-login" />}
          </Route>

          <Route path="/SAContent-addFeaturedMember">
            {saUser ? <SAAddFeaturedMember /> : <Redirect to="/superAdmin-login" />}
          </Route>

          <Route path="/SAContent-feature">
            {saUser ? <SAContentFeature /> : <Redirect to="/superAdmin-login" />}
          </Route>

          <Route path="/SAAdd-feature">
            {saUser ? <SAAddFeature /> : <Redirect to="/superAdmin-login" />}
          </Route>

          <Route path="/SA-feature">
            {saUser ? <SAFeatures /> : <Redirect to="/superAdmin-login" />}
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
    </>
  );
} 

export default App;
