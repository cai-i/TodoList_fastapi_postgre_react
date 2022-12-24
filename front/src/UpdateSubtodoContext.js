import {createContext, useState} from "react"

export const UpdateSubtodoContext = createContext();

export const UpdateSubtodoContextProvider = (subtodos_param) => {
    const [updateSubtodoInfo, setUpdateSubtodoInfo] = useState({
        SubtodoTitle: "",
        SubtodoProgress: "",
        SubtodoDone:"",
        SubtodoNext:"",
        SubtodoId: ""
    })

    return (
        <UpdateSubtodoContext.Provider value={[updateSubtodoInfo, setUpdateSubtodoInfo]}>
            {subtodos_param.children}
        </UpdateSubtodoContext.Provider>
    )
}