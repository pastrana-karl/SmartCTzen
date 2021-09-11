import React from 'react';

import classes from './CardForm.module.css';

const CardForm = ( props ) => (
    <form 
        className={classes.CardForm}
        onSubmit={props.onSubmit}>{props.children}</form>
);

export default CardForm;