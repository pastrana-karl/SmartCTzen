import React from 'react';

import classes from './Tables.module.css';

const Tables = ( props ) => (
    <div className={classes.TableDiv}>
        <table>{props.children}</table>
    </div>
);

export default Tables;