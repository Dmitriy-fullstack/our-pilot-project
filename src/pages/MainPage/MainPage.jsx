import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { cardsSelectors } from '../../redux';

import s from './MainPage.module.scss';
import Modal from '../../components/Modal'

import {Header, Card} from '../../components';


  function MainPage() {
    
    return (
      <>      
    <Header />
    <div className={s.container}>
      <h1>Главная страница</h1>
      <button>Модалка</button>
      <Modal isOpen={false} />
    </div>
       

function MainPage() {
  const cards = useSelector(cardsSelectors.getAllCards);

  return (
    <>

      <Header />
      <div className={s.container}>
      </div>
      
      <Card
        title='This is TITLE'
        difficulty='Hard'
        dateTime='Wednesday 20:30'
        category='Family'
        status='Incomplete'
        type='Task'
        id='sdflsdmfklsdfsd123'
      />

      


    </>
    )
  }
    
  


export default MainPage
