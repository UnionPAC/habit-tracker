import { useContext, useReducer, useEffect } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

// custom hook to use auth context
export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  return [state, dispatch];
};

// ACTIONS

// register user
export const registerUser = (dispatch, user) => {
  try {
    dispatch({
      type: REGISTER_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error,
    });
  }
};

// login user
export const loginUser = (dispatch, user) => {
  try {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error,
    });
  }
};

// load user
export const loadUser = () => {};

// logout user
export const logoutUser = () => {};

// clear errors
export const clearError = () => {};

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthed: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // set token on init load

  // load user on first run or page refresh

  // update token on any change
  useEffect(() => {});

  return (
    <AuthContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
