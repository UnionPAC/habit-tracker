import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { clearErrors, useAuth, loginUser } from "../../context/auth/AuthState";
import AlertContext from "../../context/alert/alertContext";

const Login = () => {
  const alertContext = useContext(AlertContext);
  const [authState, authDispatch] = useAuth();

  const { error, isAuthed } = authState;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (error) {
      setAlert(error, "fail");
      clearErrors(authDispatch);
    }
  }, [error]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("please enter email and password", "fail");
    } else {
      loginUser(authDispatch, { email, password });
    }
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  if (isAuthed) return <Navigate to="/" />;

  return (
    <div className="flex flex-col items-center min-h-[90vh] pb-20">
      <h1 className="text-3xl font-semibold mt-10 mb-4">login</h1>
      <form onSubmit={handleSubmit} className="w-[400px]">
        <div className="flex flex-col my-4">
          <label htmlFor="email" className="py-2 font-mono">
            email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            placeholder="johndoe@gmail.com"
            autoComplete="off"
            className="p-2 rounded-sm"
          />
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="password" className="py-2 font-mono">
            password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            placeholder="**********"
            autoComplete="off"
            className="p-2 rounded-sm"
          />
        </div>
        <input
          type="submit"
          value="login"
          className="mt-10 py-3 px-8 w-full bg-blue-500 active:scale-95 rounded text-white cursor-pointer font-semibold"
        />
      </form>
    </div>
  );
};

export default Login;
