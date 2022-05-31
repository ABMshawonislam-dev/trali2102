const express = require('express')
const bannerData = require('./bannerData')
const logoData = require('./logoData')
const dealData = require('./dealData')
const productData = require('./productData')
const featureData = require('./featureCat')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const User = require('./model/usermodel.js')
const Brand = require('./model/brandModel.js')
const Cat = require('./model/catModel.js')
const Product = require('./model/productModel.js')
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
    if(data[0]){
        bcrypt.compare(req.body.password, data[0].password, function(err, result) {
            if(result){
                res.send({data:data[0],msg:"Account Created Successfully"})
            }else{
                res.send({msg: "Account Not Found"})
            }
        });
    }else{
        res.send({msg: "Email Not Found"})
    }
    
})

app.put('/vendor/:id',(req,res)=>{
        console.log(req.params.id)
       User.findByIdAndUpdate(req.params.id,{isVendor:true},{ returnOriginal: false },function(err,docs){
           if(err){
               console.log(err)
           }else{
               res.send(docs)
           }
       })
       
})  

app.post('/brand',async (req,res)=>{
    console.log(req.body.brand)
    let brnd = await Brand.find({brand:req.body.brand})

    if(brnd){
        res.send(`${req.body.brand} brand name is already exits `)
    }else{
        let brandInfo = {
            brand: req.body.brand
        }
    
        const brand = new Brand(brandInfo)
        brand.save()
        res.send(brand)
    }
    

})

app.get('/brand',async (req,res)=>{
    const data = await Brand.find({})
    res.send(data)
})

app.post('/cat',(req,res)=>{
    console.log(req.body.category)
    let catInfo = {
        category: req.body.category
    }

    const cat = new Cat(catInfo)
    cat.save()
    res.send(cat)

})


app.get('/cat',async (req,res)=>{
    const data = await Cat.find({})
    res.send(data)
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

app.post("/products",function(req,res){
    console.log("hello")
    console.log(req.body)
    let productInfo={
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        brand: req.body.brand,
        brandname: req.body.brandname,
        category: req.body.category,
        categoryname: req.body.categoryname,
        owner: req.body.owner,
    }

    const product = new Product(productInfo)
    product.save()
    res.send("hello")
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

