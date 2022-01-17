import express from "express";
import fileUpload from "../middleware/file-upload.js";
import Product from "../models/products.js";
import fs from "fs";

const productRouter = express.Router();

productRouter.get("/get", async (req, res, next) => {
  const result = await Product.find().exec();
  if (result) {
    res.json(result);
  } else {
    res
      .status(404)
      .send({ message: "Something went wrong. Please try later." });
  }
});

productRouter.post(
  "/post",
  fileUpload.single("image"),
  async (req, res, next) => {
    // console.log("file",req)
    const newProduct = new Product({
      name: req.body.name,
      sizes: [38, 39, 40, 42, 44],
      styleCode: req.body.styleCode,
      brand: req.body.brand,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      image: req.file !==undefined ? req.file.path: "uploads/dummy.jpg",
    });
    const createdProd = await newProduct.save();
    if (createdProd) {
      res.send({ message: "Product created" });
    } else {
      res.status(500).send({ message: "Product cannot be created." });
    }
  }
);

productRouter.put("/put/:id", async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.styleCode = req.body.styleCode;
    product.category = req.body.category;
    product.brand = req.body.brand;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    product.image = req.body.image;
  }
  const updatedProd = await product.save();
  if (updatedProd) {
    res.send({ message: "Product updated" });
  } else {
    res.status(500).send({ message: "Product not found" });
  }
});

productRouter.delete("/delete/:id", async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    console.log("image delete", product.image)
    fs.unlink(product.image, (err) => {
      console.log(err);
    });
    const deletedProduct = await product.remove();
    res.send({ message: "Product deleted" });
  } else {
    res.status(500).send({ message: "Product not found" });
  }
});

export default productRouter;
