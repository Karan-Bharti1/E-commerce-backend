# E-commerce-backend
# Elite Loom 


Elite Loom is a e-commerce clothing platform based on MERN Stack.This is backend code for Elite loom.
[For Frontend Code Refer](https://github.com/Karan-Bharti1/Elite-loom-Frontend?tab=readme-ov-file)

## Author

- [@Karan-Bharti1](https://github.com/Karan-Bharti1)



## 🚀 About Me
Hi there! 👋.
I am currently learning Full Stack Web Development with a focus on the MERN stack (MongoDB, Express.js, React, and Node.js). I'm passionate about building dynamic, user-friendly web applications and continuously improving my skills.



## Tech Stack

**Client:** React, Bootstrap

**Server:** Node, Express,Mongoose 

##Key API'S


- API to get all Products Data 
- APT to get product data by Id
- API to get all product data by category Id
- API to get all categories data
- API to post new Product data
- API to post new Category data
- API to update and post product data
- API to delete product from databse
- API to Add new item in cart
- API to get all items in cart
- API to find cart item by id and delete it
- API to delete all items in cart
- API to find cart item by id and update
- API to post new wishlist data
- API to get all wishlist data
- API to find wishlist item by id and delete it
- API to get wishlist data by Id
- API to post new address data
- API to find address data by id and update it
- API to find address data by id and delete it
- API to delete all address data
- API to get all address data
- API to post new orders data
- API to get all orders data
- API to get order by order Id


## Mongoose Model for the API's

#Products
```javascript
const mongoose=require('mongoose')
const ProductSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
sizes:[{type:String,
    required:true}
],
ratings: {type:Number,
    required:"true",
    min:0,
    max:5
},
imgURL:{
    type:String,
    required:true
},
category:{type: mongoose.Schema.Types.ObjectId,ref:"Category"},
gender:{
    type:"String",
    enum:["male","female","unisex"]
},
brand:{
type:String,
required:true
},
tagline:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
discountPercentage:{
    type:Number,
    required:true
},
features:[{
    type:String,
    required:true
}],
details:[{
    type:String,
    required:true
}],
reviews:[{
    type:String
}],
exchangePolicy:{
    type:"String"
}
},{
    timestamps:true
})
const Product=mongoose.model('Product',ProductSchema)
module.exports=Product
