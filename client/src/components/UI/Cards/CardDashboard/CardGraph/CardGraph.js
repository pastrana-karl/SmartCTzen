import React from 'react';

import classes from './CardGraph.module.css';

const CardGraph = (props) => (
    <div className={classes.CardGraph}>{props.children}</div>
);

export default CardGraph;