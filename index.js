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
const readProductDataById=async (productId)=>{
try {
   const productData=await Product.findById(productId).populate("category")
   return productData
} catch (error) {
    throw error
}

}
app.get("/products/:productId",async (req,res) => {
    try {
        const productData=await readProductDataById(req.params.productId)
        if(productData){
            res.status(200).json(productData)

        }else{
            res.status(400).json({error:"Product Not Found"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to get data"})
    }
})
const readDataByCategoryId=async (categoryId)=>{ 
    try {
        const productsData=await Product.find({category:categoryId}).populate("category")
        return productsData
    } catch (error) {
        throw error
    }
}
app.get("/products/category/:categoryId",async (req,res) => {
    try {
        const productsData=await readDataByCategoryId(req.params.categoryId)
        if(productsData){
            res.status(200).json(productsData)
        }else{
            res.status(404).json({error:"Products Not Found"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to get data"})
    }
})
const readAllCategoriesData=async () => {
    try {
      const categoryData=await Category.find()
      return categoryData
    } catch (error) {
        throw error
    }
}
app.get("/categories",async (req,res) => {
    try {
      const categoriesData=await readAllCategoriesData()
      if(categoriesData && categoriesData.length>0){
        res.status(200).json(categoriesData)
      }else{
        res.status(400).json({error:"Categories data not Found"})
      }
    } catch (error) {
        req.status(500).json({error: "Failed to get Categories Data"})
    }
})
const createProductData=async (data) => {
    try {
     const newProductData=new Product(data)
     const saveData=newProductData.save()
     return saveData
    } catch (error) {
        throw error
    }
}
app.post("/products",async (req,res) => {
    try {
   const newData=await createProductData(req.body)
   if(newData){
    res.status(200).json({message: "Data added successfully",newData})
   }
    } catch (error) {
        req.status(500).json({error: "Failed to create Product Data"})
    }
})
const updateProductData=async(productId,dataToBeUpdated)=>{
    try {
      const updatedData=await Product.findByIdAndUpdate(productId,dataToBeUpdated,{new:true})
      return updatedData
    } catch (error) {
        throw error
    }
}
app.post("/products/:productId",async (req,res) => {
    try {
       const updatedData=await updateProductData(req.params.productId,req.body)
       if (updatedData){
res.status(200).json({message:"Data updated Successfully",updatedData})
       }else{
        res.status(400).json({error:"Product  data not Found"})
      }
    } catch (error) {
        req.status(500).json({error: "Failed to update Product Data"})
    }
})
const deleteProductData=async (productId) => {
    try {
      const deletedData=await Product.findByIdAndDelete(productId)
      return deletedData
    } catch (error) {
       throw error
    }
}
app.delete("/products/:productId",async (req,res) => {
    try {
      const deletedData=await deleteProductData(req.params.productId)
      if(deletedData){
        res.status(200).json({message:"Data deleted successfully",deletedData})
      }else{
        res.status(400).json({error:"Product  data not Found"})
      }
    } catch (error) {
        req.status(500).json({error: "Failed to Delete Product Data"})
    }
})
app.listen(PORT,()=>{
    console.log("Server is running on PORT: ",PORT)
})