const express = require("express");
const bodyParser = require("body-parser");
const { route } = require("express/lib/application");

const app = express();
const port = 3000;

let items = ['EAT','Sleep','repeat'];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    let date = new Date();
    let options = {
        weekday: 'long', 
        day: 'numeric', 
        month: 'long'
    }
    let day = date.toLocaleDateString("us-EN",options);
    res.render("list",{ listTitle : day ,newListItem:items});
})

app.post("/",function(req,res){
    let item = req.body.newItem;
    if (req.body.list=="Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work",function(req,res){
    res.render("list",{listTitle :"Work List" ,newListItem:workItems});
});

app.post("/work",function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");    
});

app.get("/about",function(req,res){
    res.render("about");
});


app.listen(port,function(){
    console.log("port started at 3000");
});
