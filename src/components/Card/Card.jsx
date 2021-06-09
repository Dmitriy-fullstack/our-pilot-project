import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  cardDifficulty,
  cardStatus,
  cardCategory,
  cardType,
  challengeCardTitle,
} from '../../utils/card-constants';

import { Icons } from '../';
  
import s from './Card.module.scss';
import { cardsActions, cardsOperations, cardsSelectors } from '../../redux';

function Card({ title, difficulty, date, time, category, type, id = null }) {
  const [titleField, setTitleField] = useState(title);
  const [difficultyField, setDifficultyField] = useState(difficulty);
  const [dateTimeField, setDateTimeField] = useState(`${date}, ${time}`);
  const [categoryField, setCategoryField] = useState(category);
  // const [statusField, setStatusField] = useState(status);
  const [typeField, setTypeField] = useState(type);
  const [challengeTitle, setChallengeTitle] = useState('Challenge');

  const [isDifficultyEdit, setIsDifficultyEdit] = useState(false);
  const [isCategoryEdit, setIsCategoryEdit] = useState(false);

  const currentCardId = useSelector(cardsSelectors.getCurrentCardId);

  const dispatch = useDispatch();

  // const dateTime = date + time;

  //-------------------------------------------

  //----------onCardClick-----------
  const onCardClick = () => {
    dispatch(cardsActions.setCurrentCardId(id));
    const title = id ? 'edit challenge' : 'Create New CHALLENGE';
    setChallengeTitle(title);
  }

  //----------onDifficultyClick-----------
  const onDifficultyClick = () => {
    droppToDeffault();
    setIsDifficultyEdit(true);
  }

  //----------onDifficultyChange-----------
  const onDifficultyChange = (diff) => {
    setDifficultyField(diff);
    setIsDifficultyEdit(false);
  }

  //----------onCategoryClick-----------
  const onCategoryClick = () => {
    droppToDeffault();
    setIsCategoryEdit(true);
  }
  
  //----------onCategoryChange-----------
  const onCategoryChange = (category) => {
    setCategoryField(category);
    setIsCategoryEdit(false);
  }

  //---------onCardTypeClick----------
  const onCardTypeClick = () => {
    setTypeField(state => {
      if (state === cardType.TASK) {
        return cardType.CHALLENGE;
      }

      return cardType.TASK;
    })
  }

  //----------onInputTitle------------
  const onInputTitle = event => {
    setTitleField(event.target.value);
  }

  //--------droppToDeffault--------
  const droppToDeffault = () => {
    setIsDifficultyEdit(false);
    setIsCategoryEdit(false);
  }

  //-------------------------------------------
  //-------------------------------------------
  //-------------------------------------------

  //----------onSubmit-----------
  const onSubmit = event => {
    event.preventDefault();

    const card = {
      title: titleField,
      difficulty: difficultyField,
      category: categoryField,
      date: "2020-12-31",
      time: "20:30",
      type: typeField,
    };

    if (id) {
      dispatch(cardsOperations.editCard(id, card));
      return;
    }

    dispatch(cardsOperations.addCard(card));
  }

  //----------onDelete------------
  const onDelete = () => {
    //Открытие модалки с подтверждением удаления
    dispatch(cardsOperations.deleteCard(id));
  }

  //---------onComplete-----------
  const onComplete = () => {
    dispatch(cardsOperations.completeCard(id));
  }

  //----------onCancel-----------
  const onCancel = () => {
    //Действия по отмене создания новой карточки
  }

  return (
    <div className={s[`wrapper${typeField}`]} onClick={onCardClick}>
      <form type='submit' onSubmit={onSubmit}>
        <div className={s.headerContainer}>
          <button className={s[`difficulty${difficultyField}`]} onClick={onDifficultyClick}>
            {difficultyField}
            {id === currentCardId && <span className={s.iconContainer}>
              <Icons className="rotate180" name='polygon' size='8' />
            </span>}
          </button>

          {isDifficultyEdit &&
            <div className={s.difficultyEnum}>
            {Object.values(cardDifficulty).map((diff, index) => {
              let diffClass = s[`difficulty${diff}`];
              if (diff === difficultyField) {
                diffClass += ` ${s.active}`;
              }

              return <button
                key={index}
                className={diffClass}
                onClick={() => onDifficultyChange(diff)}>
                {diff}
              </button>
            })}
            </div>}

          <span onClick={onCardTypeClick}>
            {type === cardType.TASK
              ? <Icons
                name='star'
                size='15'
                />
              : <Icons
                name='trophy'
                size='14'
              />}
          </span>
        </div>
        {typeField === cardType.CHALLENGE &&
          <span className={s.challengeTitle}>{challengeTitle}</span>}

        {id === currentCardId
          ? <input
              className={s.inputTitle}
              type="text"
              value={titleField}
              onChange={onInputTitle}>
            </input>
          : <h3 className={s[`title${typeField}`]}>{titleField}</h3>}     
        
        
        <span className={s.dateTime}>
          {dateTimeField}
          {id === currentCardId && <span className={s.iconContainer}>
              <Icons name='calendar' size='14' />
            </span>}
        </span>

        <div className={s.footerContainer}>
          <button className={s[categoryField]} onClick={onCategoryClick}>
            {categoryField}
            {id === currentCardId && <span className={s.iconContainer}>
                <Icons className="rotate180" name='polygon' size='8' />
            </span>}
          </button>

          {isCategoryEdit &&
            <div className={s.categoryEnum}>
            {Object.values(cardCategory).map((category, index) => {

              let categoryClass = s.categoryItem;
              if (category === categoryField) {
                categoryClass += ` ${s.active}`;
              }

              return <button
                key={index}
                className={categoryClass}
                onClick={() => onCategoryChange(category)}>
                {category}
              </button>
            })}
          </div>}

          {id && id === currentCardId &&
            <div className={s.buttonsContainer}>
              <button type='submit' className={s.btn}>
                <Icons name='save' size='10' />
              </button>
              <button className={s.btn} onClick={onDelete}>
                <Icons name='clear' size='10' />
              </button>
              <button className={s.btn} onClick={onComplete}>
                <Icons name='done' size='14' />
              </button>
            </div>}
          
          {!id &&
            <div className={s.buttonsContainer}>
              <button className={s.btn} onClick={onCancel}>
                <Icons name='clear' size='10' />
              </button>
              <button className={s.btnCreate} type='submit'>
                'CREATE'
              </button>
            </div>}

        </div>
      </form>
    </div>
  )
}

export default Card;