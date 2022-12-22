import { useReducer, useState } from "react";
import uuid from "uuid";
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

const HabitState = (props) => {
  const [initialState] = useState({
    habits: [
      {
        id: 1,
        name: "reading",
        description: "read at least 15 minutes per day",
        currentStreak: 0,
        longestStreak: 0,
        status: false,
        frequency: 1,
        numPerFrequency: 1,
        dateCreated: Date.now,
      },
      {
        id: 2,
        name: "stop smoking",
        description: "i want to quit smoking for good",
        currentStreak: 0,
        longestStreak: 0,
        status: false,
        frequency: 1,
        numPerFrequency: 1,
        dateCreated: Date.now,
      },
      {
        id: 3,
        name: "yoga training",
        description: "do yoga 3 times per week ",
        currentStreak: 0,
        longestStreak: 0,
        status: false,
        frequency: 7,
        numPerFrequency: 3,
        dateCreated: Date.now,
      },
    ],
  });

  const [state, dispatch] = useReducer(habitReducer, initialState);

  // add habit
  // delete habit
  // set current habit
  // clear current habit
  // update habit
  // filter habits
  // clear filter

  return (
    <HabitContext.Provider value={{ state, dispatch }}>
      {props.children}
    </HabitContext.Provider>
  );
};

export default HabitState;
