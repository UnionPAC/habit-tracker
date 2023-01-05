import { useState, useEffect } from "react";
import {
  addHabit,
  updateHabit,
  useHabits,
  clearCurrent,
} from "../../context/habit/HabitState";

const initialHabit = {
  name: "",
  description: "",
};

const Modal = ({ isOpen, setIsOpen }) => {
  const [habitState, habitDispatch] = useHabits();

  const { current } = habitState;

  useEffect(() => {
    if (current) {
      setHabit(current);
    } else {
      setHabit(initialHabit);
    }
  }, [current]);

  const [habit, setHabit] = useState(initialHabit);

  const { name, description } = habit;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!current) {
      addHabit(habitDispatch, habit);
      setHabit(initialHabit);
      setIsOpen(!isOpen);
    } else {
      updateHabit(habitDispatch, habit);
      clearAll();
      setIsOpen(!isOpen);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setHabit((values) => ({ ...values, [name]: value }));
  };

  const clearAll = () => {
    clearCurrent(habitDispatch);
  };

  return (
    <div className="fixed h-full w-full bg-black/80 z-10">
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[500px] h-[660px] bg-white text-black rounded z-20">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            clearAll();
          }}
          className="fixed top-6 right-8"
        >
          <i className="fa-solid fa-x cursor-pointer text-gray-600"></i>
        </button>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  mt-12 max-w-[400px] mx-auto"
        >
          <h2 className="mb-6 text-2xl font-semibold">
            {current ? "update habit" : "add habit"}
          </h2>
          <label className="text-sm py-2 text-black" htmlFor="name">
            name
          </label>
          <input
            required
            value={name || ""}
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            className="border-b-2 border-gray-100 focus:outline-none mb-8 py-1"
          />
          <label className=" py-2 text-sm text-black" htmlFor="description">
            description
          </label>
          <input
            required
            value={description || ""}
            onChange={handleChange}
            type="text"
            id="description"
            name="description"
            autoComplete="off"
            className="border-b-2 border-gray-100 focus:outline-none mb-8 py-1"
          />
          <button
            type="submit"
            className="fixed bottom-10 left-0 translate-x-[105%] py-3 px-8 bg-green-400 active:scale-95 rounded text-gray-800"
          >
            {current ? "update habit" : "create habit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
