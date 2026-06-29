const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.static('public')); // ✅ مهم جداً

// ✅ اربط MongoDB (حط الباسورد بتاعك)
mongoose.connect("mongodb+srv://admin:Abdo123456@cluster0.mongodb.net/clockchic")
.then(()=>console.log("DB Connected"))
.catch(err=>console.log(err));

// ✅ Model
const Product = mongoose.model('Product',{
  name:String,
  price:String,
  desc:String,
  category:String,
  images:[String]
});

// ✅ إضافة منتج
app.post('/api/products', async (req,res)=>{
  await new Product(req.body).save();
  res.send("added");
});

// ✅ عرض المنتجات
app.get('/api/products', async (req,res)=>{
  res.json(await Product.find());
});

// ✅ حذف
app.delete('/api/products/:id', async (req,res)=>{
  await Product.findByIdAndDelete(req.params.id);
  res.send("deleted");
});

app.listen(3000, ()=>console.log("Running"));
