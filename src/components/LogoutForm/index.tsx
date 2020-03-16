import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './LogoutForm.scss';
import { useStateWithLocalStorage, doLogin } from '../../hooks';

interface FormData {
  user: string;
  password: string;
}

const LogoutForm: React.FunctionComponent = () => {
  const [apiSession, setApiSession] = useStateWithLocalStorage('apiSession');
  const { register, handleSubmit, errors } = useForm<FormData>();
  const [responseError, setResponseError] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = (formData: FormData, e: Event): void => {
    setResponseError(false);
    const sessionData = JSON.parse(apiSession);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': sessionData.csrf_token,
      },
      // withCredentials: true,
    };
    const url = `${process.env.GATSBY_API_URL}/user/logout?_format=json&token=${sessionData.logout_token}`;
    const json = doLogin(url, requestOptions);
    console.log(json);
    // const data = useFetch(url, requestOptions);
    // console.log(data);
    // fetch(url, requestOptions)
    //   .then((response) => {
    //     setLoading(true);
    //     return response.json();
    //   })
    //   .catch((error) => console.error('Error:', error))
    //   .then((data) => {
    //     const string = JSON.stringify(data);
    //     if (!data.current_user) {
    //       if (data.message) {
    //         e.target.reset();
    //         setResponseError(data.message);
    //         setLoading(false);
    //       }
    //       console.log(`error${string}`);
    //     } else {
    //       setLoading(false);
    //       setApiSession(string);
    //       location.reload();
    //     }
    //     setLoading(false);
    //   });
  };
  return (
    <>
      {/* Display Response Errors */}
      {responseError.length ? <h3>{responseError}</h3> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="submit" id="submit" name="submit" value="Logout" />
        {errors.submit && <p>{errors.submit.message}</p>}
      </form>
    </>
  );
};

export default LogoutForm;
