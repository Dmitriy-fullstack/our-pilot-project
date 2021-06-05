import { useSelector } from 'react-redux';

import { cardsSelectors } from '../../redux';

import s from './MainPage.module.scss';

function MainPage() {
  const cards = useSelector(cardsSelectors.getAllCards);


  return (
    <>
      <h1>Главная страница</h1>
    </>
  )
}

export default MainPage;
