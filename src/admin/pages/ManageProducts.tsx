import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";

interface Product {
  id: number;
  cate_name: string;
  cate_image: string;
  cate_description: string;
}

function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formdata, setFormdata] = useState<Product>({
    id: 0,
    cate_name: "",
    cate_image: "",
    cate_description: ""
  });

  // Fetching data
  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/categories");
      setProducts(res.data);
    } catch{
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Deleting data
  const deleteData = async (id: number) => {
    swal({
      title: "Are you sure?",
      text: "This will be deleted!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (ok) => {
      if (ok) {
        try {
          await axios.delete(`http://localhost:3000/categories/${id}`);
          toast.success("Deleted");
          getData();
        } catch  {
          toast.error("Delete failed");
        }
      }
    });
  };

  // Editing product
  const editProduct = async (id: number) => {
    try {
      const res = await axios.get(`http://localhost:3000/categories/${id}`);
      setFormdata({
        id: res.data.id,
        cate_name: res.data.cate_name,
        cate_image: res.data.cate_image,
        cate_description: res.data.cate_description
      });
    } catch {
      toast.error("Failed to load");
    }
  };

  // Form input change handler
  const changeHandel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  // Form submit handler
  const submitHandel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formdata.cate_name || !formdata.cate_image || !formdata.cate_description) {
      toast.error("All fields are required.");
      return;
    }

    try {
      await axios.patch(
        `http://localhost:3000/categories/${formdata.id}`,
        formdata
      );
      swal("Updated!", "Successfully updated", "success");
      getData();

      // Resetting form data
      setFormdata({
        id: 0,
        cate_name: "",
        cate_image: "",
        cate_description: ""
      });

      // Close modal
    const closeButton = document.querySelector(".btn-close") as HTMLElement;
      if (closeButton) closeButton.click();
    } catch  {
      toast.error("Update failed");
    }
  };

  return (
    <div className="container py-4">
      <h3 className="text-center mb-4">Manage Categories</h3>
      <table className="table table-bordered text-center">
        <thead className="table-success">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.cate_name}</td>
              <td>
                <img
                  src={item.cate_image}
                  width="60"
                  height="60"
                  style={{ objectFit: "cover" }}
                  alt={item.cate_name}
                />
              </td>
              <td>{item.cate_description}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => deleteData(item.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onClick={() => editProduct(item.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <div className="modal fade" id="editModal" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={submitHandel}>
              <div className="modal-header">
                <h5>Edit Category</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  name="cate_name"
                  value={formdata.cate_name}
                  onChange={changeHandel}
                  placeholder="Category Name"
                />
                <input
                  className="form-control mb-2"
                  name="cate_image"
                  value={formdata.cate_image}
                  onChange={changeHandel}
                  placeholder="Image URL"
                />
                <input
                  className="form-control mb-2"
                  name="cate_description"
                  value={formdata.cate_description}
                  onChange={changeHandel}
                  placeholder="Enter your Description"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageProducts;
