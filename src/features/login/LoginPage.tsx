import { selectAuthError, selectAuthIsLogged, useAuth } from '@/services/auth';
import { ServerError } from '@/shared';
import { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLogin } from './hooks/useLogin';

export const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuth((state) => state.login);
  const isLogged = useAuth(selectAuthIsLogged);
  const error = useAuth(selectAuthError);

  const { formData, isValid, changeHandler } = useLogin();

  function doLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);
    login(formData.username, formData.password);
  }

  useEffect(() => {
    isLogged && navigate('/cms');
  }, [isLogged]);

  return (
    <div className="page-sm">
      <h1 className="title">LOGIN</h1>
      {error && <ServerError />}
      <form className="flex flex-col gap-3" onSubmit={doLogin}>
        <input
          name="username"
          type="text"
          placeholder="username"
          value={formData.username}
          onChange={changeHandler}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={formData.password}
          onChange={changeHandler}
        />
        <button disabled={!isValid} className="btn primary" type="submit">
          SIGN IN
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
