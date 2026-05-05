import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Category = {
  id: number;
  cate_name: string;
  cate_image: string;
  cate_description:string;
};

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState <Category>({
    id: 0,
    cate_name: "",
    cate_image: "",
    cate_description: ""
  });

  // const getSingleData = async () => {
  //   const res = await axios.get(`http://localhost:3000/categories/${id}`);
  //   setFormdata(res.data);
  // };

  useEffect(() => {
    
    // getSingleData();
      const getSingleData = async () => {
     const res = await axios.get(`http://localhost:3000/categories/${id}`);
    setFormdata(res.data);
}
getSingleData();
}, []);

  const changeHandel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  const submitHandel = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:3000/categories/${id}`,
      formdata
    );

    toast.success("Edit successfully ");

    setTimeout(() => {
      navigate("/ManageCategories");
    }, 1500);
  };

  return (
    <div className="container mt-4">
      <h3>Edit Category</h3>

      <form onSubmit={submitHandel}>

        <input
          type="text"
          name="cate_name"
          className="form-control mb-2"
          value={formdata.cate_name}
          onChange={changeHandel}
        />

        <input
          type="text"
          name="cate_image"
          className="form-control mb-2"
          value={formdata.cate_image}
          onChange={changeHandel}
        />

        <input
          type="text"
          name="description"
          className="form-control mb-2"
          value={formdata.cate_description}
          onChange={changeHandel}
        />

        <button className="btn btn-success">
          Update
        </button>

      </form>

      <ToastContainer />
    </div>
  );
}

export default EditCategory;


