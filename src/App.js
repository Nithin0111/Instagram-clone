import { lazy } from "react";
import { Suspense } from "react-is";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/useAuthListener";
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route exact path={ROUTES.LOGIN} component={Login} />
            <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
            <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
