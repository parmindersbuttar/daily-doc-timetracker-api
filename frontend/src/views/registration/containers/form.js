import React from 'react';
import { useFormik } from 'formik';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import Button from '../../../components/button';
import FormGroup from '../../../components/form/formGroup';
import Input from '../../../components/form/input';
import Select from '../../../components/form/Select';
import ErrorText from "../../../components/form/error";
import CardSection from '../components/CardSection';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.name) {
    errors.name = 'Name is required';
  } else if (values.name.length < 4) {
    errors.name = 'Name must be 4 characters';
  }

  if (!values.planId) {
    errors.planId = 'Select a plan';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 4) {
    errors.password = 'password must be 4 characters or more';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Password and confirm password must be same';
  }

  if (!values.addressLine1) {
    errors.addressLine1 = 'Address is required.';
  }

  if (!values.postalCode) {
    errors.postalCode = 'Postal code is required.';
  }

  if (!values.state) {
    errors.state = 'State is required.';
  }

  if (!values.country) {
    errors.country = 'Country is required.';
  }

  return errors;
};

const LoginForm = props => {
  const stripe = useStripe();
  const elements = useElements();
  const { onSubmit, selectedPlan, error, plans } = props;

  function stripeTokenHandler(values, {source}) {
    const card = {
      brand: source.card.brand,
      exp_month: source.card.exp_month,
      exp_year: source.card.exp_year,
      last4: source.card.last4,
      name: values.name,
      type: 'card',
      id: source.id
    }
   onSubmit(values, card)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      addressLine1: '',
      postalCode: '',
      state: '',
      country: '',
      planId: selectedPlan || '',

    },
    validate,
    onSubmit: async (values) => {

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createSource(card);

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      stripeTokenHandler(values, result);
    }
     
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      {props.error &&
        <ErrorText>{error}</ErrorText>
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
            name='name'
            id='name'
            autoComplete='name'
            placeholder={'Name'}
            onChange={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            error={!!formik.errors.name}
            value={formik.values.name}
        />
          {formik.errors.name &&
            <ErrorText>{formik.errors.name}</ErrorText>
          }
      </FormGroup>
      {plans &&
        <FormGroup>
          <Select
            name='planId'
            id='planId'
            autoComplete='planId'
            placeholder={'Select a plan'}
            onChange={formik.handleChange('planId')}
            onBlur={formik.handleBlur('planId')}
            error={!!formik.errors.planId}
            value={formik.values.planId}
        >
          <option value=''>Select a plan</option>
          {plans.map(plan => {
            return (
              <option key={plan.id} value={plan.id}>{`${plan.name} ${plan.description}`}</option>
            );    
          })}
          </Select>
          {formik.errors.planId &&
            <ErrorText>{formik.errors.planId}</ErrorText>
          }
        </FormGroup>
      }
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
        {formik.errors.password &&
          <ErrorText>{formik.errors.password}</ErrorText>
        }
      </FormGroup>
      <FormGroup>
        <Input
          id='confirmPassword'
          name='confirmPassword'
          autoComplete='confirm-password'
          type='password'
          placeholder='Confirm Password'
          onChange={formik.handleChange('confirmPassword')}
          onBlur={formik.handleBlur('confirmPassword')}
          error={formik.errors.confirmPassword}
          value={formik.values.confirmPassword}
        />
        {formik.errors.confirmPassword &&
          <ErrorText>{formik.errors.confirmPassword}</ErrorText>
        }
      </FormGroup>

      <FormGroup>
        <Input
          id='addressLine1'
          name='addressLine1'
          autoComplete='address-line1'
          type='text'
          placeholder='Enter your address'
          onChange={formik.handleChange('addressLine1')}
          onBlur={formik.handleBlur('addressLine1')}
          error={formik.errors.addressLine1}
          value={formik.values.addressLine1}
        />
        {formik.errors.addressLine1 &&
          <ErrorText>{formik.errors.addressLine1}</ErrorText>
        }
      </FormGroup>

      <FormGroup>
        <Input
          id='postalCode'
          name='postalCode'
          autoComplete='postal-code'
          type='text'
          placeholder='postal code'
          onChange={formik.handleChange('postalCode')}
          onBlur={formik.handleBlur('postalCode')}
          error={formik.errors.postalCode}
          value={formik.values.postalCode}
        />
        {formik.errors.postalCode &&
          <ErrorText>{formik.errors.postalCode}</ErrorText>
        }
      </FormGroup>
      <FormGroup>
        <Input
          id='state'
          name='state'
          autoComplete='state'
          type='text'
          placeholder='your state'
          onChange={formik.handleChange('state')}
          onBlur={formik.handleBlur('state')}
          error={formik.errors.state}
          value={formik.values.state}
        />
        {formik.errors.state &&
          <ErrorText>{formik.errors.state}</ErrorText>
        }
      </FormGroup>
      <FormGroup>
        <Input
          id='country'
          name='country'
          autoComplete='country'
          type='text'
          placeholder='your country'
          onChange={formik.handleChange('country')}
          onBlur={formik.handleBlur('country')}
          error={formik.errors.country}
          value={formik.values.country}
        />
        {formik.errors.country &&
          <ErrorText>{formik.errors.country}</ErrorText>
        }
      </FormGroup>

    <CardSection />

      <Button disabled={!stripe} primary large type="submit">Register</Button>
        
    </form>
  )
};

export default LoginForm;
