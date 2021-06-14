import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { Icons } from '../';

import { cardType } from '../../utils/card-constants';

import s from './CompletedCard.module.scss';
import '../../scss/_global-styles.scss';
import { cardsOperations } from '../../redux';

function CompletedCard({ title, type, id }) {
  
  const [shortTitle, setShortTitle] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (title?.length > 14) {
      setShortTitle(`${title.slice(0, 14)}...`)
      return;
    }

    setShortTitle(title);
  }, [title]);

  //-------onMoveToCompleted----------
  const onMoveToCompleted = () => {
    dispatch(cardsOperations.moveToCompleted({ cardId: id }));
  }

  return (
    <div className={`wrapper${type}`}>
      <span className={s[`complited${type}`]}>Completed:</span>
      <span className={s.title}>{shortTitle}</span>

      <div className={s.iconContainer}>
        <Icons
          name={type === cardType.TASK ? 'award' : 'award2'}
          className={type === cardType.CHALLENGE && 'rotate15'}
        />
      </div>
      <button className={s.btn} onClick={onMoveToCompleted}>
        <span>Continue</span>
        <span className={s.btnIcon}>
          <Icons
            name='arrow'
            size='7'
          />
        </span>
      </button>
    </div>
  )
}

export default CompletedCard;