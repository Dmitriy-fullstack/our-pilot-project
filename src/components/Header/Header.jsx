import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
  authOperations,
  authSelectors
} from '../../redux';

import Icons from '../Icons';
import styles from './Header.module.scss';

export default function Header() {
    const dispatch = useDispatch();
    const email = useSelector(authSelectors.getUserEmail);


    
        // const nameFromEmail = email.split("@", 1);
        // const firstLetter = email.slice(0, 1).toUpperCase();
     
 

    let nameFromEmail = '';
    let firstLetter = '';
    if (email) {
      nameFromEmail = email.split("@")[0];
      firstLetter = email.slice(0, 1).toUpperCase();
    }



    const onLogOut = useCallback(() => {
        dispatch(authOperations.logout());
    }, [dispatch]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.title}>Questify</span>
                    <div className={styles.title_name}>
                        <p className={styles.first_letter}>a</p>
                        <p className={styles.email}>
                            {email}'s Quest Log
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onLogOut}
                        className={styles.btn}
                    >
                        <Icons
                            name='logout'
                            color='#3E4E6C'
                            size='22'
                            className={styles.icon_logout}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

Header.propTypes = {
    email: PropTypes.string,
    onLogOut: PropTypes.func,
};