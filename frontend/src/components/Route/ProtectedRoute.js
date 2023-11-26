// instead ofwriting {isAuthenticated && <UserOptions user={user}/>} is auth everwhere
//  componet referes to comp made 
// rest can be path or exact path
// it prevents laoding of soem values before the componet is laoded whcih gives err
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }

            // if (isAdmin === true && user.role !== "admin") {
            //   return <Redirect to="/login" />;
            // }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;