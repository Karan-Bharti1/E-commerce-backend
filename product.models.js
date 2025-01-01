const mongoose=require('mongoose')
const ProductSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
sizes:[{type:String,
    required:true}
],
ratings: {type:Number},
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
}]
},{
    timestamps:true
})
const Product=mongoose.model('Product',ProductSchema)
module.exports=Product