const Loader = ({ isOn }) => {
  if (!isOn) {
    return null;
  }
  return (
    <div
      style={{ zIndex: "1000" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <img src="https://i.gifer.com/ZZ5H.gif" alt="" />
    </div>
  );
};

export default Loader;
