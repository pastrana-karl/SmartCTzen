import React from 'react';
import { Field } from 'formik';

import classes from './FormikInput.module.css';

const FormikInput = ( props ) => (
    <Field
        type={props.type}
        id={props.id}
        name={props.name} 
        className={classes.FormikInput}
        component={props.component}
    />
);

export default FormikInput;