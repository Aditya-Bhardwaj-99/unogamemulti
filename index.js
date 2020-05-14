/*Requires*/
const express = require("express");
const ejs = require("ejs");
const mongoClient = require("mongodb").MongoClient;
const bodyparser = require("body-parser");

/*Variables*/
const url = "mongodb+srv://aladsss:lpacafcs@unogame-oxplv.mongodb.net/Cards?retryWrites=true&w=majority";
var user;
var cards;
var playercards=[];

/*Join/Create servers*/
const server = express();
// mongoClient.connect(url,function(err,client){
//     if(err){
//         console.log(err);
//     }else{
//         console.log('connected');
//     }
//     //dosomething
// })

/*Server sets*/
server.set('view engine', 'ejs');
server.use(bodyparser.json());
server.use('/',express.static(__dirname+'/public'))
server.use(bodyparser.urlencoded({ extended: true }));
server.set('path',__dirname+"/public")
/*Functions*/
server.get('/', function (req, res) {
    res.render('loginpage.ejs', { err: "" });
})

server.post('/signin', function (req, res) {
    res.render('signinpage.ejs', {
        err: ""
    });
})

server.post('/login', function (req, res) {
    res.render('loginpage.ejs', { err: "" });
})

server.post('/reg', function (req, res) {
    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err);
        } else {
            console.log('connected');
        }
        var db = client.db('Cards');
        var data = {
            name: req.body.name,
            user: req.body.user,
            mail: req.body.mail,
            pass: req.body.pass
        }
        if (req.body.pass === req.body.cpass) {
            db.collection('logindata').insertOne(data, function (err, res) {
                if (err) {
                    throw err;
                } else {
                    console.log('data entered');
                    client.close();
                }
            })
            res.render('loginpage.ejs', { err: "" });
        } else {
            res.render('signinpage.ejs', {
                err: "Password didn't match"
            })
        }
    })
})

server.post('/logout', function (req, res) {
    mongoClient.connect(url,function(err,client){
        if(err){
            console.log(err);
        }else{
            console.log('connected');
        }
        var db=client.db("Cards");
        db.collection("game").deleteOne({user:user});
        client.close();
    })
    res.render("loginpage.ejs");
})

server.post('/game', function (req, res) {
    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log(err);
        } else {
            console.log('connected');
        }
        var user = { user: req.body.user };
        var db = client.db('Cards');
        db.collection('allcards').find({}).toArray(function (err,result) {
            cards = result;
            for (var i = 0; i < 7; i++) {
                playercards.push(cards[Math.floor(Math.random() * 54)])
            }
        })
        db.collection('logindata').find(user).toArray(function (err, result) {
            if (err) {
                console.log(err);
                res.render('loginpage.ejs', { err: 'No user name Found' });
            } else {
                if (result[0].pass == req.body.pass) {
                    user = req.body.user;
                    db.collection("game").insertOne({ user: user, cards: playercards });
                    res.render('uno.ejs', { user: user });
                    client.close();
                } else {
                    res.render('loginpage.ejs', { err: 'Incorrect Password' });
                    client.close();
                }
            }
        })
    })
})

/*Ports*/
server.listen(process.env.PORT || 3000);