import { Fragment, useEffect, useState } from "react";
import SingleHabit from "./SingleHabit";
import spongebobWaiting from "../../imgs/spongebob-waiting.gif";
import { getHabits, useHabits } from "../../context/habit/HabitState";
import Spinner from "../layout/Spinner";

const Habits = ({ isOpen, setIsOpen }) => {
  const [habitState, habitDispatch] = useHabits();
  const [loading, setLoading] = useState(false);
  const { habits } = habitState;

  useEffect(() => {
    getHabits(habitDispatch);
  }, [habitDispatch, habits]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {habits <= 0 ? (
            <div className="flex flex-col justify-center items-center">
              <div className="my-8">
                <img
                  src={spongebobWaiting}
                  alt="spongebob alone, waiting with coffee"
                  width="580px"
                  height="424px"
                />
                <p className="pt-4 text-lg text-center">
                  you don't have any habits ...
                </p>
              </div>
            </div>
          ) : (
            habits
              .map((habit, index) => {
                return (
                  <div
                    key={index}
                    className="m-2 flex justify-center items-center min-w-[600px]"
                  >
                    <SingleHabit
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      habit={habit}
                      setLoading={setLoading}
                    />
                  </div>
                );
              })
              .sort()
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Habits;
