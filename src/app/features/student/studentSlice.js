import { createSlice } from "@reduxjs/toolkit";
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "./studentApiSlice";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
    loading: false,
    error: false,
    success: false,
  },
  reducers: {
    loaderStart: (state, action) => {
      state.loading = true;
    },
    setMsgEmpty: (state) => {
      state.success = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.fulfilled, (state, action) => {
        state.students = action.payload;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.students.push(action.payload); // Directly add to the array
        state.loading = false;
        state.success = `${action.payload.name} data created successful`;
      })
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (data) => data.id != action.payload
        );
        state.loading = false;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateStudent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.map((item) => {
          if (item.id == action.payload.id) {
            return action.payload;
          } else {
            return item;
          }
        });
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// export actions
export const { loaderStart, setMsgEmpty } = studentSlice.actions;

export default studentSlice.reducer;
