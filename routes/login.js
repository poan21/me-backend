var express = require('express');
var router = express.Router();

// Database purposes
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

// For hashing purposes
const bcrypt = require('bcryptjs');

//JSON Web Tokens
const jwt = require('jsonwebtoken');

// Basic route
router.post("/", (req, res) => {
    var pass = req.body.password;
    var email = req.body.email;

    db.get("SELECT password FROM users WHERE email=?",
        email,
        (err, row) => {
            if (!row) {
                res.status(404).json({
                     data: {
                         msg: false
                     }
                 });
            } else {
                bcrypt.compare(req.body.password, row.password, function(err, bres) {
                    // res is true if correct password, otherwise false.
                    if (bres) {
                        const payload = { email: email };
                        const secret = process.env.JWT_SECRET;
                        console.log(process.env.JWT_SECRET);

                        const token = jwt.sign(payload, secret, { expiresIn: '1h'});

                        window.localStorage.setItem('token', token);

                        res.status(201).json({
                            data: {
                                msg: bres
                            }
                        });
                    } else {
                        res.status(400).json({
                            data: {
                                msg: bres
                            }
                        });
                    }
                });
            }
    });
});

module.exports = router;
