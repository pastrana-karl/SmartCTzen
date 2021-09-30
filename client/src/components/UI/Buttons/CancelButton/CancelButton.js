import React from 'react';

import classes from './CancelButton.module.css';

const CancelButton = ( props ) => (
    <button className={classes.CancelButton} type="reset" disabled={props.disabled}>Cancel</button>
);

export default CancelButton; 