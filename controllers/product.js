const Product = require("../models/product");
const { makeResponse } = require("../utils/response");
const {
  productRegister,
  productUpdate,
  getProducts,
  getProduct,
  productDelete,
  productFavorite,
} = require("../services/product.service");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const fs = require("fs");


// cloudinary store configuration 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

dotenv.config();

const addProduct = async (req, res) => {
  const result = await productRegister(req.body);
  if (!result) {
    return makeResponse({ res, status: 500, message: "Registration failed" });
  }
  if (result.status) {
    return makeResponse({ res, ...result });
  }
  return makeResponse({
    res,
    status: 200,
    data: result,
    message: "Product registered successfully",
  });
};

const updateProduct = async (req, res) => {
  const result = await productUpdate(req.body);
  if (!result) {
    return makeResponse({ res, status: 500, message: "Update failed" });
  }
  if (result.status) {
    return makeResponse({ res, ...result });
  }
  return makeResponse({
    res,
    status: 200,
    data: result,
    message: "Product updated successfully",
  });
};

const getAllProducts = async (req, res) => {
  const result = await getProducts();
  if (!result) {
    return makeResponse({
      res,
      status: 500,
      message: "Error with getting data",
    });
  }
  if (result.status) {
    return makeResponse({ res, ...result });
  }
  return makeResponse({
    res,
    status: 200,
    data: result,
    message: "Products",
  });
};

const getOneProduct = async (req, res) => {
  const id = req.params.id;
  const result = await getProduct({ id });

  if (!result) {
    return makeResponse({
      res,
      status: 500,
      message: "Error with getting data",
    });
  }
  if (result.status) {
    return makeResponse({ res, ...result });
  }
  return makeResponse({
    res,
    status: 200,
    data: result,
    message: "Product",
  });
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const result = await productDelete({ id });
  if (!result) {
    return makeResponse({ res, status: 500, message: "Delete failed" });
  }
  if (result.status) {
    return makeResponse({ res, ...result });
  }
  return makeResponse({
    res,
    status: 200,
    data: result,
    message: "Product deleted successfully",
  });
};

const getFavoriteProducts = async (req, res) => {
  const result = await productFavorite();
  if (!result) {
    return makeResponse({
      res,
      status: 500,
      message: "Error with getting data",
    });
  }
  if (result.status) {
    return makeResponse({ res, ...result });
  }
  return makeResponse({
    res,
    status: 200,
    data: result,
    message: "Favorite products",
  });
};

const imageUpload = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return makeResponse({
        res,
        status: 400,
        data: res,
        message: "No files were uploaded.",
      });

    const file = req.files.file;
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return makeResponse({
        res,
        status: 400,
        data: res,
        message: "Size too large.",
      });
    }
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);
      return makeResponse({
        res,
        status: 400,
        data: res,
        message: "File format is incorrect.",
      });
    }
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "ProductImages" },
      async (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);
        return res.json({
          message: "image uploaded successfully", url: result.secure_url});
          
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = {
  addProduct,
  updateProduct,
  getAllProducts,
  getOneProduct,
  deleteProduct,
  getFavoriteProducts,
  imageUpload
};
