import NoteContext from "./noteContext";
import { useState, useEffect } from "react";
const NoteState = (props) => {

  // const host = "http://localhost:5000"
  const host = "https://notebookreactapp.onrender.com"
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

  let notesInitial = []


  const [notes, setNotes] = useState(notesInitial)
  const [user, setUser] = useState({name: "", email: ""})

  const setUserData = (name, email)=>{
    const data = {name: name, email: email}
    setUser(data);
  }

  useEffect(() => {
  }, [user]); 
  
  const fetchNotes = async () => {
    //TODO API CALL

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify(),
    });
    const res = await response.json();


    //Client side logic
    // console.log("Fetching all notes")
    // console.log(res)
    setNotes(res);
  }

  //Add a note
  const addNote = async (title, description, tag) => {
    //TODO API CALL
    const data = {
      "title": title,
      "description": description,
      "tag": tag
    }

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log(res);

    //Client side logic
    console.log("Adding a new note")
    // const note = {
    //   "_id": "65d4f7d7c5a651f64a50289821",
    //   "user": "65d4f781c5a651f64a5028942",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2024-02-20T19:04:55.033Z",
    //   "__v": 0
    // };
    setNotes(notes.concat(res));
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // TODO API CALL
    console.log("id is " +  id);
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const res = await response.json();

   console.log(res);

    console.log("Deleting the node with id " + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }



  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const data = {
      "title": title,
      "description": description,
      "tag": tag
    }
    // console.log(id);
    // console.log(data);

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log(res);


    //logic to Edit a note in client
    // for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //   if (element._id === id) {
    //     notes[index].title = title;
    //     notes[index].description = description;
    //     notes[index].tag = tag;
    //     setNotes(notes);
    //     break;
    //   }
    // }
    // setNotes(notes);

    let newNotes =  JSON.parse(JSON.stringify(notes));
     for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes, user, setUserData }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
