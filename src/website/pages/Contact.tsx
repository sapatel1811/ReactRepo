import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";

function Contact() {
  const [formdata, setFormdata] = useState({
    id: "",
    name: "",
    email: "",
    mobile: "",
    message: ""
  });


  const changeHandle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormdata({
      ...formdata,
      id: new Date().getTime().toString(),
      [e.target.name]: e.target.value
    });
  };


  const validation = () => {
  const nameRegex = /^[a-zA-Z\s]{2,30}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[6-9]\d{9}$/;

  // Name
  if (!formdata.name) {
    toast.error("Name is required");
    return false;
  }
  if (!nameRegex.test(formdata.name)) {
    toast.error("Invalid name (only letters allowed)");
    return false;
  }

  // Email
  if (!formdata.email) {
    toast.error("Email is required");
    return false;
  }
  if (!emailRegex.test(formdata.email)) {
    toast.error("Invalid email format");
    return false;
  }

  // Mobile
  if (!formdata.mobile) {
    toast.error("Mobile is required");
    return false;
  }
  if (!mobileRegex.test(formdata.mobile)) {
    toast.error("Invalid mobile number");
    return false;
  }

  // Message
  if (!formdata.message) {
    toast.error("Message is required");
    return false;
  }
  if (formdata.message.length < 10) {
    toast.error("Message must be at least 10 characters");
    return false;
  }

  return true;
};

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validation()) {
      try {
        await axios.post(
          "https://sweetmart-563b7-default-rtdb.firebaseio.com/contact.json",
          formdata
        );

        swal("Good job!", "Contact Submitted Successfully!", "success");

        setFormdata({
          id: "",
          name: "",
          email: "",
          mobile: "",
          message: ""
        });

      } catch {
        toast.error("Something went wrong ");
      }
    }
  };

  return (
    <div>
      {/* Map */}
    <iframe
  src="https://www.google.com/maps?q=23.0062,72.5986&z=15&output=embed"
  style={{
    width: "100%",
    height: "400px",
    border: "0",
    borderRadius: "10px"
  }}
  loading="lazy"
></iframe>

      {/* Contact Form */}
      <div className="container py-5">
        <ToastContainer />

        <form className="col-md-9 m-auto" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formdata.name}
                onChange={changeHandle}
                className="form-control mt-1"
              required/>
            </div>

            <div className="col-md-6 mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formdata.email}
                onChange={changeHandle}
                className="form-control mt-1"
              required/>
            </div>
          </div>

          <div className="mb-3">
            <label>Mobile</label>
<input type="text" name="mobile"
              value={formdata.mobile}
              onChange={changeHandle}
              className="form-control mt-1"
            required/>
          </div>

          <div className="mb-3">
            <label>Message</label>
            <textarea
              name="message"
              value={formdata.message}
              onChange={changeHandle}
              className="form-control mt-1"
              rows={5}
            required/>
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-success px-3">
              Let’s Talk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;