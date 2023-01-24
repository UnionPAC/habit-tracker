import PropTypes from "prop-types";
import { useEffect } from "react";
import {
  useHabits,
  deleteHabit,
  setCurrent,
  clearCurrent,
  updateHabit,
} from "../../context/habit/HabitState";

const SECOND_IN_MILLISECONDS = 1000;
const MINUTE_IN_MILLISECONDS = 60000;
const DAY_IN_MILLISECONDS = 86400000;
const WEEK_IN_MILLISECONDS = 604800000;
const MONTH_IN_MILLISECONDS = 2629800000;

const SingleHabit = ({ habit, isOpen, setIsOpen, setLoading }) => {
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
    lastUpdated,
  } = habit;

  const [habitState, habitDispatch] = useHabits();

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
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  const onDecrement = async () => {
    setLoading(true);
    if (currentCompletion <= 1) {
      await updateHabit(habitDispatch, { ...habit, currentCompletion: "0" });
    } else {
      await updateHabit(habitDispatch, {
        ...habit,
        currentCompletion: currentCompletion - 1,
      });
    }
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  const checkIfIsComplete = async () => {
    if (currentCompletion >= goalCompletion && !isComplete) {
      setLoading(true);
      await updateHabit(habitDispatch, {
        ...habit,
        isComplete: true,
        currentStreak: currentStreak + 1,
      });
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else if (currentCompletion < goalCompletion && isComplete) {
      if (currentStreak <= 1) {
        setLoading(true);
        await updateHabit(habitDispatch, {
          ...habit,
          isComplete: false,
          currentStreak: "0",
          longestStreak: "0",
        });
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } else {
        setLoading(true);
        await updateHabit(habitDispatch, {
          ...habit,
          isComplete: false,
          currentStreak: currentStreak - 1,
          longestStreak: longestStreak - 1,
        });
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    }
  };

  const checkIfLongestStreak = async () => {
    if (longestStreak < currentStreak) {
      await updateHabit(habitDispatch, {
        ...habit,
        longestStreak: currentStreak,
      });
    }
  };

  useEffect(() => {
    checkIfIsComplete()
      .then(() => checkIfLongestStreak())
      .catch((err) => console.log(err));
  }, [currentCompletion]);

  const checkIfUpkeepNeeded = async () => {
    const lastUpdatedInMilliseconds = new Date(lastUpdated).getTime();
    // when do we expect the next upkeep?
    let upkeepNeededAt;
    if (recurring === "daily") {
      upkeepNeededAt = lastUpdatedInMilliseconds + DAY_IN_MILLISECONDS;
    } else if (recurring === "weekly") {
      upkeepNeededAt = lastUpdatedInMilliseconds + WEEK_IN_MILLISECONDS;
    } else if (recurring === "monthly") {
      upkeepNeededAt = lastUpdatedInMilliseconds + MONTH_IN_MILLISECONDS;
    }

    const currentTime = Date.now();

    if (currentTime > upkeepNeededAt) {
      console.log("performing upkeep... ");
      await updateHabit(habitDispatch, {
        ...habit,
        currentCompletion: "0",
        currentStreak: isComplete ? currentStreak : "0",
        isComplete: false,
        lastUpdated: Date.now(),
      });
    }
  };

  useEffect(() => {
    checkIfUpkeepNeeded();
  }, []);

  return (
    <div className="flex mb-8 bg-slate-600 p-6 rounded-xl border-4 border-black">
      <div className="pr-20 w-[500px]">
        <h3 className="text-2xl font-semibold mb-2">{name}</h3>
        <p className="text-sm">{description}</p>
        <p className="pt-4">
          <span className="font-semibold">current streak:</span>{" "}
          {currentStreak > 0 ? `${currentStreak} 🔥` : currentStreak}
        </p>
        <p className="pt-4">
          <span className="font-semibold">longest streak:</span>{" "}
          {longestStreak > 0 ? `${longestStreak} ⭐️` : longestStreak}
        </p>
        <p className="pt-4">
          <span className="font-semibold">complete:</span>{" "}
          {isComplete ? "true ✅" : "false ❌"}
        </p>
        <p className="pt-4">
          recurring: <span className="italic">{recurring}</span>
        </p>
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
            <i className="fa-solid fa-square-minus text-4xl p-2 active:scale-95 text-black"></i>
          </button>
          <button onClick={onIncrement}>
            <i className="fa-solid fa-square-plus text-4xl p-2 active:scale-95 text-black"></i>
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
