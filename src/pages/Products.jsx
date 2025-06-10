import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../features/productSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const [formData, setFormData] = useState({ title: "", price: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      toast.error("Fill in title & price");
      return;
    }

    try {
      if (editId) {
        await dispatch(updateProduct({ id: editId, ...formData })).unwrap();
        toast.success("✅ Updated successfully");
      } else {
        await dispatch(addProduct(formData)).unwrap();
        toast.success("✅ Added successfully");
      }
      setEditId(null);
      setFormData({ title: "", price: "" });
    } catch {
      toast.error(editId ? "❌ Update failed" : "❌ Add failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete?")) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
        toast.success("🗑️ Deleted successfully");
      } catch {
        toast.error("❌ Delete failed");
      }
    }
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setFormData({ title: product.title, price: product.price.toString() });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">🛍️ Products</h2>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded shadow mb-8">
        <input type="text" placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border rounded p-2 flex-1 mr-2"
          required
        />
        <input type="number" placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="border rounded p-2 w-32 mr-2"
          required
        />
        <button type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {status === "loading" && <p className="text-center animate-pulse">Loading...</p>}
      {status === "failed" && <p className="text-center text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <div key={p.id} className="bg-white rounded shadow p-4 flex flex-col">
            <div className="font-semibold">{p.title}</div>
            <div>₹{p.price}</div>
            <div className="mt-auto flex gap-2">
              <button onClick={() => handleEdit(p)}
                className="bg-yellow-400 px-2 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


