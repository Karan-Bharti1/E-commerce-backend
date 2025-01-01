const {initialiseDatabase}=require("./database/database.connect")
initialiseDatabase()
const fs=require("fs")
const Product=require("./product.models")
const jsonData=fs.readFileSync("products.json","utf-8")
const productsData=JSON.parse(jsonData)
function seedProductData(){
    try {
        for(const productData of productsData){
            const newProduct=new Product({
                productName:productData.productName,
                sizes:productData.sizes,
                imgURL:productData.imgURL,
                category:productData.category,
                ratings:productData.ratings,
                gender:productData.gender,
                brand:productData.brand,
                tagline:productData.tagline,
                description:productData.description,
                price:productData.price,
                discountPercentage:productData.discountPercentage,
                features:productData.features,
                details:productData.details,
                reviews:productData.reviews,
                exchangePolicy:productData.exchangePolicy
            })
            newProduct.save()
        }
    } catch (error) {
        console.log("Error while seeding the data: ",error)
    }
}
// seedProductData()