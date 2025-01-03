const mongoose=require("mongoose")
const CategorySchema=new mongoose.Schema({
categoryName:{
    type:String,
    required:true
},
categoryImageURL:{
    type:String,
    required:true
}
},{
    timestamps:true
})
const Category=mongoose.model("Category",CategorySchema)
module.exports=Category