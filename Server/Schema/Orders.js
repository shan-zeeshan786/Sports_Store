const mongoose=require('mongoose')

const OrderSchema=new mongoose.Schema(
    {
        "_id": String,
        "Products":[
            {
                "_id":String,
                "DeliveryDate":Date,
                "Address":String,
                "Mobile":Number,
                "BillAmount":Number,
                "Quantity":Number
                

            }
        ],
        
    },
    {
      collection:"Orders_data"
    }
)

mongoose.model("Orders_data",OrderSchema);