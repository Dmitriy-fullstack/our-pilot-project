import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({
  isAuthenticated,
  redirectTo,
  children,
  ...routeProps
}) => (
  <Route {...routeProps}>
    {isAuthenticated ? (
      <Redirect to={redirectTo} /> 
    ) : (
      children
    )}
  </Route>
);

export default PublicRoute;