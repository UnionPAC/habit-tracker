import { useAuth } from "../../context/auth/AuthState";
import ReactLoading from "react-loading";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {
  const [authState, authDispatch] = useAuth();
  const { loading, isAuthed } = authState;

  const spinner = (
    <div className="flex flex-col justify-center items-center min-h-[90vh]">
      <ReactLoading
        type={"spinningBubbles"}
        color={"lightblue"}
        height={100}
        width={100}
      />
    </div>
  );

  if (!loading && isAuthed) {
    return <Component />;
  } else if (loading && isAuthed) {
    return spinner;
  } else {
    return <Navigate to="/login" />;
  }
};
export default PrivateRoute;
