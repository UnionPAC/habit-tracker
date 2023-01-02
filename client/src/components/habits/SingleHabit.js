import PropTypes from "prop-types";

const SingleHabit = ({ habit }) => {
  const {
    name,
    description,
    currentStreak,
    longestStreak,
    numPerFrequency,
    currentCompletion,
    isCompleted,
  } = habit;

  return (
    <div className="flex justify-between max-w-[600px] mx-auto px-2 py-6">
      <div className="pr-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="italic">{description}</p>
        <div>
          current streak: {currentStreak === 0 ? 0 : `${currentStreak} 🔥`}
        </div>
        <div>
          longest streak: {longestStreak === 0 ? 0 : `${longestStreak} ⭐️`}
        </div>
        <div>{`${currentCompletion} / ${numPerFrequency}`}</div>
        <div>{`completion status: ${isCompleted}`}</div>
      </div>
      <div className="flex flex-col">
        <button className="m-2 py-3 px-8 bg-blue-400">edit</button>
        <button className="m-2 py-3 px-8 bg-red-400">delete</button>
      </div>
    </div>
  );
};

SingleHabit.propTypes = {
  habit: PropTypes.object.isRequired,
};

export default SingleHabit;
