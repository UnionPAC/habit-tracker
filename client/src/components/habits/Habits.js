import { Fragment } from "react";
import SingleHabit from "./SingleHabit";
import spongebobWaiting from "../../imgs/spongebob-waiting.gif";
import { useHabits } from "../../context/habit/HabitState";

const Habits = () => {
  const [habitState, habitDispatch] = useHabits();
  const { habits } = habitState;

  return (
    <Fragment>
      {habits <= 0 ? (
        <div className="flex flex-col justify-center items-center">
          <img
            src={spongebobWaiting}
            alt="spongebob alone waiting with coffee"
            width="580px"
            height="424px"
          />
          <p className="pt-4 text-lg font-semibold">
            you don't have any habits yet ...
          </p>
        </div>
      ) : (
        habits.map((habit, index) => {
          return (
            <div key={index}>
              <SingleHabit habit={habit} />
            </div>
          );
        })
      )}
    </Fragment>
  );
};

export default Habits;
