import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props)=>{
    // const s1 = {
    //     "name": "Asif",
    //     "class": "4a"
    // }
    // const [state, setstate] = useState(s1)
    // const update = () => {
    //     setTimeout(() =>{
    //         setstate({
    //             "name": "hello",
    //             "class": "12"
    //         })
    //     }, 1000)
    // }
    // return (
    //     <NoteContext.Provider value = {{state, update}}>
    //         {props.children}
    //     </NoteContext.Provider>
    // )

    const notesInitial = [
        {
          "_id": "65d4f7d7c5a651f64a502898",
          "user": "65d4f781c5a651f64a502894",
          "title": "My title updated",
          "description": "time to not sleep its currently 1 37 am",
          "tag": "sleep reminder",
          "date": "2024-02-20T19:04:55.033Z",
          "__v": 0
        },
        {
          "_id": "65d4f7ebc5a651f64a50289c",
          "user": "65d4f781c5a651f64a502894",
          "title": "title updated",
          "description": "sleep is important more and more",
          "tag": "sleep reminder",
          "date": "2024-02-20T19:05:15.921Z",
          "__v": 0
        }
      ];

    const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
