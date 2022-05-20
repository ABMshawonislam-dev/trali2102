const express = require('express')
const bannerData = require('./bannerData')
const logoData = require('./logoData')
const dealData = require('./dealData')
const productData = require('./productData')
const featureData = require('./featureCat')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const User = require('./model/usermodel.js')
var cors = require('cors')
const app = express()

mongoose.connect('mongodb+srv://trali:trali123@cluster0.gboyg.mongodb.net/trali?retryWrites=true&w=majority',()=>{
    console.log("DB Connected")
})

app.use(cors())
app.use(express.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/registration', function (req, res) {

bcrypt.hash(req.body.password, 10, function(err, hash) {
    console.log(hash)
    let user = {
        name: req.body.name,
        email: req.body.email,
        password: hash
    }
    const userDB = new User(user)
    userDB.save()
});

})

app.post("/login",async (req,res)=>{
    console.log(req.body.email)
    const data = await User.find({email: req.body.email})
    console.log(data)
    if(data[0]){
        bcrypt.compare(req.body.password, data[0].password, function(err, result) {
            if(result){
                res.send({msg: "Account Found"})
            }else{
                res.send({msg: "Account Not Found"})
            }
        });
    }else{
        res.send({msg: "Email Not Found"})
    }
    
})

app.get("/logo",function(req,res){
    res.send(logoData)
})

app.get("/banner",function(req,res){
    res.send(bannerData)
})

app.get("/deal",function(req,res){
    res.send(dealData)
})

app.get("/products",function(req,res){
    res.send(productData)
})

app.get("/feature",function(req,res){
    res.send(featureData)
})

app.listen(8000,()=>{
    console.log("Server Running on nport 8000")
})

