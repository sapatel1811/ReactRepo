import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import swal from 'sweetalert';

function AddProduct() {

    const [formdata, setFormdata] = useState({
        id: "",
        cate_name: "",
        cate_image: "",
        cate_description: ""
    });

    const changeHandel = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };

    function validation() {
        let ans = true;

        if (formdata.cate_name.trim() === "") {
            toast.error('Category Name Field is required');
            ans = false;
        }

        if (formdata.cate_image.trim() === "") {
            toast.error('Category Image URL Field is required');
            ans = false;
        }

        if (formdata.cate_description.trim() === "") {
            toast.error('Description  Field is required');
            ans = false;
        }

        return ans;
    }

    const submitHandel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validation()) {
        try {
            const res = await axios.post(
                "https://reactrepo-1l35.onrender.com/categories",
                {
                    ...formdata,
                    id: new Date().getTime().toString()
                }
            );

            console.log(res);

            swal("Good job!", "Category added Successfully!", "success");

            setFormdata({
                id: "",
                cate_name: "",
                cate_image: "",
                cate_description: ""
            });

        } catch (error) {
            console.log(error);
            toast.error("API Error!");
        }
    }
};
    return (
        <div className="container mt-5">

            <h2>Add Categories</h2>

            <form onSubmit={submitHandel}>

                <input
                    type="text"
                    name="cate_name"
                    placeholder="Enter Category Name"
                    value={formdata.cate_name}
                    onChange={changeHandel}
                    className="form-control mb-3"
                />

                <input
                    type="url"
                    name="cate_image"
                    placeholder="Enter Image URL"
                    value={formdata.cate_image}
                    onChange={changeHandel}
                    className="form-control mb-3"
                />


<input type="text" name="cate_description" placeholder="Enter description Filds" value={formdata.cate_description}
onChange={changeHandel} className="form-control mb-3"/>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>

            </form>

        </div>
    );
}

export default AddProduct;
