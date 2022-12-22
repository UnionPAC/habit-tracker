import HabitContext from "../context/habit/habitContext";
import { useContext } from "react";

export const useHabits = () => {
  const { state, dispatch } = useContext(HabitContext);
  return [state, dispatch];
};
