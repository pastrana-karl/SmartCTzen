import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Features from './components/Landing/Features/Features';
import Home from './components/Landing/Home/Home';
import Login from './components/Landing/Login/Login';
import Layout from './components/Layout/Layout';
import classes from './components/Layout/Layout.module.css';

function App() {
  return (
      <div className={classes.Background}>
        <Layout>
            <Route path="/" exact component={Home} />
            <Route path="/smartctzens-features" component={Features} />
            <Route path="/smartctzens-login" component={Login} />
        </Layout>
      </div>
  );
}

export default App;
