import {
  ADD_HABIT,
  DELETE_HABIT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_HABIT,
  FILTER_HABITS,
  CLEAR_FILTER,
} from "../types";

const habitReducer = (state, action) => {
  switch (action.type) {
    case ADD_HABIT:
      return {
        ...state,
        habits: [...state.habits, action.payload],
      };
    default:
      throw new Error(`unsupported type of ${action.type}`);
  }
};

export default habitReducer;
