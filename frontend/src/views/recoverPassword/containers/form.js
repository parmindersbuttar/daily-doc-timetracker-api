import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import Button from '../../../components/button';
import FormGroup from '../../../components/form/formGroup';
import Input from '../../../components/form/input'
import ErrorText from "../../../components/form/error";

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const ForgotPasswordForm = props => {
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validate,
    onSubmit: values => {
      props.onSubmit(values)
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      {props.error &&
        <ErrorText>{props.error}</ErrorText>
      }
        <FormGroup>
          <Input
            name='email'
            id='email'
            autoComplete='email'
            placeholder={'Enter Email Address'}
            onChange={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            error={!!formik.errors.email}
            value={formik.values.email}
        />
          {formik.errors.email &&
            <ErrorText>{formik.errors.email}</ErrorText>
        }
      </FormGroup>
     
        <Link to="/sign-in" style={{
          display: 'inline-block',
          margin: '10px 0',
          textDecoration: 'underline'
        }}>Back to Login</Link>
      <Button primary large type="submit">send</Button>
        
    </form>
  )
};

export default ForgotPasswordForm;
