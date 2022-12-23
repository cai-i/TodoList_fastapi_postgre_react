import {createContext, useState} from "react"

export const UpdateContext = createContext();

export const UpdateTodoContextProvider = (todos_param) => {
    const [updateTodoInfo, setUpdateTodoInfo] = useState({
        TodoTitle: "",
        TodoUnit: "",
        TodoProgress: "",
        TodoContent: "",
        TodoDeadline: "",
        TodoId: ""
    })

    return (
        <UpdateContext.Provider value={[updateTodoInfo, setUpdateTodoInfo]}>
            {todos_param.children}
        </UpdateContext.Provider>
    )
}