import React from 'react';

import classes from './ProfileInput.module.css';

const ProfileInput = ( props ) => (
    <input
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        name={props.name}
        value={props.value}
        className={classes.ProfileInput}
        onChange={props.onChange}
        readOnly={props.readOnly}
    />
);

export default ProfileInput;