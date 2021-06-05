import { useSelector } from 'react-redux';

import { cardsSelectors } from '../../redux';

import s from './MainPage.module.scss';

function MainPage() {
  const cards = useSelector(cardsSelectors.getAllCards);


  return (
    <>
      
      <div className={s.container}>
      <h1>Главная страница</h1>
      </div>
      
    </>
  )
}

export default MainPage;
