import React from 'react';

import classes from './SubmitButton.module.css';

const SubmitButton = ( props ) => (
    <button className={classes.SubmitButton} type="submit" onClick={props.onClick}>Submit</button>
);

export default SubmitButton;