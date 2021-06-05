import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  authOperations,
} from '../../redux';

import s from './LoginPage.module.scss';

function LoginPage() {
  const [inputFields, setInputFields] = useState({email: '', password: ''});

  const dispatch = useDispatch();

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setInputFields(state => ({...state, [name]: value}))
  }

  //----------onSubmit----------

  const onSubmit = useCallback(e => {
    e.preventDefault();
        
    const credentials = {
      email: inputFields.email,
      password: inputFields.password,
    }
    
    // console.log(credentials);
    dispatch(authOperations.register(credentials))
  }, [inputFields, dispatch]);

  return (
    <div className={s.container}>
      <h1>Questify</h1>
      <p>Questify will turn your life into
      a thrilling game full of amazing
      quests and exciting challenges.
      </p>
      <p>Choose your name to sign up or log in</p>
      <form type="submit" onSubmit={onSubmit}>
        <input className={s.input} type="email" value={inputFields.email} name="email" onChange={onInputChange} autoFocus placeholder="Email" />
        <input className={s.input} type="password" value={inputFields.password} name="password" onChange={onInputChange} placeholder="Password" />
        <button className={s.button} type="submit">go!</button>
      </form>
    </div>
  )
}

export default LoginPage;