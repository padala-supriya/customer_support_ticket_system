const express = require("express");

const app = express();

app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

app.listen(3000,function(){

    console.log("Server Running");

});
let tickets = [];
app.get("/",function(req,res){

    res.render("home",{
        tickets:tickets
    });

});
app.post("/add",function(req,res){

    let ticket = {

        title:req.body.title,

        desc: req.body.desc,

        status:"Open"

    };

    tickets.push(ticket);

    res.redirect("/");

});
app.get("/ticket/:id",

function(req,res){

res.render("details",{

ticket:tickets[req.params.id],

index:req.params.id

});

});
app.get("/resolve/:id",

function(req,res){

tickets[req.params.id].status
=
"Resolved";

res.redirect("/");

});
app.get("/delete/:id",

function(req,res){

tickets.splice(
req.params.id,
1
);

res.redirect("/");

});