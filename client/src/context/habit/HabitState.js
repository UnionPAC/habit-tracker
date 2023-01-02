import { useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import HabitContext from "./habitContext";
import habitReducer from "./habitReducer";
import {
  ADD_HABIT,
  DELETE_HABIT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_HABIT,
  FILTER_HABITS,
  CLEAR_FILTER,
} from "../types";

export const useHabits = () => {
  const { state, dispatch } = useContext(HabitContext);
  return [state, dispatch];
};

export const addHabit = async (dispatch, habit) => {
  habit.id = uuidv4();
  dispatch({
    type: ADD_HABIT,
    payload: habit,
  });
};

const HabitState = (props) => {
  const initialState = {
    habits: [
      {
        id: 1,
        name: "reading",
        description: "read at least 15 minutes per day",
        currentStreak: 5,
        longestStreak: 10,
        frequency: 1,
        numPerFrequency: 1,
        currentCompletion: 0,
        isCompleted: false,
      },
      {
        id: 2,
        name: "stop smoking",
        description: "i want to quit smoking for good",
        currentStreak: 2,
        longestStreak: 39,
        frequency: 1,
        numPerFrequency: 1,
        currentCompletion: 0,
        isCompleted: false,
      },
      {
        id: 3,
        name: "yoga training",
        description: "do yoga 3 times per week ",
        currentStreak: 1,
        longestStreak: 1,
        status: false,
        frequency: 7,
        numPerFrequency: 3,
        currentCompletion: 0,
        isCompleted: false,
      },
    ],
  };

  const [state, dispatch] = useReducer(habitReducer, initialState);

  return (
    <HabitContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </HabitContext.Provider>
  );
};

export default HabitState;
