import { Link } from "react-router-dom";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../features/productSlice";


export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="font-bold text-lg">FlexiHub</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/products" className="hover:underline">Products</Link>
      </div>
    </nav>
  );
}
