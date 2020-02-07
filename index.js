const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = mongoose.createConnection('mongodb://localhost:27017/admin', { useNewUrlParser: true });

if (!db) {
    console.log("False");
}
else {
    console.log("True");
}

app.get('/', function (req, res) {
    res.sendFile(('/home/ulcom31/Desktop/loginmongo/form.html'));
});

app.post('/login', function (req, res){
    var username1 = req.body.username;
    var password1 = req.body.password;
    db.collection("Login").find({
        username : username1,
        password : password1
    }).toArray(function (err, result){
        if (err){
            res.send("Credentials are Wrong");
        }
        else if (result.length == 0){
            res.send("Enter Credentials");
        }
        else{
            res.send( result[0].username + " " + result[0].password + " have successfully logged in");
        }
    })
});

app.listen(5000);
