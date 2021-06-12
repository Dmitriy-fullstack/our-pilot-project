import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  authOperations,
} from '../../redux';

import Modal from '../../components/Modal'

import s from './LoginPage.module.scss';

import pic1 from '../../images/pic1.png';
import pic2 from '../../images/pic2.png';
import bgpic1 from '../../images/bgpic1.png';
import bgpic2 from '../../images/bgpic2.png';

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
    <div className={s.container}>
      <div className={s.modals}>
        <Modal active={modalRegisterActive} setActive={setModalRegisterActive}>
          <p className={s.modalPrompt}>Enter email and password for registration</p>
          <form className={s.form} type="submit" onSubmit={onSubmitRegister}>
            <input className={s.input} type="email" value={inputFields.email} name="email" onChange={onInputChange} autoFocus placeholder="Email" />
            <input className={s.input} type="password" value={inputFields.password} name="password" onChange={onInputChange} placeholder="Password" />
            <button className={s.button} type="submit">go!</button>
          </form>
        </Modal>
        <Modal active={modalLoginActive} setActive={setModalLoginActive}>
          <p className={s.modalPrompt}>Enter email and password for login</p>
          <form className={s.form} type="submit" onSubmit={onSubmitLogin}>
            <input className={s.input} type="email" value={inputFields.email} name="email" onChange={onInputChange} autoFocus placeholder="Email" />
            <input className={s.input} type="password" value={inputFields.password} name="password" onChange={onInputChange} placeholder="Password" />
            <button className={s.button} type="submit">go!</button>
          </form>
        </Modal>
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
      <img src={pic1} alt="back" className={s.back_first} />
      <img src={pic2} alt="back" className={s.back_second} />
      <img src={bgpic1} alt="back" className={s.bg_pic} />
      <img src={bgpic2} alt="back" className={s.bg_pic} />
    </div>
  )
}

export default LoginPage;