const About = () => {
  return (
    <div className="flex flex-col min-h-[90vh] text-white justify-start items-center pt-20">
      <h1 className="text-4xl py-4 font-semibold tracking-wide">about this app</h1>
      <p className="p-2">this is a full stack MERN app for tracking your habits! </p>
      <p className="p-2 italic"><strong>version:</strong><span className="pl-2 tracking-widest">1.0.0</span></p>
    </div>
  );
};

export default About;
