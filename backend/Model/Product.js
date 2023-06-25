import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    companyName: {
        type: String,
    },
    category: {
        type: String,
    },
    productLink: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    comments: {
        type: [String],
        default: [],
    },
});

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;