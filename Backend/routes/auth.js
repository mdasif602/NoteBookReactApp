const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const JWT_SECRET = 'Asifisagoodb$oy';

// create a User using: POST "/api/auth/createuser", Doesn't require auth No login required

router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('password', 'Enter a password of length minimum five').isLength({min: 5}),
    body('email', 'Enter a valid Email').isEmail()
], async (req, res)=>{
    // console.log(req.body);
    // const user = User(req.body)
    // user.save();
    // res.send("Hello");

    // If there are errors, return Bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    try {
    // Check whether the user with this email exists already
        let user = await User.findOne({email: req.body.email});
        if (user) {
            return res.status(400).json({error: "Sorry a user with this email already exists"});
        }
        const salt = await bcrypt.genSalt(10);

        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })

        // .then(user => res.json(user))
        // .catch(err => console.log(err.message))
        // res.json({error: "Please enter a unique value for email"})
        const data = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken);

        // res.json(user);
        res.json(authToken);

    } catch (error) {
        console.error(error.mesage); 
        res.status(500).send("Some Error occured")
    }
})


module.exports = router;