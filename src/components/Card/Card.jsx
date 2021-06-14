import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import dateTime from '../../utils/date-time';
import { cardsActions, cardsOperations, cardsSelectors } from '../../redux';

import {
  cardDifficulty,
  cardCategory,
  cardType,
} from '../../utils/card-constants';

import { Icons } from '../';

import { TextField } from '@material-ui/core';
  
import s from './Card.module.scss';
import '../../scss/_global-styles.scss';

function Card({ title, difficulty, date, time, category, type, id }) {
  const [titleField, setTitleField] = useState(title);
  const [difficultyField, setDifficultyField] = useState(difficulty);
  const [dateTimeField, setDateTimeField] = useState(`${date}T${time}`);
  const [displayedDateTime, setDisplayedDateTime] = useState(`${date} ${time}`);
  const [categoryField, setCategoryField] = useState(category);
  const [typeField, setTypeField] = useState(type);

  const [isDifficultyEdit, setIsDifficultyEdit] = useState(false);
  const [isCategoryEdit, setIsCategoryEdit] = useState(false);

  const currentCardId = useSelector(cardsSelectors.getCurrentCardId);

  const dispatch = useDispatch();

  useEffect(() => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [cardDate, cardTime] = dateTimeField.split('T');
    let dateTimeString = '';

    if (type === cardType.CHALLENGE) {
      dateTimeString = 'by ';
    }

    if (new Date(cardDate) > dateTime.yesterday && new Date(cardDate) <= new Date(dateTime.currentDate)) {
      dateTimeString += `Today, ${cardTime}`;
      setDisplayedDateTime(dateTimeString);
      return;
    }

    if (new Date(cardDate) > dateTime.currentDate && new Date(cardDate) <= new Date(dateTime.tomorrow)) {
      dateTimeString += `Tomorrow, ${cardTime}`;
      setDisplayedDateTime(dateTimeString);
      return;
    }

    if (new Date(cardDate) > new Date(dateTime.tomorrow) && new Date(cardDate) <= new Date(dateTime.week)) {
      dateTimeString += `${daysOfWeek[new Date(cardDate).getDay()]}, ${cardTime}`;
      setDisplayedDateTime(dateTimeString);
      return;
    }

    dateTimeString += `${cardDate} ${cardTime}`;
    setDisplayedDateTime(dateTimeString);

  }, [dateTimeField, type])

  //--------------------------------
  //--------------------------------
  //--------------------------------

  //----------onCardClick-----------
  const onCardClick = () => {
    dispatch(cardsActions.setCurrentCardId(id));
  }

  //-------onDifficultyClick--------
  const onDifficultyClick = () => {
    droppToDeffault();
    setIsDifficultyEdit(true);
  }

  //------onDifficultyChange--------
  const onDifficultyChange = (diff) => {
    setDifficultyField(diff);
    setIsDifficultyEdit(false);
  }

  //------=onCategoryClick----------
  const onCategoryClick = () => {
    droppToDeffault();
    setIsCategoryEdit(true);
  }
  
  //-------onCategoryChange---------
  const onCategoryChange = (category) => {
    setCategoryField(category);
    setIsCategoryEdit(false);
  }

  //--------onCardTypeClick---------
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

  //--------onDateTimeChange---------
  const onDateTimeChange = e => {
    setDateTimeField(e.target.value);
  }

  //--------droppToDeffault--------
  const droppToDeffault = () => {
    setIsDifficultyEdit(false);
    setIsCategoryEdit(false);
  }

  //----------------------------------
  //------Работа с базой данных-------
  //----------------------------------

  //----------onSaveChanges-----------
  const onSaveChanges = event => {
    event.stopPropagation();
    const [date, time] = dateTimeField.split('T');

    const card = {
      title: titleField,
      difficulty: difficultyField,
      category: categoryField,
      date,
      time,
      type: typeField,
    };

    dispatch(cardsOperations.editCard({ cardId: id, cardsFields: card }));
    // dispatch(cardsActions.setCurrentCardId(null));
  }

  //----------onDelete------------
  const onDelete = event => {
    event.stopPropagation();
    //Открытие модалки с подтверждением удаления
    dispatch(cardsOperations.deleteCard({ cardId: id }));
    // dispatch(cardsActions.setCurrentCardId(null));
  }

  //---------onComplete-----------
  const onComplete = event => {
    event.stopPropagation();
    dispatch(cardsOperations.completeCard({ cardId: id }));
    // dispatch(cardsActions.setCurrentCardId(null));
  }

  //-----------------------------
  //-------Новая карточка--------
  //-----------------------------

  //----------onCancel-----------
  const onCancel = event => {
    event.stopPropagation();
    dispatch(cardsActions.setCurrentCardId(null));
  }

  //----------onCreate-----------
  const onCreate = event => {
    event.stopPropagation();
    const [date, time] = dateTimeField.split('T');

    const card = {
      title: titleField,
      difficulty: difficultyField,
      category: categoryField,
      date,
      time,
      type: typeField,
    };

    dispatch(cardsOperations.addCard(card));
    // dispatch(cardsActions.setCurrentCardId(null));
  }

  return (
    <div className={`wrapper${typeField}`} onClick={onCardClick}>
      <div className={s.headerContainer}>
        <button className={s[`difficulty${difficultyField}`]} onClick={onDifficultyClick}>
          {difficultyField}
          {id === currentCardId && <span className={s.iconContainer}>
            <Icons className="rotate180" name='polygon' size='8' />
          </span>}
        </button>

        {id === currentCardId && isDifficultyEdit &&
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
          {typeField === cardType.TASK
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
      
      {id === 'new' && <span className={s.titleDescription}>
        {(`Create New ${typeField === cardType.TASK ? 'quest' : 'challenge'}`)} </span>}
      
      {id !== 'new' && typeField === cardType.CHALLENGE &&
        <span className={s.titleDescription}>challenge</span>}

      {id === currentCardId
        ? <input
            className={s.inputTitle}
            type="text"
            value={titleField}
            onChange={onInputTitle}>
          </input>
        : <h3 className={s[`title${typeField}`]}>{titleField}</h3>}     
      
      
      <div className={s.dateTimeContainer}>
      {id === currentCardId
        ? <TextField
          id="datetime-local"
          type="datetime-local"
          inputProps={{ style: { color: '#B9C3C8', fontSize: 11, width: 150 } }}
          value={dateTimeField}
          onChange={onDateTimeChange}
        />
        : <span className={s.dateTime}>{ displayedDateTime }
          {id === currentCardId && <span className={s.iconContainer}>
              <Icons name='calendar' size='14' /></span>}</span>}
      </div>

      <div className={s.footerContainer}>
        <button className={s[categoryField]} onClick={onCategoryClick}>
          {categoryField}
          {id === currentCardId && <span className={s.iconContainer}>
              <Icons className="rotate180" name='polygon' size='8' />
          </span>}
        </button>

        {id === currentCardId && isCategoryEdit &&
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

        {id !== 'new' && id === currentCardId &&
          <div className={s.buttonsContainer}>
            <button className={s.btn} onClick={onSaveChanges}>
              <Icons name='save' size='10' />
            </button>
            <button className={s.btn} onClick={onDelete}>
              <Icons name='clear' size='10' />
            </button>
            <button className={s.btn} onClick={onComplete}>
              <Icons name='done' size='14' />
            </button>
          </div>}
        
        {id === 'new'&&
          <div className={s.buttonsContainer}>
            <button className={s.btn} onClick={onCancel}>
              <Icons name='clear' size='10' />
            </button>
            <button className={s.btnCreate} onClick={onCreate}>
              CREATE
            </button>
          </div>}

      </div>
    </div>
  )
}

export default Card;