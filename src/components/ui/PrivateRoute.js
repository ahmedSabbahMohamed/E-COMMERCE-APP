import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLogin, user } = useSelector((state) => state.authSlice);

  if (!isLogin || !user?.user_type) {
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;





// import React from 'react'

//  function PrivateRoute() {

  
//   return (
//     <div>PrivateRoute</div>
//   )
// }


// export default PrivateRoutes();