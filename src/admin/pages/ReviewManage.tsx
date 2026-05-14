import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ReviewManage() {

  const [reviews, setReviews] = useState <any[]>([]);

  const getData = async () => {
    const res = await axios.get("https://reactrepo-1l35.onrender.com/reviews");
    setReviews(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteReview = async (id: string) => {
    await axios.delete(`https://reactrepo-1l35.onrender.com/reviews/${id}`);
    toast.success("Deleted");
    getData();
  };

  const approveReview = async (id: string) => {
    await axios.patch(`https://reactrepo-1l35.onrender.com/reviews/${id}`, {
      status: "approved"
    });
    toast.success("Approved");
    getData();
  };

  return (
    <div className="container mt-5">

      <h3>Manage Reviews</h3>

      <table className="table table-bordered text-center">

        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Message</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {reviews.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{"⭐".repeat(item.rating)}</td>
              <td>{item.message}</td>
              <td>
                {item.status === "pending" ? (
                  <span className="text-warning">Pending</span>
                ) : (
                  <span className="text-success">Approved</span>
                )}
              </td>

              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => approveReview(item.id)}
                >
                  Approve
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteReview(item.id)}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default ReviewManage;
