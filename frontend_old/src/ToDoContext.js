import react, {useState, createContext} from "react";

export const TodoContext= createContext();

export const TodoProvider = (props) => {
    const [allTodos, setAllTodos] = useState([])

    return (
        <TodoContext.Provider value = {[allTodos, setAllTodos]}>
            {props.children}
        </TodoContext.Provider>
    )
}