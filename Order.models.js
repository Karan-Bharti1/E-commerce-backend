const mongoose=require('mongoose')
const OrderSchema=new mongoose.Schema({
    address:{
        type:String,
        required:true
    },
    items:[{
        productDetails:{
            type:mongoose.Schema.Types.ObjectId,ref:"Product",
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
            selectedSize:{
                type:Number,
                required:true  
            }
    }]
},{
    timestamps:true
})
const Order=mongoose.model("Order",OrderSchema)
module.exports=Order