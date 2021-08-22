import React from 'react';

import classes from './ProfileInput.module.css';

const ProfileInput = ( props ) => (
    <input
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        value={props.value}
        className={classes.ProfileInput}
        onChange={props.onChange}
    />
);

export default ProfileInput;