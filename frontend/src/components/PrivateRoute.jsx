import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to={'/sign-in'} />;
}


export  function ProtectedRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Navigate to={'/'}/> : <Outlet/>;
}
