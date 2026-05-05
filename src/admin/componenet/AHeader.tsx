

function AHeader() {
  return (
    <div>
       <nav className="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block" id="templatemo_nav_top">
      <div className="container text-light">
        <div className="w-100 d-flex justify-content-between">
          <div>
            <i className="fa fa-envelope mx-2" />
            <a className="navbar-sm-brand text-light text-decoration-none" href="mailto:info@company.com">info@company.com</a>
            <i className="fa fa-phone mx-2" />
            <a className="navbar-sm-brand text-light text-decoration-none" href="tel:010-020-0340">010-020-0340</a>
                  
          </div>
          <div>
           <ul className="social-links">
           
                                
         <li><a href="#"><i className="fab fa-linkedin" /></a></li>
        <li><a href="#"><i className="fab fa-instagram" /></a></li>
                                                        
         </ul>
          </div>

        </div>
      </div>
    </nav> 
    </div>
  )
}

export default AHeader