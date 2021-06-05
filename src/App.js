import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";

import { authOperations, authSelectors, globalSelectors} from './redux';

import routes from './routes';
import { PrivatRoute, PublicRoute } from './components/Routes';
import { Notification, LoaderSpinner } from './components';

import scaleTransitions from './scss/transitions/scale.module.scss';
// import './App.css';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const MainPage = lazy(() => import('./pages/MainPage'));

// import logo from './logo.svg';

function App() {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);
  const notification = useSelector(globalSelectors.getNotificationText);
  const token = useSelector(authSelectors.getToken);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(authOperations.getCurrentUser());
  // }, [dispatch]);

  return (
    <>
      <CSSTransition
        in={!!notification}
        appear={true}
        classNames={scaleTransitions}
        timeout={200}
        unmountOnExit
      >					
        <Notification />
      </CSSTransition>

      <Suspense fallback={<LoaderSpinner/>}>
        <Switch>
          <PublicRoute
            path={routes.login} 
            isAuthenticated={isAuthenticated}
            redirectTo={routes.main}
          >
            <LoginPage />
          </PublicRoute>

          <PrivatRoute
            path={routes.main} exact
            isAuthenticated={token}
            redirectTo={routes.login}
          >
            <MainPage />
          </PrivatRoute>

          <Redirect to={routes.main} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
