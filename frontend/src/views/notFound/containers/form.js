import React from 'react';
import { useFormik } from 'formik';
import Button from '../../../components/button';
import FormGroup from '../../../components/form/formGroup';
import Input from '../../../components/form/input'
import ErrorText from "../../../components/form/error";

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 4) {
    errors.password = 'Must be 4 characters or more';
  }

  return errors;
};

const LoginForm = props => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
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
            placeholder={'Email Address'}
            onChange={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            error={!!formik.errors.email}
            value={formik.values.email}
        />
          {formik.errors.email &&
            <ErrorText>{formik.errors.email}</ErrorText>
        }
      </FormGroup>
      <FormGroup>
        <Input
          id='password'
          name='password'
          autoComplete='current-password'
          type={'password'}
          placeholder={'Password'}
          onChange={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          error={formik.errors.password}
          value={formik.values.password}
        />
      </FormGroup>

          <Button primary large type="submit">Login</Button>
        
    </form>
  )
};

export default LoginForm;
