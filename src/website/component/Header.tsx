import {Link,  NavLink, useNavigate } from "react-router-dom"

  function Header() {

    const redirect=useNavigate();
    const logout =()=>{
        localStorage.removeItem('u_id');
        localStorage.removeItem('u_name');
        localStorage.removeItem('u_email');
        swal("Good job!", "Logout Success!", "success");
        redirect('/');
    }

  return (

<div>
{/* start the nav bar  */}
<nav className="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block" id="templatemo_nav_top">
      <div className="container text-light">
        <div className="w-100 d-flex justify-content-between">
          <div>
            <i className="fa fa-envelope mx-2" />
            <a className="navbar-sm-brand text-light text-decoration-none" href="mailto:info@company.com">info@company.com</a>
            <i className="fa fa-phone mx-2" />
            <a className="navbar-sm-brand text-light text-decoration-none" href="tel:010-020-0340">010-020-0340</a>
                  {(() => {
                            if (localStorage.getItem('u_name')) {
                            return (
                                            <li><i className="fa fa-user" />
                                                Welcome : {localStorage.getItem('u_name')}
                                            </li>
                                        )
                                    }
                                })()}  
          </div>
          <div>
           <ul className="social-links">
            {(() => {
           if (localStorage.getItem('u_name')) {
           return (
                                           
              <li><Link to="/UseProfile"><i className="fa fa-user" /> </Link></li>
                                           
                )
                }
                })()}
                                
         <li><a href="#"><i className="fab fa-linkedin" /></a></li>
        <li><a href="#"><i className="fab fa-instagram" /></a></li>
                                                        
         </ul>
          </div>

        </div>
      </div>
    </nav>
    {/* Close Top Nav */}
            


  {/* Header */}
  <nav className="navbar navbar-expand-lg navbar-light shadow">
  <div className="container d-flex justify-content-between align-items-center">
  <a className="navbar-brand text-success logo h1 align-self-center" href="index.html">
    Urban Shop
  </a>
  <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon" />
  </button>


  <div className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
  <div className="flex-fill">
            
              <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
              <li> <NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/shop">Shop</NavLink></li>
              <li><NavLink to="/shop-single">Shop Single</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
             <li><NavLink to="/ProductReview">Review</NavLink></li>

                                       {(() => {
                                        if (localStorage.getItem('u_id')) {
                                            return (
                                                <li><a href="" onClick={logout} className="w-100 h-50 p-1"> Logout</a></li>
                                            )
                                        }
                                        else
                                        {
                                            return(
                                                <li><NavLink to="/login" className="w-100 h-50 p-1"> <span className='fa fa-user'></span> Login</NavLink></li>
                                            )
                                        }
                                    })()}

            </ul>
          </div>
          <div className="navbar align-self-center d-flex">
            <div className="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
              <div className="input-group">
                <input type="text" className="form-control" id="inputMobileSearch" placeholder="Search ..." />
                <div className="input-group-text">
                  <i className="fa fa-fw fa-search" />
                </div>
              </div>
            </div>
            <a className="nav-icon d-none d-lg-inline" href="#" data-bs-toggle="modal" data-bs-target="#templatemo_search">
              <i className="fa fa-fw fa-search text-dark mr-2" />
            </a>
            <a className="nav-icon position-relative text-decoration-none" href="#">
              <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1" />
              <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">7</span>
            </a>
            <a className="nav-icon position-relative text-decoration-none" href="#">
              <i className="fa fa-fw fa-user text-dark mr-3" />
              <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">+99</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
    {/* Close Header */}
  </div>
  )
}
  export default Header

