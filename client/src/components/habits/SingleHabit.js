import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  useHabits,
  deleteHabit,
  setCurrent,
  clearCurrent,
  updateHabit,
  getHabits,
} from "../../context/habit/HabitState";

const DAY_IN_MILLISECONDS = "86400000";
const WEEK_IN_MILLISECONDS = "604800000";
const MONTH_IN_MILLISECONDS = "2629746000";

const SingleHabit = ({ habit, isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);

  let {
    _id,
    name,
    description,
    currentStreak,
    longestStreak,
    isComplete,
    recurring,
    currentCompletion,
    goalCompletion,
    intervalStart,
  } = habit;

  const habitDispatch = useHabits()[1];

  const onDelete = () => {
    deleteHabit(habitDispatch, _id);
    clearCurrent(habitDispatch);
  };

  const onEdit = () => {
    setCurrent(habitDispatch, habit);
    setIsOpen(!isOpen);
  };

  const onIncrement = async () => {
    setLoading(true);
    await updateHabit(habitDispatch, {
      ...habit,
      currentCompletion: currentCompletion + 1,
    });
    await getHabits(habitDispatch);
    setLoading(false);
  };

  const onDecrement = async () => {
    if (currentCompletion <= 1) {
      await updateHabit(habitDispatch, { ...habit, currentCompletion: "0" });
    } else {
      await updateHabit(habitDispatch, {
        ...habit,
        currentCompletion: currentCompletion - 1,
      });
    }
  };

  const checkIfIsComplete = async () => {
    if (currentCompletion >= goalCompletion && !isComplete) {
      console.log("setting isComplete to true");
      await updateHabit(habitDispatch, {
        ...habit,
        isComplete: true,
        currentStreak: currentStreak + 1,
      });
    }
    if (currentCompletion < goalCompletion && isComplete) {
      console.log("setting isComplete to false");
      if (currentStreak <= 1) {
        await updateHabit(habitDispatch, {
          ...habit,
          isComplete: false,
          currentStreak: "0",
        });
      } else {
        await updateHabit(habitDispatch, {
          ...habit,
          isComplete: false,
          currentStreak: currentStreak - 1,
        });
      }
    }
  };

  const checkLongestStreak = async () => {
    if (longestStreak < currentStreak) {
      await updateHabit(habitDispatch, {
        ...habit,
        longestStreak: currentStreak,
      });
    } else {
      await updateHabit(habitDispatch, {
        ...habit,
        longestStreak: longestStreak,
      });
    }
  };

  const checkInterval = async () => {
    if (recurring === "daily") {
      recurring = DAY_IN_MILLISECONDS;
    } else if (recurring === "weekly") {
      recurring = WEEK_IN_MILLISECONDS;
    } else if (recurring === "monthly") {
      recurring = MONTH_IN_MILLISECONDS;
    } else {
      console.log("recurring: something went wrong");
    }

    const currentDateTime = new Date();
    const currentDateTimeInMilliseconds = currentDateTime.getTime();
    const timePassed = currentDateTimeInMilliseconds - intervalStart;

    console.log(`time passed: ${timePassed}`);
    console.log(`upkeep at: ${recurring}`);

    if (timePassed >= recurring) {
      console.log("🛠 time for upkeep!");
      await handleHabitUpkeep();
    }
  };

  const handleHabitUpkeep = async () => {
    const updatedCurrentStreakVal = isComplete === true ? currentStreak : 0;

    await updateHabit(habitDispatch, {
      ...habit,
      currentCompletion: 0,
      isComplete: false,
      intervalStart: Date.now(),
      currentStreak: updatedCurrentStreakVal,
    });
  };

  useEffect(() => {
    checkIfIsComplete();
  }, [currentCompletion]);

  return (
    <div className="flex mb-8">
      <div className="pr-20">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-md">{description}</p>
        <p className="pt-4">
          current streak:{" "}
          {currentStreak > 0 ? `${currentStreak} 🔥` : currentStreak}
        </p>
        <p className="pt-4">
          longest streak:{" "}
          {longestStreak > 0 ? `${longestStreak} 🔥` : longestStreak}
        </p>
        <p className="pt-4">
          completion status: {isComplete ? "true" : "false"}
        </p>
        <p className="pt-4">recurring: {recurring}</p>
      </div>
      <div className="flex flex-col">
        <button
          onClick={onEdit}
          className="m-2 py-3 px-8 bg-blue-400 rounded active:scale-95"
        >
          edit
        </button>
        <button
          onClick={onDelete}
          className="m-2 py-3 px-8 bg-red-400 rounded active:scale-95"
        >
          delete
        </button>
        <div className="flex justify-between mx-6">
          <button onClick={onDecrement}>
            <i className="fa-solid fa-square-minus text-4xl p-2 active:scale-95"></i>
          </button>
          <button onClick={onIncrement}>
            <i className="fa-solid fa-square-plus text-4xl p-2 active:scale-95"></i>
          </button>
        </div>
        <div className="flex flex-row justify-center my-4 text-2xl font-semibold">
          <p className="px-4">{currentCompletion}</p>
          {"/"}
          <p className="px-4">{goalCompletion}</p>
        </div>
      </div>
    </div>
  );
};

SingleHabit.propTypes = {
  habit: PropTypes.object.isRequired,
};

export default SingleHabit;
