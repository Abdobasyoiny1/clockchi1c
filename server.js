const express=require('express');
const mongoose=require('mongoose');

const app=express();
app.use(express.json());
app.use(express.static('public'));

mongoose.connect("mongodb+srv://admin:PUT_PASSWORD@cluster0.mongodb.net/clockchic")
.then(()=>console.log('DB Connected'))
.catch(err=>console.log(err));

const Product=mongoose.model('Product',{name:String,price:String,images:[String]});

app.post('/api/products',async(req,res)=>{
 await new Product(req.body).save();
 res.send("saved");
});

app.get('/api/products',async(req,res)=>{
 res.json(await Product.find());
});

app.listen(3000,()=>console.log('Running'));
