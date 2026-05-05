import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./website/pages/Index";
import About from "./website/pages/About";
import Shop from "./website/pages/Shop";
import Contact from "./website/pages/Contact";
import ShopSingle from "./website/pages/ShopSingle";
import ProductReview from "./website/pages/ProductReview";

import Footer from "./website/component/Footer";
import Header from "./website/component/Header";

import DashboardLayout from "./admin/pages/DashboardLayout";
import DashboardHome from "./admin/pages/DashboardHome";
import ManageProducts from "./admin/pages/ManageProducts";
import AddProducts from "./admin/pages/AddProducts";
import ReviewManage from "./admin/pages/ReviewManage";
import AddCategory from "./admin/pages/ AddCategory";
import ManageCategory from "./admin/pages/ManageCatogery";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<><Header /><Index /><Footer /></>} />
        <Route path="/about" element={<><Header /><About /><Footer /></>} />
        <Route path="/shop" element={<><Header /><Shop /><Footer /></>} />
        <Route path="/shop-single" element={<><Header /><ShopSingle /><Footer /></>} />
        <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
        <Route path="/product-review" element={<><Header /><ProductReview /><Footer /></>} />

        {/*  DASHBOARD ROUTES */}
        <Route path="/dashboard" element={<DashboardLayout />}>

          <Route index element={<DashboardHome />} />

          <Route path="AddProducts" element={<AddProducts />} />
          <Route path="ManageProducts" element={<ManageProducts />} />

          <Route path="review-manage" element={<ReviewManage />} />

          <Route path="AddCategory" element={<AddCategory />} />
          <Route path="ManageCategory" element={<ManageCategory />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;