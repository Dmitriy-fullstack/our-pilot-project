import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  authOperations,
} from '../../redux';

import AuthModal from '../../components/AuthModal'

import s from './LoginPage.module.scss';

import bgMobile from '../../images/bg-mobile.png';
import bgTablet from '../../images/bg-tablet.png';
import bgDesctop from '../../images/bg-desctop.png'

function LoginPage() {
  const [inputFields, setInputFields] = useState({email: '', password: ''});
  const [modalRegisterActive, setModalRegisterActive] = useState(false);
  const [modalLoginActive, setModalLoginActive] = useState(false);

  const dispatch = useDispatch();

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setInputFields(state => ({...state, [name]: value}))
  }

  //----------onSubmit----------

  const onSubmitRegister = useCallback(e => {
    e.preventDefault();

    const credentials = {
      email: inputFields.email,
      password: inputFields.password,
    }

    dispatch(authOperations.register(credentials))
  }, [inputFields, dispatch]);

  const onSubmitLogin = useCallback(e => {
    e.preventDefault();

    const credentials = {
      email: inputFields.email,
      password: inputFields.password,
    }

    dispatch(authOperations.login(credentials))
  }, [inputFields, dispatch]);

  return (

    <div>
      <div className={s.container}>
        <h1 className={s.title}>Questify</h1>
        <p>Questify will turn your life into
        a thrilling game full of amazing
        quests and exciting challenges.
        </p>
        <p>Choose your name to sign up or log in</p>
      </div>
      {/* <div className={s.container}>
        <form type="submit" onSubmit={onSubmit}>
          <input className={s.input} type="email" value={inputFields.email} name="email" onChange={onInputChange} autoFocus placeholder="Email" />
          <input className={s.input} type="password" value={inputFields.password} name="password" onChange={onInputChange} placeholder="Password" />
          <button className={s.button} type="submit">go!</button>
        </form>
      </div> */}

    <div className={s.container}>
      <div className={s.modals}>
        <AuthModal active={modalRegisterActive} setActive={setModalRegisterActive}>
          <p className={s.modalPrompt}>Enter email and password for registration</p>
          <form className={s.form} type="submit" onSubmit={onSubmitRegister}>
            <input className={s.input} type="email" value={inputFields.email} name="email" onChange={onInputChange} autoFocus placeholder="Email" />
            <input className={s.input} type="password" value={inputFields.password} name="password" onChange={onInputChange} placeholder="Password" />
            <button className={s.button} type="submit">go!</button>
          </form>
        </AuthModal>
        <AuthModal active={modalLoginActive} setActive={setModalLoginActive}>
          <p className={s.modalPrompt}>Enter email and password for login</p>
          <form className={s.form} type="submit" onSubmit={onSubmitLogin}>
            <input className={s.input} type="email" value={inputFields.email} name="email" onChange={onInputChange} autoFocus placeholder="Email" />
            <input className={s.input} type="password" value={inputFields.password} name="password" onChange={onInputChange} placeholder="Password" />
            <button className={s.button} type="submit">go!</button>
          </form>
        </AuthModal>
      </div>
      <h1 className={s.title}>Questify</h1>
      <p className={s.description}>Questify will turn your life into
      a thrilling game full of amazing
      quests and exciting challenges.
      </p>
      <p className={s.prompt}>Choose to
      <button className={s.modal_button} onClick={() => setModalRegisterActive(true)}>
      sign up
      </button>
      or
      <button className={s.modal_button} onClick={() => setModalLoginActive(true)}>log in</button>
      </p>
      {/* <form className={s.form} type="submit" onSubmit={onSubmit}>
        <input className={s.input} type="email" value={inputFields.email} name="email" onChange={onInputChange} autoFocus placeholder="Email" />
        <input className={s.input} type="password" value={inputFields.password} name="password" onChange={onInputChange} placeholder="Password" />
        <button className={s.button} type="submit">go!</button>
      </form> */}
      <img src={bgTablet} alt="back" className={s.back_tablet} />
      <img src={bgDesctop} alt="back" className={s.back_desc} />
      <img src={bgMobile} alt="back" className={s.back_mob} />

      </div>
  </div>
  )
}

export default LoginPage;