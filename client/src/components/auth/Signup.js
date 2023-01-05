import { useState, useEffect, useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import { registerUser, useAuth } from "../../context/auth/AuthState";

const Signup = () => {
  const alertContext = useContext(AlertContext);
  const [authState, authDispatch] = useAuth();

  const { setAlert } = alertContext;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = user;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("please enter all fields", "fail");
    } else if (password !== confirmPassword) {
      setAlert("passwords must match", "fail");
    } else {
      console.log("register user");
      registerUser(authDispatch, { name, email, password });
    }
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  // what does the form need?
  // name, email, password, confirm password
  return (
    <div className="flex flex-col items-center min-h-[90vh] pb-20">
      <h1 className="text-3xl font-semibold mt-10 mb-4">signup</h1>
      <form onSubmit={handleSubmit} className="w-[400px]">
        <div className="flex flex-col">
          <label htmlFor="name" className="py-2 font-mono">
            name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="john doe"
            autoComplete="off"
            className="p-2 rounded-sm"
            required
          />
        </div>
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
            placeholder="johndoe@gmail.com"
            autoComplete="off"
            className="p-2 rounded-sm"
            required
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
            placeholder="**********"
            autoComplete="off"
            className="p-2 rounded-sm"
            required
            minLength="6"
          />
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="confirmPassword" className="py-2 font-mono">
            confirm password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            placeholder="**********"
            autoComplete="off"
            className="p-2 rounded-sm"
            required
            minLength='6'
          />
        </div>
        <input
          type="submit"
          value="signup"
          className="mt-10 py-3 px-8 w-full bg-blue-500 active:scale-95 rounded text-white cursor-pointer font-semibold"
        />
      </form>
    </div>
  );
};

export default Signup;
