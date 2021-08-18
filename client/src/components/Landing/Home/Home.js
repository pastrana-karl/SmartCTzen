import React from 'react';
import classes from './Home.module.css';
import layoutStyle from '../../Layout/Layout.module.css';

const Home = () => (
    <div className={layoutStyle.Background}>
        <h1 className={classes.Header}>Home</h1>
    </div>
);

export default Home;