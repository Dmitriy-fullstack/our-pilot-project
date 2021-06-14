import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { cardsSelectors, cardsActions } from '../../redux';
import dateTime from '../../utils/date-time';
import {
  cardDifficulty,
  cardCategory,
  cardType,
  cardStatus,
} from '../../utils/card-constants';

import { Header, Card, Icons, CompletedCard } from '../../components';

import s from './MainPage.module.scss';
import scaleTransition from '../../scss/transitions/scale.module.scss';

const cardsList = (list) => {
  return list?.map(card =>
    <CSSTransition
      key={card?.id}
      timeout={200}
      appear={true}
      classNames={scaleTransition}
      unmountOnExit
    >
      <li className={s.cardItem} key={card.id ? card.id : 'new'}>
        {(card?.status === cardStatus.INCOMPLETE || (card?.status === cardStatus.COMPLETE && !card?.notMoved)) && <Card {...card} />}
        {card?.status === cardStatus.COMPLETE && card?.notMoved && <CompletedCard {...card} />}
      </li>
    </CSSTransition>
  )
}

function MainPage() {
  const [isNewCard, setIsNewCard] = useState(false);
  const [isCompletedDisplayed, setIsCompletedDisplayed] = useState(false);

  const dispatch = useDispatch();

  const cards = useSelector(cardsSelectors.getAllCards);

  const todayCards = useSelector(cardsSelectors.getTodayCards);
  const tomorrowCards = useSelector(cardsSelectors.getTomorrowCards);
  const otherCards = useSelector(cardsSelectors.getOtherCards);
  const completedCards = useSelector(cardsSelectors.getCompletedCards);
  const currentCardId = useSelector(cardsSelectors.getCurrentCardId);

  useEffect(() => {    
    setIsNewCard(false);    
  }, [cards]);

  useEffect(() => {
    if (currentCardId === null) {
      setIsNewCard(false);
    }
  }, [currentCardId]);

  //---------------------------------------------
  const newCard = {
    title: '',
    difficulty: cardDifficulty.NORMAL,
    category: cardCategory.LEISURE,
    date: `${(dateTime.currentDate).getFullYear()}-${((dateTime.currentDate).getMonth() + 1) < 10 && '0'}${(dateTime.currentDate).getMonth() + 1}-${(dateTime.currentDate).getDate()}`,
    time: '12:00',
    type: cardType.TASK,
    status: cardStatus.INCOMPLETE,
    id: 'new',
  };

  //-------onCompletedShow----------
  const onCompletedShow = () => {
    setIsCompletedDisplayed(state => !state);
  }

  //---------onCreateCard-----------
  const onCreateCard = () => {
    if (isNewCard) {
      return;
    }

    dispatch(cardsActions.setCurrentCardId('new'));
    setIsNewCard(true);    
  }

  return (
    <div className={s.pageContainer}>
      <Header />
      <div className={s.container}>
        {(todayCards?.length > 0 || isNewCard) && <div>
          <h2 className={s.categoryTitle}>TODAY</h2>
          <TransitionGroup component="ul" className={s.cardsList}>
            {isNewCard
              ? cardsList([newCard, ...todayCards])
              : cardsList(todayCards)}
          </TransitionGroup>
        </div>}

        {tomorrowCards?.length > 0 && <div>
          <h2 className={s.categoryTitle}>TOMORROW</h2>
          <TransitionGroup component="ul" className={s.cardsList}>
            {cardsList(tomorrowCards)}
          </TransitionGroup>
        </div>}
          
        {otherCards?.length > 0 && <div>
          <h2 className={s.categoryTitle}>OTHER DATES</h2>
          <TransitionGroup component="ul" className={s.cardsList}>
            {cardsList(otherCards)}
          </TransitionGroup>
        </div>}

        {completedCards?.length > 0 && <div className={s.completedCardsContainer} onClick={onCompletedShow}>
          <h2 className={s.categoryTitle}>DONE</h2>
          <div className={s.completedIcon}>
            {isCompletedDisplayed
              ? < Icons className="rotate180" name='polygon' size='12' />
              : < Icons className="rotate90" name='polygon' size='12' />}
          </div>
          <div className={s.dashedLine}></div>

          <TransitionGroup component="ul" className={s.cardsList}>
            {isCompletedDisplayed && cardsList(completedCards)}
          </TransitionGroup>
        </div>}
      </div>
      
      <button className={s.button} type="button" onClick={onCreateCard}>
        <Icons name='plus' size='15' color='white' />
      </button>

    </div>
  )
}

export default MainPage;
