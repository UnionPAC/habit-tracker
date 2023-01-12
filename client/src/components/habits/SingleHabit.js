import PropTypes from "prop-types";
import {
  useHabits,
  deleteHabit,
  setCurrent,
  clearCurrent,
} from "../../context/habit/HabitState";

const SingleHabit = ({ habit, isOpen, setIsOpen }) => {
  const { _id, name, description, currentStreak, longestStreak } = habit;

  const habitDispatch = useHabits()[1];

  const onDelete = () => {
    deleteHabit(habitDispatch, _id);
    clearCurrent(habitDispatch);
  };

  const onEdit = () => {
    setCurrent(habitDispatch, habit);
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex mb-8">
      <div className="pr-6">
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
      </div>
    </div>
  );
};

SingleHabit.propTypes = {
  habit: PropTypes.object.isRequired,
};

export default SingleHabit;
