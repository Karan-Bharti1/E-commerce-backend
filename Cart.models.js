const mongoose=require("mongoose")
const CartSchema=new mongoose.Schema({
selectedSize:{
    type:String,
    required: true
},
quantity:{
    type:Number,
    required:true
},
productDetails:{
    type:mongoose.Schema.Types.ObjectId,ref:"Product",
    required:true
}
},{
    timestamps:true
})
const Cart=mongoose.model("Cart",CartSchema)
modules.export=Cart