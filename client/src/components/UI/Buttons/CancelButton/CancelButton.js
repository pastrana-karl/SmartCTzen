import React from 'react';

import classes from './CancelButton.module.css';

const CancelButton = ( props ) => (
    <button className={classes.CancelButton} type="reset">Cancel</button>
);

export default CancelButton; 