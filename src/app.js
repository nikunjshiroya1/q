const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const hbs = require('hbs')
const app = express();

const templetsPath = path.join(__dirname, '../templets')
const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templets/partials')

app.set('views', templetsPath)
app.use(express.static(publicPath));

hbs.registerPartials(partialsPath);

const playList = new mongoose.Schema({
        name:
        {
            type: [String],
            required: true,
            minlength: 2,
            maxlength: 4,
        },
        password: {
            type: [Number]
        },
        address: {
            type: [String]
        },
        email: {
            type: [String]
        },
        data: {
            type: [Number]
        },
    })

module.exports = (playList);

app.set('view engine', 'hbs')

app.get("/", (req, res) => {
    res.render('login');
})

app.get("/register", (req, res) => {
    res.render('register');
})

app.get("/forgot_password", (req, res) => {
    res.render('forgot_password');
})

app.get("/Settings", (req, res) => {
    res.render('Settings');
})

app.get("/login", async (req, res) => {
    var req = req.query;
    var email = req.email;
    var password = req.password;


    var user = await PlayList.findOne({ email: email })
    if (user) {
        if (user.password == password) {
            res.redirect('dashboard')
        } else {
            const jsonCotent = JSON.stringify({ 'message': 'Credential Doesnot match' });
            res.end(jsonCotent);
        }
    } else {
        const jsonCotent = JSON.stringify({ 'massage': 'User Not Found' });
        res.end(jsonCotent);
    }
})

app.get("/deshboard", (req, res) => {
    res.render('index');
})
app.get("/user/store", (req, res) => {
    var req = req.query;
    try {
        const user = new PlayList({
            name: req.name,
            address: req.address,
            password: req.password,
            email: req.email,
            data: req.data,

            
        })
        console.log(user,'AAA');
        user.save();
        responseData = {
            "massage":"Data Added Succsessfully",
        }
        constjsonCotent = JSON.stringify(responseData);
        res.end(jsonCotent);

    } catch (error) {
        console.log(error);
    }
})

app.get("/user/create",async (req,res) => {
    res.render('user-create');
})

app.get("/user/list",async (req,res) => {
    const users = await PlayList.find()

    res.render('user-list',{users:users});
})

// saveData = async () => {
//   const data = new PlayList({
//     name: "aaaaa",
//     mo_no: "8888888888",
//     address: "test",
//     email: "aa@gmaila.com",
//     data: "765",
//   })
//   data.save();
// }
// saveData();

app.get("/dashboard",async (req,res) => {
    // res.render('index');

    res.render('dashboard');
})

app.get("/about", (req, res) => {
    res.render('about', {
        m_price: price,
        m_name: 'Mobile'
        // b_price : 50,
        // b_name : 'Bluetooth',
    });
})

app.get("/*", (req, res) => {
    res.send("<h1>404 Page Not Found</h1>");
})

app.listen(3000)