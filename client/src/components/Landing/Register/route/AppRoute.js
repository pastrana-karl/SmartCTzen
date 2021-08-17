import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import FirstStep from '../FirstStep';
import SecondStep from '../SecondStep';
import Progress from '../Progress';

const AppRoute = () => {
    
  const [user, setUser] = useState({});

  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };

  const resetUser = () => {
    setUser({});
  };

  return (
    <BrowserRouter>
      <div className="container">
        <Progress />
        <Switch>
          <Route
            render={(props) => (
              <FirstStep {...props} user={user} updateUser={updateUser} />
            )}
            path="/first"
            exact={true}
          />
          <Route
            render={(props) => (
              <SecondStep {...props} user={user} updateUser={updateUser} />
            )}
            path="/second"
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRoute;
