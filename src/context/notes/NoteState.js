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
        },
        {
          "_id": "65d4f7ebc5a651f64asx123450289c",
          "user": "65d4f781c5a651f64a502894",
          "title": "title updated",
          "description": "sleep is important more and more",
          "tag": "sleep reminder",
          "date": "2024-02-20T19:05:15.921Z",
          "__v": 0
        },
        {
          "_id": "65d4f7ebc5a651f634424xa50289c",
          "user": "65d4f781c5a651f64a502894",
          "title": "title updated",
          "description": "sleep is important more and more",
          "tag": "sleep reminder",
          "date": "2024-02-20T19:05:15.921Z",
          "__v": 0
        },
        {
          "_id": "65d4f7ebc5a651f64a52345c0282549c",
          "user": "65d4f781c5a651f64a502894",
          "title": "title updated",
          "description": "sleep is important more and more",
          "tag": "sleep reminder",
          "date": "2024-02-20T19:05:15.921Z",
          "__v": 0
        },
        {
          "_id": "65d4f7ebc5a651f64a5dgv02345289c",
          "user": "65d4f781c5a651f64a502894",
          "title": "title updated",
          "description": "sleep is important more and more",
          "tag": "sleep reminder",
          "date": "2024-02-20T19:05:15.921Z",
          "__v": 0
        }
      ];



    const [notes, setNotes] = useState(notesInitial)

    //Add a note
    const addNote = (title, description, tag)=>{
      //TODO API CALL
      console.log("Adding a new note")
        const note = {
          "_id": "65d4f7d7c5a651f64a50289821",
          "user": "65d4f781c5a651f64a5028942",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2024-02-20T19:04:55.033Z",
          "__v": 0
        };
        setNotes(notes.concat(note));
    }

    // Delete a Note
    const deleteNote = (id)=>{
      // TODO API CALL
        console.log("Deleting the node witd id " + id);
        const newNotes = notes.filter((note)=>{return note._id !== id}) 
        setNotes(newNotes);
    }

    //Edit a note
    const editNote = (id, title, description, tag)=>{
      
    }
    return (
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
