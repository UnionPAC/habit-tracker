import {
  ADD_HABIT,
  DELETE_HABIT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_HABIT,
  CLEAR_HABITS,
} from "../types";

const habitReducer = (state, action) => {
  switch (action.type) {
    case ADD_HABIT:
      return {
        ...state,
        habits: [...state.habits, action.payload],
      };
    case UPDATE_HABIT:
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.payload.id ? action.payload : habit
        ),
      };
    case DELETE_HABIT:
      return {
        ...state,
        habits: state.habits.filter((habit) => habit.id !== action.payload),
      };
    case CLEAR_HABITS:
      return {
        ...state,
        habits: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    default:
      throw new Error(`unsupported type of ${action.type}`);
  }
};

export default habitReducer;
