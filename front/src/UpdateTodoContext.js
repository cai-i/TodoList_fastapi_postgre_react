import {createContext, useState} from "react"

export const UpdateContext = createContext();

export const UpdateTodoContextProvider = (todos_param) => {
    const [updateTodoInfo, setUpdateTodoInfo] = useState({
        TodoTitle: "",
        TodoCategory: "",
        TodoProgress: "",
        TodoDeadline: "",
        TodoDone: "",
        TodoNext:"",
        TodoPriority:"",
        TodoId: "" 
    })

    return (
        <UpdateContext.Provider value={[updateTodoInfo, setUpdateTodoInfo]}>
            {todos_param.children}
        </UpdateContext.Provider>
    )
}