import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";

type Product = {
  id: string;
  pro_name: string;
  pro_price: string;
  pro_discount: string;
  pro_description: string;
  pro_catogery: string;
  pro_stock: string;
  pro_ratting: string;
  pro_image: string;
  pro_status: string;
  pro_createat: string;
};

function ManageCategory() {
  const [data, setData] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // FETCH
  const getData = async () => {
    const res = await axios.get("https://reactrepo-1l35.onrender.com/addcategories");
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  // DELETE
  const handleDelete = async (id: string) => {
    const confirm = await swal({
      title: "Are you sure?",
      text: "Delete this product?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    });

    if (confirm) {
      await axios.delete(`https://reactrepo-1l35.onrender.com/addcategories/${id}`);
      getData();
    }
  };

  // FILTER + SEARCH
  const filteredData = data.filter((item) => {
    const matchSearch = item.pro_name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || item.pro_catogery === filter;

    return matchSearch && matchFilter;
  });

  // PAGINATION LOGIC
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // UNIQUE CATEGORY LIST
  const categories = [
    "All",
    ...new Set(data.map((item) => item.pro_catogery)),
  ];

  return (
    <div className="container py-4">
      <h3 className="text-center mb-4">Manage Category</h3>

      {/* SEARCH + FILTER */}
      <div className="d-flex gap-3 mb-3">
        <input
          type="text"
          placeholder="Search by name..."
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-control"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {categories.map((cat, index) => (
            <option key={index}>{cat}</option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.pro_name}</td>
              <td>{item.pro_price}</td>
              <td>{item.pro_catogery}</td>
              <td>{item.pro_stock}</td>

              <td>
                <img src={item.pro_image} width="50" />
              </td>

              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="d-flex justify-content-center gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`btn ${
              currentPage === i + 1 ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ManageCategory;
