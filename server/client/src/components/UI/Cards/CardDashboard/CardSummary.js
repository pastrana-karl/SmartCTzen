import React from 'react';

import classes from './CardSummary.module.css';

const CardSummary = (props) => (
    <React.Fragment>
        <div className={classes.CardSummary}>
            {props.children}
        </div>
    </React.Fragment>
);

export default CardSummary;