import { useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import HabitContext from "./habitContext";
import habitReducer from "./habitReducer";
import {
  ADD_HABIT,
  UPDATE_HABIT,
  DELETE_HABIT,
  SET_CURRENT,
  CLEAR_CURRENT,
} from "../types";

export const useHabits = () => {
  const { state, dispatch } = useContext(HabitContext);
  return [state, dispatch];
};

// add habit
export const addHabit = (dispatch, habit) => {
  habit.id = uuidv4();
  dispatch({
    type: ADD_HABIT,
    payload: habit,
  });
};

// update habit
export const updateHabit = (dispatch, habit) => {
  dispatch({
    type: UPDATE_HABIT,
    payload: habit,
  });
};

// delete habit
export const deleteHabit = (dispatch, id) => {
  dispatch({
    type: DELETE_HABIT,
    payload: id,
  });
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
  };

  const [state, dispatch] = useReducer(habitReducer, initialState);

  return (
    <HabitContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </HabitContext.Provider>
  );
};

export default HabitState;
