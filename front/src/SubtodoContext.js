import {useState, createContext} from "react";

export const SubtodoContext= createContext();

export const SubtodoProvider = (props) => {
    const [allSubtodos, setAllSubtodos] = useState([])

    return (
        <SubtodoContext.Provider value = {[allSubtodos, setAllSubtodos]}>
            {props.children}
        </SubtodoContext.Provider>
    )
}