import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { globalSelectors, globalActions } from '../../redux';

import s from './Notification.module.scss';

const notificationRoot = document.querySelector('#notification-root');

function Notification() {
  const dispatch = useDispatch();

  const notification = useSelector(globalSelectors.getNotificationText);

  useEffect(() => {
    setTimeout(() => {
      dispatch(globalActions.deleteNotificationText());
    }, 5000);
  }, [dispatch]);


  return createPortal(
    <div className={s.container}>
      {notification}
    </div>,
    notificationRoot
  )
}

export default Notification;