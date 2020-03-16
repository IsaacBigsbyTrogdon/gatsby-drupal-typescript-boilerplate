import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import fetch from 'node-fetch';
import './LoginForm.scss';
import { useStateWithLocalStorage } from '../../hooks';

interface FormData {
  user: string;
  password: string;
}

interface RequestOptions {
  method: string;
  headers: Record<string, string>;
  body: string;
}

// interface ResponseData {
//   current_user: {
//     [key: string]: CurrentUser;
//   };
//   csrf_token: string;
//   logout_token: string;
// }

// interface CurrentUser {
//   uid: string;
//   roles: Array<string>;
//   name: string;
// }

const LoginForm: React.FunctionComponent = () => {
  const [, setApiSession] = useStateWithLocalStorage('apiSession');
  const {
    register, handleSubmit, errors, reset,
  } = useForm<FormData>();
  const [responseError, setResponseError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const onSubmit = (formData: FormData): void => {
    setLoading(true);
    if (responseError) setResponseError(false);
    const doLogin = async (url: string, options: RequestOptions): Promise<void> => {
      try {
        const resp = await fetch(url, options).then((response) => {
          setLoading(true);
          return response;
        });
        const data = await resp.json();
        if (!data.current_user) {
          if (data.message) {
            // Wrong credentials, etc.
            reset();
            setResponseError(true);
            setMessage(data.message);
            setLoading(false);
          } else {
            setResponseError(true);
            setMessage('Login response not recognized.');
          }
        } else if (!resp.ok) {
          // Response error.
          setResponseError(true);
          console.log(resp);
          throw Error(resp.statusText);
        } else {
          // Success
          setLoading(false);
          setResponseError(false);
          const string = JSON.stringify(data);
          setApiSession<string>(string); // eslint-disable-line
          // location.reload();
          setMessage(`Success!${string}`);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setResponseError(true);
        setMessage(`Error caught: ${error}`);
      }
    };
    doLogin(`${process.env.GATSBY_API_URL}/user/login?_format=json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  };
  return (
    <>
      {message ? <h3>{message}</h3> : ''}
      {loading ? <h4>Loading...</h4> : ''}
      {/* Display Response Errors */}
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
    </>
  );
};

export default LoginForm;
