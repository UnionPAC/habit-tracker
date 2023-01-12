import ReactLoading from "react-loading";

const Spinner = () => (
  <div className="flex flex-col justify-center items-center min-h-[90vh]">
    <ReactLoading
      type={"spinningBubbles"}
      color={"lightblue"}
      height={100}
      width={100}
    />
  </div>
);

export default Spinner;
