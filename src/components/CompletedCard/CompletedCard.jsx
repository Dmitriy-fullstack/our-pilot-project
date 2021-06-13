import { useEffect, useState } from 'react';

import { cardType } from '../../utils/card-constants';

import { Icons } from '../';

import s from './CompletedCard.module.scss';

function CompletedCard({ title, type }) {
  
  const [shortTitle, setShortTitle] = useState('');

  useEffect(() => {
    if (title.length > 17) {
      setShortTitle(`${title.slice(0, 17)}...`)
      return;
    }

    setShortTitle(title);
  }, [title]);

  return (
    <div className={s.container}>
      <span className={s[`complited${type}`]}>Completed:</span>
      <span className={s.title}>{shortTitle}</span>

      <div className={s.iconContainer}>
        <Icons
          name={type === cardType.TASK ? 'award' : 'award2'}
          size='144'
          className={type === cardType.CHALLENGE && 'rotate15'}
        />
      </div>
      <button className={s.btn}>
        <span>Continue</span>
        <Icons
          name='arrow'
          size='7'
        />
      </button>
    </div>
  )
}

export default CompletedCard;