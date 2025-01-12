const mongoose=require('mongoose')
const AddressSchema=new mongoose.Schema({
recieversName:{
    type:String,
    required:true
},
recieversMobile:{
    type:String,
    required:true
},
pincode:{
    type:String,
    required:true
},
addressline1:{
    type:String,
    required:true
},addressline2:{
    type:String,
    required:true
},
city:{
    type:String,
    required:true
},
country:{
    type:String,
    required:true
}
},{
    timestamps:true
})
const Address=mongoose.model("Address",AddressSchema)
module.exports=Address
