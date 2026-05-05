import { Outlet, Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function DashboardLayout() {
  const [dark, setDark] = useState(false);
    const [open, setOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <div className={dark ? "bg-dark text-white" : "bg-light text-dark"} style={{ minHeight: "100vh" }}>

      {/* Navbar */}
      <nav className="navbar px-3 bg-success text-white">
        <h5>Admin Dashboard</h5>

        <button className="btn btn-light btn-sm" onClick={() => setDark(!dark)}>
          Toggle Theme
        </button>
      </nav>

      <div className="container-fluid">
        <div className="row">

          {/* Sidebar */}
<div className="col-md-2 p-3 border-end">
<h6>Menu</h6>

<ul className="nav flex-column gap-2">

  <li className="nav-item">
    <Link to="/dashboard"
 className="nav-link d-flex align-items-center gap-2 text-dark px-3 py-2 rounded">
      <span>Dashboard</span>
    </Link>
  </li>

    <li className="nav-item">
    <button className="btn w-100 text-start d-flex   text-dark  justify-content-between align-items-center nav-link"
        onClick={() => setOpen(!open)}
      >
        <span>Product</span>
        <span className="fw-bold">{open ? "−" : "+"}</span>
      </button>

      {/* DROPDOWN MENU */}
      <div className={`collapse ${open ? "show" : ""}`}>

        <ul className="list-unstyled ps-3">

          <li>
            <NavLink
              to="/dashboard/AddProducts"
              className="nav-link py-1  text-dark "
            >
           Add Products
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/ManageProducts"
              className="nav-link py-1  text-dark "
            >
             Manage Products
            </NavLink>
          </li>

          <li>
          <NavLink to="/dashboard/review-manage" className="nav-link py-1  text-dark ">
           Manage Reviews
          </NavLink>
          </li>

        </ul>
      </div>
    </li>



{/* // Category list..... */}

 <li className="nav-item">
  <button
    className="btn w-100 text-start d-flex text-dark justify-content-between align-items-center nav-link"
    onClick={() => setCategoryOpen(!categoryOpen)}
  >
    <span>Category</span>
    <span className="fw-bold">{categoryOpen ? "−" : "+"}</span>
  </button>

  <div className={`collapse ${categoryOpen ? "show" : ""}`}>
    <ul className="list-unstyled ps-3">
      <li>
        <NavLink to="/dashboard/AddCategory" className="nav-link py-1 text-dark">
          Add Category
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard/ManageCategory" className="nav-link py-1 text-dark">
          Manage Category
        </NavLink>
      </li>

    </ul>
  </div>
</li>


</ul>
</div>

          <div className="col-md-10 p-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}