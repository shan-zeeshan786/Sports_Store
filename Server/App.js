const express = require('express')
const app = express();
const cors = require('cors')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Authenticate = require("./middleware/authenticate")
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));



const mongoose = require('mongoose')

const mongoUrl = "mongodb://Shanalam:Shanalam@ac-v2cmpud-shard-00-00.cgpxasb.mongodb.net:27017,ac-v2cmpud-shard-00-01.cgpxasb.mongodb.net:27017,ac-v2cmpud-shard-00-02.cgpxasb.mongodb.net:27017/?ssl=true&replicaSet=atlas-101r9o-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose.connect(mongoUrl, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to mongodb")
}).catch((e) => {
    console.log(`Connection failed & ${e}`)
})

/// User data //////
require("./Schema/Users_data");
const User = mongoose.model("Users_data");

//////Product data /////
require('./Schema/Product');
const Products = mongoose.model("Products_data")

// Cart///
require('./Schema/Cart')
const Cart = mongoose.model("Cart_data")

// order ///
require('./Schema/Orders')
const Orders = mongoose.model('Orders_data');




app.post('/signup', async (req, res) => {
    const { Email, Password, Firstname, Secondname, UserName, Mobile } = req.body;
    try {

        const Emailexist = await User.findOne({ Email: Email })
        if (Emailexist) {
            console.log("User exist")
            return res.status(422).json({ error: "Email already exist" })
        }


        User.create({
            Email,
            Firstname,
            Lastname: Secondname,
            Username: UserName,
            Password,
            Phone: Mobile
        });

        res.send({ status: "ok" })
    } catch (error) {
        console.log(`signUp Catch error_line-68:${error}`)
        res.send({ status: error })

    }
})

app.post("/signin", async (req, res) => {
    let token = null;
    try {
        const { Email, Password } = req.body;

        const user = await User.findOne({ Email: Email });

        if (user) {


            if (Password == user.Password) {
                token = await user.generateAuthToken();
                // console.log(token);

                // Add to cookie //
                await res.cookie('jwtoken', token, {
                    // expires:new Date(Date.now()+25892000000),
                    httpOnly: true,

                });



                res.json({ Token: token })
                // res.send(token);
            } else {
                res.status(400).json({ error: "Wrong Credentials" })
                console.log("Wrong Credentials")
            }
        } else {
            res.status(400).json({ error: "User Not found" })
        }
        // console.log(user);
    } catch (error) {
        console.log(`signIn Catch error :${error}`)
    }
})

app.get('/list', Authenticate, async (req, res) => {
    const User_data = req.rootUser;
    const AllProductData = await Products.find();
    const cart=await Cart.findOne({_id:User_data._id})
    var CartLength=0;
    if(cart){
        CartLength=cart.Products.length;
    }

    const AllData = {
        User_data,
        AllProductData,
        CartLength
    }
    res.send(AllData)
})

app.get('/viewprod/:id', Authenticate, async (req, res) => {
    const id = req.params.id;
    const find = await Products.findOne({ _id: id })
    const User_data = req.rootUser;
    const cart=await Cart.findOne({_id:User_data._id});
    var CartLength=0;
    if(cart)CartLength=cart.Products.length
    const AllData = {
        User_data,
        find,
        CartLength
    }
    res.send(AllData);

})

app.post('/cart', async (req, res) => {
    console.log(req.body)
    try {
        const { _id, prod_id, Quantity } = req.body;

        // Find the cart based on the _id
        const cart = await Cart.findOne({ _id });
        console.log(`user_line-142 :${cart}`)
        if (cart) {
            // If the cart already exists, find the product in the Products array
            const product = cart.Products.find((p) => p._id === prod_id);

            if (product) {
                // If the product exists, update its quantity
                product.Quantity += Quantity;
            } else {
                // If the product does not exist, add it to the Products array
                cart.Products.push({ _id: prod_id, Quantity });
            }

            // Save the updated cart
            await cart.save();
        } else {
            // If the cart does not exist, create a new cart and add the product to it
            const newCart = new Cart({
                _id,
                Products: [{ _id: prod_id, Quantity }],
            });

            // Save the new cart
            await newCart.save();
        }

        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/CartProd', Authenticate, async (req, res) => {
    try {
        const User_data = req.rootUser;
        const _id = User_data._id;
        const cart = await Cart.findOne({ _id });
        const AllProductData = await Products.find();  /// Extracting all products
        var CartLength=0;
        if (cart) {
            const All = cart.Products;
            CartLength=All.length;
            var products = [];
            All.map((pro) => {
                // Find the product with the matching _id from AllProductData
                const product = AllProductData.find((item) => item._id === pro._id);
                if (product) {
                    const element = {
                        _id: pro._id,
                        image: product.image,
                        Quantity: pro.Quantity,
                        Price: product.price
                    };
                    products.push(element);
                }
            });

            const AllData = {
                User_data,
                products,
                CartLength
            };
            res.send(AllData);
        } else {
            res.send({
                message: "No data found"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/CartOrder', async (req, res) => {
    try {

        const { user_id, _id, Address, Mobile, BillAmount, Quantity, DeliveryDate } = req.body;
        //  const user=await User.findById({_id:user_id});

        const orderList = await Orders.findById({ _id: user_id });
        const prod = {
            _id,
            DeliveryDate,
            Address,
            Mobile,
            BillAmount,
            Quantity
        }
        if (orderList) {
            orderList.Products.push(prod);
            await orderList.save();
        } else {

            const order = new Orders({
                _id: user_id,
                Products: [prod]
            });
            await order.save();
        }

        try {
            const cart = await Cart.findOneAndUpdate(
                { _id: user_id },
                { $pull: { Products: { _id } } },
                { new: true }
            );
        } catch (error) {
            console.log(`error in line 292:${error}`)
            res.status(500).send({ error: 'Internal Server Error.' });
        }

        res.status(200).json({ message: 'Product added to order successfully' });

    } catch (error) {
        console.log(`CartOrder_line:256 ${error}`)
    }
})

app.get('/Home', Authenticate, async (req, res) => {
    var User_data = null
    try {
        User_data = req.rootUser;
        console.log(User_data)
        res.send(User_data)
    } catch (error) {
        console.log(`${__filename}:184 ${error}`);

    }
})

app.get('/Order', Authenticate, async (req, res) => {
    try {
        const User_data = req.rootUser;
        const _id = User_data._id;
        const orderList = await Orders.findOne({ _id });
        const cart=await Cart.findOne({_id:User_data._id})
        var CartLength=0;
        if(cart){
            CartLength=cart.Products.length;
        }
        const AllProductData = await Products.find();
        //    console.log(orderList["Products"])
        if (orderList) {
            const AllData = {
                "Products": orderList["Products"],
                AllProductData,
                CartLength
            }
            return res.status(200).json(AllData)
        } else {
            return res.status(404).json({ message: "Not Ordered Yet",CartLength })
        }
    } catch (error) {
        console.log(`Error_line307: ${error}`)
    }
})



app.delete('/items/:id', Authenticate, async (req, res) => {
    const itemId = req.params.id;
    const User_data = req.rootUser;
    const _id = User_data._id;

    try {
        const cart = await Cart.findOneAndUpdate(
            { _id },
            { $pull: { Products: { _id: itemId } } },
            { new: true }
        );

        if (cart) {
            res.send({ message: `Item with ID ${itemId} has been removed.` });
        } else {
            res.status(404).send({ error: 'Cart not found.' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error.' });
    }
});







app.listen(5000, () => {
    console.log("Server Started on port 5000")
})