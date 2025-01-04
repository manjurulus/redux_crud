import { useDispatch } from "react-redux";
import "./App.css";
import Student from "./components/student/Student";
import { useEffect } from "react";
import { getStudents } from "./app/features/student/studentApiSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  return (
    <div className="w-[1000px] mx-auto mt-[100px]">
      <Student />
    </div>
  );
}

export default App;
