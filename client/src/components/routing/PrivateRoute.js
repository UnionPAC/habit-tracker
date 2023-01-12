import { useAuth } from "../../context/auth/AuthState";

import { Navigate } from "react-router-dom";
import Spinner from "../layout/Spinner";

const PrivateRoute = ({ component: Component }) => {
  const [authState, authDispatch] = useAuth();
  const { loading, isAuthed } = authState;

  if (loading) return <Spinner />;
  if (isAuthed) return <Component />;
  return <Navigate to="/login" />;
};
export default PrivateRoute;
