import { Route, Redirect } from 'react-router-dom';

const PrivatRoute = ({
  isAuthenticated,
  redirectTo,
  children,
  ...routeProps
}) => (
  <Route {...routeProps}>
    {isAuthenticated ?
      (children) :
      (<Redirect to={redirectTo} />)}
  </Route>
);

export default PrivatRoute;