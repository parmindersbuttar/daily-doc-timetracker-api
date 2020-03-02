import React from 'react';
import { useFormik } from 'formik';
import Button from '../../../components/button';
import FormGroup from '../../../components/form/formGroup';
import Input from '../../../components/form/input'
import ErrorText from "../../../components/form/error";

const validate = values => {
  const errors = {};

  if (!values.password) {
    errors.password = 'password is required';
  } else if (values.password.length < 4) {
    errors.password = 'Password must be 4 characters';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm password address is required';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Password and confirm password must be same';
  }

  return errors;
};

const RecoverForm = props => {
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate,
    onSubmit: values => {
      props.onSubmit(values.password)
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      {props.error &&
        <ErrorText>{props.error}</ErrorText>
      }
      <FormGroup>
        <Input
          name='password'
          id='password'
          autoComplete='password'
          placeholder={'New Password'}
          onChange={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          error={!!formik.errors.password}
          value={formik.values.password}
        />
        {formik.errors.password &&
          <ErrorText>{formik.errors.password}</ErrorText>
        }
      </FormGroup>

      <FormGroup>
        <Input
          name='confirmPassword'
          id='confirmPasswordvv'
          autoComplete='confirmPassword'
          placeholder={'Confirm pasword'}
          onChange={formik.handleChange('confirmPassword')}
          onBlur={formik.handleBlur('confirmPassword')}
          error={!!formik.errors.confirmPassword}
          value={formik.values.confirmPassword}
        />
        {formik.errors.confirmPassword &&
          <ErrorText>{formik.errors.confirmPassword}</ErrorText>
        }
      </FormGroup>

      <Button primary large type="submit">update</Button>
        
    </form>
  )
};

export default RecoverForm;
