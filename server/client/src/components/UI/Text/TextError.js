import React from 'react';

import classes from './TextError.module.css';

const TextError = (props) => (
    <div className={classes.TextError}>
        {props.children}
    </div>
);

export default TextError;