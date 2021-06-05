import { Route, Switch } from "react-router";
import Main from "./views/Main";
import Registration from "./views/Registration";
import Authorization from "./views/Authorization";
import Cabinet from "./views/Cabinet";
import NotFoundView from "./views/NotFoundView";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/registration" component={Registration} />
        <Route path="/authorization" component={Authorization} />
        <Route path="/cabinet" component={Cabinet} />
        <Route component={NotFoundView} />
      </Switch>
    </>
  );
};

export default App;
