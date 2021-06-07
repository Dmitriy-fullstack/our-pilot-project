import { useSelector } from 'react-redux';

import { cardsSelectors } from '../../redux';

import s from './MainPage.module.scss';

import Header from '../../components/Header';

function MainPage() {
  const cards = useSelector(cardsSelectors.getAllCards);


  return (
    <>

      
      <div className={s.container}>
      <h1>Главная страница</h1>
      </div>
      

      <Header />

    </>
  )
}

export default MainPage;
