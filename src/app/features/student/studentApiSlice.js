import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../helpers/api";

/**
 * Create new Student
 */

export const createStudent = createAsyncThunk(
  "student/createStudent",
  async (data) => {
    try {
      const response = await API.post("/students", data);

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

/**
 * Show Student
 */

export const getStudents = createAsyncThunk("student/getStudents", async () => {
  try {
    const response = await API.get("/students");

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

/**
 * Delete Student
 */
export const deleteStudent = createAsyncThunk(
  "student/deleteStudent",
  async (id) => {
    try {
      await API.delete(`/students/${id}`);
      return id;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

/**
 * Update Student
 */
export const updateStudent = createAsyncThunk(
  "student/updateStudent",
  async (data) => {
    try {
      const response = await API.put(`/students/${data.id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
