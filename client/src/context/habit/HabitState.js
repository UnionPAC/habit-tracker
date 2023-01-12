import { useContext, useReducer } from "react";
import axios from "axios";
import HabitContext from "./habitContext";
import habitReducer from "./habitReducer";
import {
  ADD_HABIT,
  UPDATE_HABIT,
  DELETE_HABIT,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_HABITS,
  HABIT_ERROR,
  GET_HABITS,
} from "../types";

export const useHabits = () => {
  const { state, dispatch } = useContext(HabitContext);
  return [state, dispatch];
};

// get habits
export const getHabits = async (dispatch) => {
  try {
    const res = await axios.get("/api/habits");
    dispatch({
      type: GET_HABITS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: HABIT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// add habit
export const addHabit = async (dispatch, habit) => {
  try {
    const res = await axios.post("/api/habits", habit);
    dispatch({
      type: ADD_HABIT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: HABIT_ERROR,
      payload: error,
    });
    console.log(error);
  }
};

// update habit
export const updateHabit = async (dispatch, habit) => {
  try {
    const res = await axios.put(`/api/habits/${habit._id}`, habit);
    dispatch({
      type: UPDATE_HABIT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: HABIT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// delete habit
export const deleteHabit = async (dispatch, id) => {
  try {
    await axios.delete(`/api/habits/${id}`);
    dispatch({
      type: DELETE_HABIT,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: HABIT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// set current habit
export const setCurrent = (dispatch, habit) => {
  dispatch({
    type: SET_CURRENT,
    payload: habit,
  });
};

// clear current habit
export const clearCurrent = (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT,
  });
};

export const clearHabits = (dispatch) => {
  dispatch({
    type: CLEAR_HABITS,
  });
};

const HabitState = (props) => {
  const initialState = {
    habits: [
      // {
      //   id: 1,
      //   name: "reading",
      //   description: "read at least 15 minutes per day",
      // },
      // {
      //   id: 2,
      //   name: "stop smoking",
      //   description: "i want to quit smoking for good",
      // },
      // {
      //   id: 3,
      //   name: "yoga training",
      //   description: "do yoga 3 times per week ",
      // },
    ],
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(habitReducer, initialState);

  return (
    <HabitContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </HabitContext.Provider>
  );
};

export default HabitState;
