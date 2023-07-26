const mongoose=require('mongoose')

const CartSchema=new mongoose.Schema(
    {
        "_id": String,
        "Products":[
            {
                "_id":Number,
                "Quantity":Number
        

            }
        ],
        
    },
    {
      collection:"Cart_data"
    }
)

mongoose.model("Cart_data",CartSchema);