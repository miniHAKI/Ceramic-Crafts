import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Select, Input, message, Spin } from "antd";
import {
  ShoppingCartOutlined,
  CreditCardOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { motion } from "framer-motion";

const { Option } = Select;

const ProductDetail = () => {
  const [product, setProduct] = useState("");
  const [loading, setloading] = useState(false);
  const { id } = useParams();
 

  const getProductByID = async () => {
    setloading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setloading(false);

      if (response?.data?.error === false) {
        setProduct(response?.data?.product);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Unable to get product.";
      console.log("Error getting product:", error);
      setloading(false);
    }
  };

  useEffect(() => {
    getProductByID();
  }, []);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [engravingText, setEngravingText] = useState("");

  const handleAddToCart = () => {
    message.success("Added to cart!");
  };

  const handleBuyNow = () => {
    message.info("Proceeding to checkout...");
  };

  const colors = ["Beige", "Brown", "Clay", "Ivory"];
  const sizes = ["Small", "Medium", "Large"];

  if (loading) {
    return (
      <div className="flex justify-center text-black items-center h-64">
        <Spin size="large" />
      </div>
    );
  } else if (!product || Object.keys(product).length === 0) {
    return (
      <div className="text-center text-red-500 text-xl py-10">
        Product not found.
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto px-4 py-10">
      {/* Back Button and Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-10"
      >
        {/* Back to Home Button - only visible on lg and up */}
        <Link to="/" className="hidden lg:block">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-[#A37B73] hover:text-white bg-[#FFF7ED] border border-[#f5d7c4] hover:bg-[#A37B73] transition-colors px-4 py-2 rounded-full shadow-sm"
          >
            <ArrowLeftOutlined />
            <span className="font-medium">Home</span>
          </motion.div>
        </Link>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#A37B73] text-center lg:text-right w-full">
          Cart
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Animated Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-[500px] object-contain rounded-lg shadow"
            whileHover={{ scale: 1.03 }}
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="p-6 bg-[#F7E7CE] rounded-xl shadow-md"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl font-bold text-[#A37B73] mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {product.name}
          </motion.h2>

          <div className="text-xl text-[#A37B73] font-semibold mb-2">
            ${product.price.toFixed(2)}
          </div>

          <p className="mb-2 text-gray-600">
            <span className="font-semibold">Description:</span>{" "}
            {product.description}
          </p>
          <p className="mb-2 text-gray-600">
            <span className="font-semibold">Material:</span> {product.material}
          </p>
          <p className="mb-6 text-gray-600">
            <span className="font-semibold">Estimated Delivery:</span> 5–7
            business days
          </p>

          {/* Color Select */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Select Color:
            </label>
            <Select
              value={selectedColor}
              onChange={setSelectedColor}
              placeholder="Choose a color"
              className="w-full"
            >
              {colors.map((color) => (
                <Option key={color} value={color}>
                  {color}
                </Option>
              ))}
            </Select>
          </div>

          {/* Size Select */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Select Size:
            </label>
            <Select
              value={selectedSize}
              onChange={setSelectedSize}
              placeholder="Choose a size"
              className="w-full"
            >
              {sizes.map((size) => (
                <Option key={size} value={size}>
                  {size}
                </Option>
              ))}
            </Select>
          </div>

          {/* Engraving Input */}
          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-1">
              Text Engraving:
            </label>
            <Input
              value={engravingText}
              onChange={(e) => setEngravingText(e.target.value)}
              placeholder="Type your custom engraving here"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                className="bg-[#A37B73] border-none text-white hover:opacity-90 w-full"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button
                type="default"
                icon={<CreditCardOutlined />}
                className="border-[#A37B73] text-[#A37B73] hover:bg-[#FFE4C4] w-full"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
