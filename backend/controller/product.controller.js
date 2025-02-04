import Product from "../models/product.model.js";
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "Please provide all Fields"
        });
    }

    const newProdcut = new Product(product)

    try {
        await newProdcut.save();
        res.status(201).json({
            success: true,
            data: newProdcut
        })
    } catch (error) {
        res.status(500), json({
            success: false,
            message: "Server Error"
        })
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid id"
        });
    }
    try {
        const result = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!result) {
            throw "Product not found"
        }
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Product Not Found"
        })
    }
    return res;
};


export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Product.findByIdAndDelete(id);
        if (!result) {
            throw Error('Product Not Found')
        }
        res.status(200).json({
            success: true,
            message: "Product Deleted"
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Product Not Found"
        })
    }
    return res;
};