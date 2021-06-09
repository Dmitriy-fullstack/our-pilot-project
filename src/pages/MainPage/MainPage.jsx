import { useSelector } from 'react-redux';

import { cardsSelectors } from '../../redux';

import s from './MainPage.module.scss';
import Modal from '../../components/Modal'

import Header from '../../components/Header';

  function MainPage() {
    
    return (
      <>      
    <Header />
    <div className={s.container}>
      <h1>Главная страница</h1>
      <button>Модалка</button>
      <Modal isOpen={false} />
    </div>
       

    </>
    )
  }
    
  


export default MainPage
