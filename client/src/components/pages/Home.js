import { useContext, useEffect, useState } from "react";
import Habits from "../habits/Habits";
import Modal from "../layout/Modal";
import { useHabits, clearErrors } from "../../context/habit/HabitState";
import AlertContext from "../../context/alert/alertContext";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [habitState, habitDispatch] = useHabits();
  const { error } = habitState;

  useEffect(() => {
    if (error) {
      setAlert(error, "fail");
      clearErrors(habitDispatch);
    }
  }, [error]);

  return (
    <div className="flex flex-col min-h-[90vh] pb-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mx-8 mt-6 max-w-[160px] py-3 px-8 bg-green-400 hover:scale-105 active:scale-100 text-gray-800"
      >
        + new habit
      </button>
      {isOpen ? <Modal isOpen={isOpen} setIsOpen={setIsOpen} /> : ""}
      <Habits isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Home;
