import express from "express";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { productModel } from "../models/product.models.js";
dotenv.config();

async function createProduct(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Product image is required",
      });
    }
    const {
      productImage,
      productName,
      productPrice,
      productDecsription,
      category,
      stock,
    } = req.body;

    const parsedProductPrice =
      productPrice !== undefined ? Number(productPrice) : productPrice;
    const parsedStock = stock !== undefined ? Number(stock) : stock;

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "E-commerce1",
    });

    const products = await productModel.create({
      productImage: result.url,
      productName,
      productPrice: parsedProductPrice,
      productDecsription,
      category,
      stock: parsedStock,
    });

    res.status(200).json({
      message: "Product created Successfully",
      products: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await productModel.find({});

    res.status(200).json({
      message: "Product Fetched Successfullt",
      products: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const id = req.params.id;

    const product = await productModel.findByIdAndDelete({ _id: id });

    if (!product.deletedCount || product.deletedCount === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product Successfully deleted.",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function updateProduct(req, res) {
  try {
    const id = req.params.id;
    const {
      productImage,
      productName,
      productPrice,
      productDecsription,
      category,
      stock,
    } = req.body;

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "E-commerce1",
    });

    const update = await productModel.findByIdAndUpdate(
      id,
      {
        productImage: result.url,
        productName,
        productPrice,
        productDecsription,
        category,
        stock,
      },
      { new: true },
    );

    res.status(200).json({
      message: "Product updated successfully",
      products: update,
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

export default {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
};
