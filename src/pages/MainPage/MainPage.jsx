import { useSelector } from 'react-redux';

import { cardsSelectors } from '../../redux';

import s from './MainPage.module.scss';

import Header from '../../components/Header';

function MainPage() {
  const cards = useSelector(cardsSelectors.getAllCards);


  return (
    <>
      <Header />
    </>
  )
}

export default MainPage;
