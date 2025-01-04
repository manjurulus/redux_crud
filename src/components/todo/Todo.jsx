import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewTodo } from "../../app/features/todo/todoSlice";

const Todo = () => {
    const {todos} = useSelector((state) => state.kajkam);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name: "",
        status: "Pending",
    });

    const handleInputChange = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value,    
        }
        ));
    }

    const handleTodoCreate = (e) => {
        e.preventDefault();

        dispatch(createNewTodo(input));
    }

    return <div>
        <form onSubmit={handleTodoCreate} action="" className="p-5 shadow-md mb-5">
            <div className="mb-5">
                <input type="text" name="name" value={input.name} onChange={handleInputChange} placeholder="Todo Name" />
            </div>
            <div className="mb-5">
                <select name="status" id="" value={input.status} onChange={handleInputChange}>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Done">Done</option>
                </select>
            </div>
            <div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
            </div>
        </form>
        <hr />
        <h3 className="text-3xl font-bold">
            All Todos
        </h3>
        <ul>
            {todos.map((item)=>{
                return <li className="p-3 shadow-sm my-1" key={item.id}>-{item.name}</li>
            })}
            
        </ul>
    </div>;
}

export default Todo;