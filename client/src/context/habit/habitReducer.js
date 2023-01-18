import {
  ADD_HABIT,
  DELETE_HABIT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_HABIT,
  CLEAR_HABITS,
  HABIT_ERROR,
  GET_HABITS,
  CLEAR_ERRORS,
} from "../types";

const habitReducer = (state, action) => {
  switch (action.type) {
    case GET_HABITS:
      return {
        ...state,
        habits: action.payload,
      };
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
        habits: state.habits.filter((habit) => habit._id !== action.payload),
      };
    case HABIT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_HABITS:
      return {
        ...state,
        habits: [],
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
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      throw new Error(`unsupported type of ${action.type}`);
  }
};

export default habitReducer;
