import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { cardsSelectors } from '../../redux';

import s from './MainPage.module.scss';

import { Header, Card, Icons, CompletedCard } from '../../components';
import TextField from "@material-ui/core/TextField";
import DateTime from '../../components/DataTime/DateTime'

function MainPage() {
      

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
