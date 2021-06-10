import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { cardsSelectors } from '../../redux';

import s from './MainPage.module.scss';

import { Header, Card, Icons, CompletedCard } from '../../components';

function MainPage() {


  // function MainPage() {
    
  //   return (
  //     <>      
  //   <Header />
  //   <div className={s.container}>
  //     <h1>Главная страница</h1>
  //     <button>Модалка</button>
  //     <Modal isOpen={false} />
  //   </div>
       

  const [todayCard, setTodayCard] = useState([]);


  const cards = useSelector(cardsSelectors.getAllCards);
  

  //---------------------------------------------

  //---------onCreateCard-----------
  const onCreateCard = () => {

  }

  return (
    <>
      <Header />
      <div className={s.container}>
        <div>
          <h2>TODAY</h2>
          <ul>
            {}
          </ul>
        </div>
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

      <CompletedCard
        title='Test test test test test'
        type='Task'
      />

      <button className={s.button} type="button" onClick={onCreateCard}>
        <Icons name='plus' size='15' color='white' />
      </button>

    </>
  )
}

export default MainPage;
