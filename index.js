const {initialiseDatabase}=require('./database/database.connect')
initialiseDatabase()
const express=require("express")
const app=express()
app.use(express.json())
const cors=require('cors')
const corsOptions={
    origin:"*",
    credentials:true,
    optionsSuccessStatus:200
}
app.use(cors(corsOptions))
const Category=require("./category.models")
const Product=require("./product.models")
const PORT=3000
const readAllProducts=async () => {
    try {
       const products=await Product.find().populate("category")
       return products 
    } catch (error) {
        throw error
    }
}
app.get("/products",async (req,res) => {
    try {
        const products =await readAllProducts()
        if(products && products.length>0){
            res.status(200).json(products)
        }
        else{
            res.status(404).json({error:"Products not Found"})
        }
    } catch (error) {
      res.status(500).json({error:"Error while getting products data"})
    }
})

app.listen(PORT,()=>{
    console.log("Server is running on PORT: ",PORT)
})