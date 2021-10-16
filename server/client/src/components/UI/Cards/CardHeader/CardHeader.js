import React from 'react';

import classes from './CardHeader.module.css';

const CardHeader = ( props ) => (
    <div className={classes.CardHeader}>{props.children}</div>
);

export default CardHeader;