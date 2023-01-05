const About = () => {
  return (
    <div className="flex flex-col min-h-[90vh] pb-20 items-center pt-20">
      <h1 className="text-2xl font-semibold p-2">about this app</h1>
      <p className="p-2">this is a full stack MERN app for tracking your habits! </p>
      <p className="p-2">
        <strong className="mr-2">version:</strong>
        <span className="tracking-widest">1.0.0</span>
      </p>
    </div>
  );
};

export default About;
