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
const Cart=require("./Cart.models")

const Wishlist = require('./wishlist.models')
const Address = require('./address.models')
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
const addNewItemInCart = async (itemData) => {
    try {
        const updatedItem = await Cart.findOneAndUpdate(
            { productDetails: itemData.productDetails, selectedSize: itemData.selectedSize },
            { $inc: { quantity: 1 } }, 
            { upsert: true, new: true } 
        );
        return updatedItem;
    } catch (error) {
        throw error;
    }
};

app.post("/cart", async (req, res) => {
    console.log("Request Body:", req.body); 
    try {
        const { productDetails, selectedSize, quantity } = req.body;
        if (!productDetails || !selectedSize || !quantity) {
            return res.status(400).json({ error: "Invalid request data" });
        }
        const newData = await addNewItemInCart(req.body);
        return res.status(200).json(newData);
    } catch (error) {
        console.error("Error in /cart endpoint:", error.message);
        res.status(500).json({ error: "Failed to add item to cart" });
    }
});

const findCartDataByIdAndUpdate=async(cartId,dataToBeUpdated)=>{
    try {
        const updatedData=await Cart.findByIdAndUpdate(cartId,dataToBeUpdated)
        return updatedData
    } catch (error) {
        throw error
    }
}
app.post("/cart/:cartId",async(req,res)=>{
    try {
      const updatedData=await findCartDataByIdAndUpdate(req.params.cartId,req.body)  
      if(updatedData){
        res.status(200).json(updatedData)
    }else{
        res.status(404).json({error:"Item not found in the cart"})
    }
    } catch (error) {
        res.status(500).json({error:"Failed to update item in the cart"})   
    }
})
const readCartData=async()=>{
    try{
const cartData=await Cart.find().populate("productDetails")

return cartData
    }
    catch (error) {
        throw error
    }
}
app.get("/cart",async (req,res) => {
    try {
        const cartData=await readCartData()
        if(cartData && cartData.length>0){
            res.status(200).json(cartData)
        }else{
            res.status(404).json({error:"Cart Data Not Found"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to get items in cart"})   
    }
})
async function deleteItemsInCartById(itemId){
    try {
      const deletedData=await Cart.findByIdAndDelete(itemId)  
      return deletedData
    } catch (error) {
       throw error 
    }
}
app.delete("/cart/:cartId",async(req,res)=>{
    try {
      const deletedData=await deleteItemsInCartById(req.params.cartId)
      if(deletedData){
res.status(200).json({message:"Cart item deleted successfully"})
      }else{
res.status(404).json({error:"Cart Item Not found"})
      } 
    } catch (error) {
        res.status(500).json({error:"Failed to add data in to the cart"})
    }
})
const addNewProductToWishlist=async(productData)=>{
    try {
      const existingItem=await  Wishlist.findOne({productDetails:productData.productDetails})  
      if(!existingItem){
        const newWishListItem=new Wishlist(productData)
        const saveData=await newWishListItem.save()
        return saveData
      }
    } catch (error) {
        throw error
    }
}
app.post("/wishlist",async(req,res)=>{
    try {
      const newData=await addNewProductToWishlist(req.body)  
      if(newData){
        res.status(200).json(newData)
      }else{
        res.status(404).json({error:"Item already existing in the wishlist"})
      }
    } catch (error) {
        res.status(500).json({error:"Failed to add item to wishlist"})
    }
})
const getWishlistDataByProductDetails=async(productId)=>{
    try {
    const wishlistData=await Wishlist.findOne({productDetails:productId})    
    return wishlistData
    } catch (error) {
throw error        
    }
}
app.get("/wishlist/:productId",async(req,res)=>{
    try {
      const wishlistData=await getWishlistDataByProductDetails(req.params.productId)
      if(wishlistData){
        res.status(200).json(wishlistData)
      }  else{
        res.status(400).json({error:"Item not found"})
      }
    } catch (error) {
        res.status(500).json({error:"Failed to get item from wishlist"})
    }
})
const readAllWishlistData=async()=>{
    try {
      const wishlistData=await Wishlist.find().populate("productDetails")
      return wishlistData  
    } catch (error) {
      throw error  
    }
}
app.get("/wishlist",async(req,res)=>{
    try {
        const wishlistData=await readAllWishlistData()
        if(wishlistData && wishlistData.length>0){
            res.status(200).json(wishlistData)
        }else{
            res.status(404).json({error:"Wishlist Data Not Found"})
        }
    } catch (error) {
      res.status(500).json({error:"Failed to fetch wishlist  data"})  
    }
})
const deleteWishlistDataById=async(wishListId)=>{
    try {
      const deletedData  =await Wishlist.findByIdAndDelete(wishListId)
      return deletedData
    } catch (error) {
        throw error
    }
}
app.delete("/wishlist/:wishlistId",async(req,res)=>{
    try {
        const deletedData=await deleteWishlistDataById(req.params.wishlistId)
        if(deletedData){
            res.status(200).json({message:"Item deleted from wishlist successfully"})
        }else{
            res.status(404).json({error:"Item not found"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to delete wishlist  data"})  
    }
})
const createNewAddress=async (addressData) => {
    try {
      const newData=new Address(addressData)  
      const saveData=await newData.save()
      return saveData
    } catch (error) {
      console.log(error)  
    }
}
app.post("/address",async(req,res)=>{
    try {
      const newData=await createNewAddress(req.body)  
      if(newData){
        res.status(200).json({message:"Address added successfully",newData})
      }
    } catch (error) {
        res.status(500).json({error:"Failed to add address data"})
    }
})
const findAddressDataByIdAndUpdate=async (addressId,updatedData) => {
    try {
        const updateData=await Address.findByIdAndUpdate(addressId,updatedData,{new:true})
        return updateData
    } catch (error) {
        console.log(error)  
    }
}
app.post("/address/:addressId",async(req,res)=>{
    try {
       const updatedData=await findAddressDataByIdAndUpdate(req.params.addressId,req.body)
       if(updatedData){
        res.status(200).json({message:"Address updated successfully",updatedData})
       }else{
        res.status(404).json({error:"Address Not Found"})
       }
    } catch (error) {
        console.error("Error updating address:", error); 
        res.status(500).json({error:"Failed to update address data"})
    }
})
app.listen(PORT,()=>{
    console.log("Server is running on PORT: ",PORT)
})