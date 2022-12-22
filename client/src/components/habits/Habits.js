import { useHabits } from "../../hooks/useHabits";
import { Fragment } from "react";

const Habits = () => {
  const [habitState, habitDispatch] = useHabits();
  const { habits } = habitState;
  return (
    <Fragment>
      {habits.map((habit) => {
        const { id, name, description } = habit;
        return (
          <div>
            <h1>{id}</h1>
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
        );
      })}
    </Fragment>
  );
};

export default Habits;
