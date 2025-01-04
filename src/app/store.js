import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice";
import studentReducer from "./features/student/studentSlice";

const store = configureStore({
  reducer: {
    kajkam: todoReducer,
    student: studentReducer,
  },
  middleware: (getDefalutMiddleware) => getDefalutMiddleware(),
  devTools: true,
});

export default store;
