import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/Auth/AuthContext';
import './Login.css';

function LoginPage() {
  const { Login, failedLogin } = useContext(AuthContext);
  const history = useHistory();
  const { register, handleSubmit, watch, errors  } = useForm();

  let userlogged = failedLogin;

  const onSubmit = (data) => {
    if(Login(data) === true){
      history.push('/');
    }
  };

  return (
    <section className="login">
      <h1>Welcome back!</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="form-group">
          <label htmlFor="username">
            <strong>username </strong>
            <input name="username" ref={register} />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <strong>password </strong>
            <input name="password" ref={register({ required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
          </label>
        </div>
        {failedLogin ? <p>Psssssst.... username: wizeline pass: Rocks!</p> : ''}
        <button type="submit">login</button>
      </form>
     
    </section>
  );
}
export default LoginPage;

