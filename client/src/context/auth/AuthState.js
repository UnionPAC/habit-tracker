import { useContext, useReducer, useEffect } from "react";
import axios from "axios";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import setAuthToken from "../../utils/setAuthToken";
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

// load user
export const loadUser = async (dispatch) => {
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      // payload is the user
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// register user
export const registerUser = async (dispatch, formData) => {
  try {
    const res = await axios.post("/api/users", formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// login user
export const loginUser = async (dispatch, formData) => {
  try {
    const res = await axios.post("/api/auth", formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// logout
export const logout = (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

// clear errors
export const clearErrors = (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthed: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  setAuthToken(state.token);

  if (state.loading) {
    if (state.token) {
      loadUser(dispatch);
    }
  }

  useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
