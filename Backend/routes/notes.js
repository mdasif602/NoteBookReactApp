const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

// ROUTE 1 : Get all the notes using: Get "/api/notes/fetchallnotes" . Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);

    } catch (error) {
        console.error(error.mesage);
        res.status(500).send("Intenal Server Error occured")
    }
})

// ROUTE 2 : Add a new notes using: POST "/api/notes/addnote" . Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleat 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {


        const { title, description, tag } = req.body;
        // If there are errors, return Bad request and the errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save();

        res.json(savedNote);
    } catch (error) {
        console.error(error.mesage);
        res.status(500).send("Intenal Server Error occured")
    }
})


// ROUTE 3 : Update an existing notes using: POST "/api/notes/updatenote" . Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    
    // Create a new note
    const newNote = {};

    if (title) {
        newNote.title = title;
    }
    if (description) {
        newNote.description = description;
    }
    if (tag) {
        newNote.tag = tag;
    }

    // find the note to be updated
    let note = await Notes.findById(req.params.id);

    if (!note) {
        return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
        return res.status(404).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    res.json({note});
});
module.exports = router;