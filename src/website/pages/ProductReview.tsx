import axios from "axios";
import type  {  ChangeEvent, FormEvent } from "react";
import {useState} from "react";
import { toast } from "react-toastify";

function ProductReview() {

  const [formdata, setFormdata] = useState({
    name: "",
    rating: "",
    message: "",
    status: "pending"
  });

  const changeHandel = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  const submitHandel = async (e: FormEvent) => {
    e.preventDefault();

    console.log("Submit clicked"); //

    if (!formdata.name || !formdata.rating || !formdata.message) {
      toast.error("All fields required");
      return;
    }

    try {
      const payload = {
        ...formdata,
        id: Date.now().toString(),
        status: "pending"
      };

      await axios.post("http://localhost:3000/reviews", payload);

      toast.success("Review Submitted!");

      setFormdata({
        name: "",
        rating: "",
        message: "",
        status: "pending"
      });

    } catch (error) {
      console.log(error);
      toast.error("API Error!");
    }
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card p-4 shadow">

            <h4 className="text-center mb-3">Product Review</h4>

            <form onSubmit={submitHandel}>

              <input
                className="form-control mb-3"
                name="name"
                placeholder="Your Name"
                value={formdata.name}
                onChange={changeHandel}
              />

              <select
                className="form-control mb-3"
                name="rating"
                value={formdata.rating}
                onChange={changeHandel}
              >
                <option value="">Select Rating</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="2">⭐⭐</option>
                <option value="1">⭐</option>
              </select>

              <textarea
                className="form-control mb-3"
                name="message"
                placeholder="Write review"
                value={formdata.message}
                onChange={changeHandel}
              />

            
              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Submit Review
              </button>

            </form>

          </div>

        </div>
      </div>

    </div>
  );
}

export default ProductReview;