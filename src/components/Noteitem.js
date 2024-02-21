import React from 'react'

export const Noteitem = (props) => {
    const {note} = props;
  return (
    <div>
       {note.title}
       {note.description}
    </div>
  )
}