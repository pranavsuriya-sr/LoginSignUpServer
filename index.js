const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/Employee');
const app = express();
require('dotenv').config()
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb://127.0.0.1:27017/employee");

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("SUccess");
            } else {
                res.json("Incorrect Password");
            }
        } else {
            res.json("User Not Found");
        }
    })
})
app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err));
})
app.listen(PORT, () => {console.log("Server is running on port 3001")});