import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

const IsUserLoggedIn = ({ user, loggedInPath, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return (
            <Redirect
              to={{
                pathname: loggedInPath,
                state: { from: location },
              }}
            />
          );
        }

        if (!user) {
          return children;
        }

        return null;
      }}
    />
  );
};

export default IsUserLoggedIn;

IsUserLoggedIn.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
  loggedInPath: PropTypes.string.isRequired,
};
