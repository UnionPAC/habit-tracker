import PropTypes from "prop-types";
import {
  useHabits,
  deleteHabit,
  setCurrent,
  clearCurrent,
} from "../../context/habit/HabitState";

const SingleHabit = ({ habit, isOpen, setIsOpen }) => {
  const { id, name, description, currentStreak, longestStreak } = habit;

  const [habitState, habitDispatch] = useHabits();

  const onDelete = () => {
    deleteHabit(habitDispatch, id);
    clearCurrent(habitDispatch);
  };

  const onEdit = () => {
    setCurrent(habitDispatch, habit);
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between max-w-[600px] mx-auto p-4 bg-stone-100 text-black rounded">
      <div className="pr-6">
        <h3 className="text-xl font-semibold font-mono mb-2">{name}</h3>
        <p className="text-md">{description}</p>
        {currentStreak && (
          <div>
            current streak: {currentStreak === 0 ? 0 : `${currentStreak} 🔥`}
          </div>
        )}
        {longestStreak && (
          <div>
            longest streak: {longestStreak === 0 ? 0 : `${longestStreak} ⭐️`}
          </div>
        )}
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
        <button className="m-2 p-2 rounded bg-green-400 active:scale-95">
          ✔️
        </button>
      </div>
    </div>
  );
};

SingleHabit.propTypes = {
  habit: PropTypes.object.isRequired,
};

export default SingleHabit;
