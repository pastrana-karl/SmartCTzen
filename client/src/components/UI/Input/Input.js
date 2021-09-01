import React from 'react';

import classes from './Input.module.css';

const Input = ( props ) => (
    <input
        type={props.type}
        placeholder={props.placeholder}
        className={classes.Input}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
    />
);

export default Input;