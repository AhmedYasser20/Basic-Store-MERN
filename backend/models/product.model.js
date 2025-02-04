import mongoose from "mongoose";

//A schema is a rigid definition of the data involved and their types that will exist in the database
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


//A model in mongoose instead provides an interface to the database, describing accessing data,
const Product = mongoose.model('Product', productSchema);

export default Product;