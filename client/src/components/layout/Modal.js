import { useState } from "react";
import { addHabit, useHabits } from "../../context/habit/HabitState";

const initialHabit = {
  id: "",
  name: "",
  description: "",
  recurring: "",
  frequency: "",
};

const Modal = ({ isOpen, setIsOpen }) => {
  const [habitState, habitDispatch] = useHabits();

  const [habit, setHabit] = useState(initialHabit);

  const { name, description, recurring, frequency } = habit;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addHabit(habitDispatch, habit);
    setHabit(initialHabit);
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setHabit((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="fixed h-full w-full bg-black/80 z-10">
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[500px] h-[660px] bg-white text-black rounded z-20">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-6 right-8"
        >
          <i className="fa-solid fa-x cursor-pointer text-gray-600"></i>
        </button>
        <form className="flex flex-col  mt-12 max-w-[400px] mx-auto">
          <label className="text-sm py-2" htmlFor="name">
            name
          </label>
          <input
            value={name}
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            className="border-b-2 border-gray-100 focus:outline-none mb-8 py-1"
          />
          <label className=" py-2 text-sm" htmlFor="description">
            description
          </label>
          <input
            value={description}
            onChange={handleChange}
            type="text"
            id="description"
            name="description"
            autoComplete="off"
            className="border-b-2 border-gray-100 focus:outline-none mb-8 py-1"
          />
          <label className=" py-2 text-sm" htmlFor="recurring">
            recurring
          </label>
          <select
            onChange={handleChange}
            name="recurring"
            value={recurring}
            className="border-b-2 border-gray-100 focus:outline-none mb-8 py-1"
          >
            <option disabled={true} value="">
              please choose an interval
            </option>
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
          </select>
          <label className=" py-2 text-sm" htmlFor="frequency">
            frequency
          </label>
          <input
            value={frequency}
            onChange={handleChange}
            type="number"
            id="frequency"
            name="frequency"
            autoComplete="off"
            className="border-b-2 border-gray-100 focus:outline-none py-1 mb-8"
          />
          <p className="text-md italic text-center">
            {frequency === "" ||
            frequency === undefined ||
            recurring === "" ||
            recurring === undefined
              ? ""
              : `i want to do this habit ${frequency}x ${recurring}  🚀  `}
          </p>
          <button
            className="fixed bottom-10 left-0 translate-x-[135%] py-3 px-8 bg-green-400 active:scale-95 rounded"
            onClick={handleSubmit}
          >
            add habit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
