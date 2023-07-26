const mongoose=require('mongoose')

const ProductsSchema=new mongoose.Schema(
    {
        "_id": Number,
        "title": String,
        "isNew": Boolean,
        "oldPrice": String,
        "price": Number,
        "description":String,
        "image": String,
        "rating": Number
    },
    {
      collection:"Products_data"
    }
)

mongoose.model("Products_data",ProductsSchema);