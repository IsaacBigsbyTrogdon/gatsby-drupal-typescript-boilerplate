import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './LoginForm.scss';
import * as g from '../../global';

interface FormData {
  user: string;
  password: string;
}

const LoginForm: React.FunctionComponent = () => {
  const {
    register, handleSubmit, watch, errors, reset, setError,
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const [apiSession, setApiSession] = g.useStateWithLocalStorage('apiSession');

  const [session, setSession] = useState(null);

  const [status, setStatus] = useState(null);

  const [responseError, setResponseError] = useState(0);

  const onSubmit = (formData: FormData): void => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    const url = `${process.env.GATSBY_API_URL}/user/login?_format=json`;
    const fetchData = async () => {
      const response = await fetch(url, requestOptions);
      response
        .json()
        .then((result) => {
          if (typeof result.current_user === 'undefined') {
            if (typeof result.message !== 'undefined') {
              setResponseError(result.message);
            }
          } else {
            setApiSession(result);
          }
        });
    };
    fetchData();
  };

  return (
    <>
      {console.log(apiSession)}
      {responseError.length ? <h3>{responseError}</h3> : null}
      {typeof apiSession.current_user !== 'undefined' ? (
        <h4>
          User id:
          {' '}
          {apiSession.current_user.name}
        </h4>
      )
        : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">
              User name
              <input
                name="name"
                id="name"
                placeholder="yourName"
                type="text"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby="error-name-required"
                ref={register({ required: 'This field is required' })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </label>
            <label htmlFor="pass">
              First Name
              <input
                name="pass"
                placeholder="enter your password"
                type="password"
                aria-invalid={errors.pass ? 'true' : 'false'}
                aria-describedby="error-pass-required"
                ref={register({ required: 'This field is required' })}
              />
              {errors.pass && <p>{errors.pass.message}</p>}
            </label>
            <input type="submit" />
          </form>
        )}
    </>
  );
};

export default LoginForm;
