import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";

function AddCategory() {
  const [formdata, setFormdata] = useState({
    id: "",
    pro_name: "",
    pro_price: "",
    pro_discount: "",
    pro_description: "",
    pro_catogery: "",
    pro_stock: "",
    pro_ratting: "",
    pro_image: "",
    pro_status: "",
    pro_createat: "",
  });

  // CHANGE HANDLER
  const changeHandel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  // VALIDATION
  function validation() {
    if (!formdata.pro_name) return toast.error("Name required"), false;
    if (!formdata.pro_price) return toast.error("Price required"), false;
    if (!formdata.pro_discount) return toast.error("Discount required"), false;
    if (!formdata.pro_description) return toast.error("Description required"), false;
    if (!formdata.pro_catogery) return toast.error("Category required"), false;
    if (!formdata.pro_stock) return toast.error("Stock required"), false;
    if (!formdata.pro_ratting) return toast.error("Rating required"), false;
    if (!formdata.pro_image) return toast.error("Image required"), false;
    if (!formdata.pro_status) return toast.error("Status required"), false;
    if (!formdata.pro_createat) return toast.error("Date required"), false;

    return true;
  }

  // SUBMIT
  const submitHandel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validation()) return;

    try {
      const res = await axios.post("http://localhost:3000/addcategories", {
        ...formdata,
        id: Date.now().toString(),
      });

      console.log(res);

      swal("Success!", "Category added successfully!", "success");

      // RESET
      setFormdata({
        id: "",
        pro_name: "",
        pro_price: "",
        pro_discount: "",
        pro_description: "",
        pro_catogery: "",
        pro_stock: "",
        pro_ratting: "",
        pro_image: "",
        pro_status: "",
        pro_createat: "",
      });

    } catch (error) {
      console.log(error);
      toast.error("API Error!");
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "700px" }}>
        <h4 className="mb-3 text-center">Add Category</h4>

        <form onSubmit={submitHandel}>

          <input
            type="text"
            name="pro_name"
            placeholder="Category Name"
            value={formdata.pro_name}
            onChange={changeHandel}
            className="form-control mb-3"
          />

          <input
            type="number"
            name="pro_price"
            placeholder="Price"
            value={formdata.pro_price}
            onChange={changeHandel}
            className="form-control mb-3"
          />

          <input
            type="number"
            name="pro_discount"
            placeholder="Discount"
            value={formdata.pro_discount}
            onChange={changeHandel}
            className="form-control mb-3"
          />

          <input
            type="text"
            name="pro_description"
            placeholder="Description"
            value={formdata.pro_description}
            onChange={changeHandel}
            className="form-control mb-3"
          />

          <input
            type="text"
            name="pro_catogery"
            placeholder="Category Type"
            value={formdata.pro_catogery}
            onChange={changeHandel}
            className="form-control mb-3"
          />

          <input
            type="number"
            name="pro_stock"
            placeholder="Stock"
            value={formdata.pro_stock}
            onChange={changeHandel}
            className="form-control mb-3"
          />

          <input
            type="text"
            name="pro_ratting"
            placeholder="Rating"
            value={formdata.pro_ratting}
            onChange={changeHandel}
            className="form-control mb-3"
          />

          <input
            type="url"
            name="pro_image"
            placeholder="Image URL"
            value={formdata.pro_image}
            onChange={changeHandel}
            className="form-control mb-3"
          />

          <input
            type="text"
            name="pro_status"
            placeholder="Status"
            value={formdata.pro_status}
            onChange={changeHandel}
            className="form-control mb-3"
          />

          <input
            type="date"
            name="pro_createat"
            value={formdata.pro_createat}
            onChange={changeHandel}
            className="form-control mb-3"
          />

          <button className="btn btn-success w-100">
            Submit
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddCategory;
