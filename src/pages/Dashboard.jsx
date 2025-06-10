// Upgraded Dashboard.jsx with additional features and refined UI
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { FiFilter } from "react-icons/fi";
import { motion } from "framer-motion";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

export default function Dashboard() {
  const { items } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortByPrice, setSortByPrice] = useState("none");

  const filteredProducts = selectedCategory === "all"
    ? items
    : items.filter((item) => item.category === selectedCategory);

  const sortedProducts = [...filteredProducts];
  if (sortByPrice === "asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortByPrice === "desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  const barData = sortedProducts.map((p) => ({
    name: p.title,
    price: p.price,
  }));

  const categoryCount = {};
  items.forEach((product) => {
    categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
  });
  const pieData = Object.entries(categoryCount).map(([name, value]) => ({
    name,
    value,
  }));

  const totalProducts = items.length;
  const totalCategories = Object.keys(categoryCount).length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4 text-blue-700">📊 FlexiHub Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-2xl shadow-md p-4 text-center">
          <div className="text-xl font-semibold text-blue-500">{totalProducts}</div>
          <div className="text-gray-500">Total Products</div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-2xl shadow-md p-4 text-center">
          <div className="text-xl font-semibold text-green-500">{totalCategories}</div>
          <div className="text-gray-500">Categories</div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-2xl shadow-md p-4 text-center">
          <div className="text-xl font-semibold text-purple-500">
            ₹{items.reduce((acc, p) => acc + p.price, 0).toFixed(2)}
          </div>
          <div className="text-gray-500">Total Inventory Value</div>
        </motion.div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div>
          <label className="font-medium mr-2 text-sm">Filter by Category:</label>
          <select
            className="border rounded p-2 text-sm"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="all">All</option>
            {Object.keys(categoryCount).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium mr-2 text-sm">Sort by Price:</label>
          <select
            className="border rounded p-2 text-sm"
            onChange={(e) => setSortByPrice(e.target.value)}
            value={sortByPrice}
          >
            <option value="none">None</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow p-4">
          <h4 className="mb-2 font-semibold">📈 Product Prices</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="price" fill="#8884d8" animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow p-4">
          <h4 className="mb-2 font-semibold">📊 Products by Category</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                label
                animationDuration={800}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
