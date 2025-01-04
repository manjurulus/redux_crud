import { createSlice } from "@reduxjs/toolkit";
import { todos } from "../../../data/todos";

const todoSlice = createSlice({
    name: "kormotalika",
    initialState: {
        todos: [],
        error: null,
        message: null,
        loader: false,
    },
    reducers: {
        loadAlltodos: (state) => {
            state.todos = todos;
        },
        createNewTodo: (state, action) => {
            state.todos.push({
                ...action.payload,
                id: Math.floor(Math.random() * 100),
            })
        }
    }
});

// export actions
export const {loadAlltodos, createNewTodo} = todoSlice.actions;

export default todoSlice.reducer;