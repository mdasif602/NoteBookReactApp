import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props)=>{
    const s1 = {
        "name": "Asif",
        "class": "4a"
    }
    const [state, setstate] = useState(s1)
    const update = () => {
        setTimeout(() =>{
            setstate({
                "name": "hello",
                "class": "12"
            })
        }, 1000)
    }
    return (
        <NoteContext.Provider value = {{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
