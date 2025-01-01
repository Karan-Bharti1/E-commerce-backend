const {initialiseDatabase}=require("./database/database.connect")
initialiseDatabase()
const Category=require('./category.models')
const fs=require("fs")
const jsonData=fs.readFileSync("category.json","utf8")
const categoryData=JSON.parse(jsonData)
function seedCategoryData(){
    try {
      for(const category of categoryData)  {
        const newCategory=new Category({
            categoryName:category.categoryName,
            categoryImageURL:category.categoryImageURL
        })
        newCategory.save()
      }
    } catch (error) {
        console.log("Error while seeding the data: ",error)
    }
}
// seedCategoryData()