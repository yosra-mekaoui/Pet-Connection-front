import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { NavLink,Link, Routes, Route } from "react-router-dom";
=======
import { NavLink, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
>>>>>>> ee347506aec4a2318022edffa450cb6f1f699215
=======
>>>>>>> ee347506aec4a2318022edffa450cb6f1f699215
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { createBrowserHistory } from 'history';
import {affichage, selectProduct} from "../../redux/slices/ProductSlice";
import { addToCart } from "../../redux/slices/cartSlice";
<<<<<<< HEAD
<<<<<<< HEAD
import {toast} from "react-toastify";

import axios from "axios";
function Shop() {
  const dispatch = useDispatch();
  const products = useSelector(selectProduct);
  const history = createBrowserHistory();
  const userFromLocalStorageString = localStorage.getItem('user');
  const user = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;
 
 
=======
=======
>>>>>>> ee347506aec4a2318022edffa450cb6f1f699215
function Shop() {
  const dispatch = useDispatch();
  const products = useSelector(selectProduct);
  const history = createBrowserHistory();


  const handleAddToCart = (p) => {
  dispatch(addToCart(p));
  history.push('/cart');
  window.location.reload();
  };
<<<<<<< HEAD
>>>>>>> ee347506aec4a2318022edffa450cb6f1f699215
=======
>>>>>>> ee347506aec4a2318022edffa450cb6f1f699215

  useEffect(() => {
    dispatch(affichage())
  }, [dispatch]);
<<<<<<< HEAD
<<<<<<< HEAD
  const handleSubmit = async (id) => {
    try {
      const confirmed = window.confirm("Product added to cart. Do you want to view your cart?");
    if (confirmed) {
      toast.success(" product added to cart", {
        position: "bottom-left",
    });
   
      const response = await axios.post(`http://localhost:3000/addproducttocart/${id}`, {user});
      console.log(response.data);
      
      history.push('/cart');
      window.location.reload();
      
    }
    

    
    } catch (error) {
      console.error(error);
    }
  };
=======

>>>>>>> ee347506aec4a2318022edffa450cb6f1f699215
=======

>>>>>>> ee347506aec4a2318022edffa450cb6f1f699215
  return (<>
    <div className="inner-page-banner">
      <div className="breadcrumb-vec-btm">
        <img className="img-fluid" src="assets/images/bg/inner-banner-btm-vec.png" alt="" />
      </div>
      <div className="container">
        <div className="row justify-content-center align-items-center text-center">
          <div className="col-lg-6 align-items-center">
            <div className="banner-content">
              <h1>Shop</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Shop</li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="banner-img d-lg-block d-none">
              <div className="banner-img-bg">
                <img className="img-fluid" src="assets/images/bg/inner-banner-vec.png" alt="" />
              </div>
              <img className="img-fluid" src="assets/images/bg/inner-banner-img.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="shop-page pt-120 mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="shop-sidebar">
              {/* -------------------------Tri------------------------- */}
              <div className="shop-widget">
                <div className="check-box-item">
                  <h5 className="shop-widget-title">Category</h5>
                  <div className="checkbox-container">
                    <label className="containerss">Food Toppers
                      <input type="checkbox" defaultChecked="checked" />
                      <span className="checkmark" />
                    </label>
                    <label className="containerss">Milk Replacers
                      <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                    <label className="containerss">Canned Food
                      <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                    <label className="containerss">Veterinary Authorized Diets
                      <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                    <label className="containerss">Bones &amp; Rawhide
                      <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ---------------------------------------------------------------------------------- */}

          <div className="col-lg-9">
            <div className="row mb-50">
              <div className="col-lg-12">
                <div className="multiselect-bar">
                  <h6>shop</h6>
                  <div className="multiselect-area">
                    <div className="single-select">
                      <span>Show</span>
                      <select className="defult-select-drowpown" id="color-dropdown">
                        <option selected value={0}>12</option>
                        <option value={1}>15</option>
                        <option value={2}>18</option>
                        <option value={3}>21</option>
                        <option value={4}>25</option>
                      </select>
                    </div>
                    <div className="single-select two">
                      <select className="defult-select-drowpown" id="eyes-dropdown">
                        <option selected value={0}>Default</option>
                        <option value={1}>Grid</option>
                        <option value={2}>Closed</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-4 justify-content-center">

              {products.map((p,i) => {
                return (
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="collection-card">
                      <div className="offer-card">
                        <span>Offer</span>
                      </div>
                      <div className="collection-img">
                        <img className="img-gluid" src={(p !== null) ? p.img : ''} alt="" />
                        <div className="view-dt-btn">
                          <div className="plus-icon">
                            <i className="bi bi-plus" />
                          </div>

                          <NavLink to="/details">View Details</NavLink>
                        </div>
<<<<<<< HEAD
<<<<<<< HEAD

                        <ul className="cart-icon-list">
                          
                          <li>
                            <a onClick={() => handleSubmit(p._id)}>
                              <img src="assets/images/icon/Icon-cart3.svg" alt="" />
                            
                            </a>
                            
                          </li>
=======
                        <ul className="cart-icon-list">
                          <button onClick={() => handleAddToCart(p)}>Add </button>
                          <li><NavLink to="/cart"><img src="assets/images/icon/Icon-cart3.svg" alt="" /></NavLink></li>
>>>>>>> ee347506aec4a2318022edffa450cb6f1f699215
=======
                        <ul className="cart-icon-list">
                          <button onClick={() => handleAddToCart(p)}>Add </button>
                          <li><NavLink to="/cart"><img src="assets/images/icon/Icon-cart3.svg" alt="" /></NavLink></li>
>>>>>>> ee347506aec4a2318022edffa450cb6f1f699215
                          <li><a href="#"><img src="assets/images/icon/Icon-favorites3.svg" alt="" /></a></li>
                        </ul>
                      </div>
                      <div className="collection-content text-center">
                        <h4><NavLink to="/details">{(p !== null) ? p.name : ''}</NavLink></h4>
<<<<<<< HEAD
<<<<<<< HEAD
=======
                     
                  <span>SKU:9852410</span>
>>>>>>> ee347506aec4a2318022edffa450cb6f1f699215
=======
                     
                  <span>SKU:9852410</span>
>>>>>>> ee347506aec4a2318022edffa450cb6f1f699215
                        <div className="price">
                          <h6>{(p !== null) ? p.price : ''} <del>$50.00</del></h6>
                        </div>
                        <div className="review">
                          <ul>
                            <li><i className="bi bi-star-fill" /></li>
                            <li><i className="bi bi-star-fill" /></li>
                            <li><i className="bi bi-star-fill" /></li>
                            <li><i className="bi bi-star-fill" /></li>
                            <li><i className="bi bi-star-fill" /></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
            <div className="row pt-70">
              <div className="col-lg-12 d-flex justify-content-center">
                <div className="paginations-area">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item"><a className="page-link" href="#"><i className="bi bi-arrow-left-short" /></a></li>
                      <li className="page-item active"><a className="page-link" href="#">01</a></li>
                      <li className="page-item"><a className="page-link" href="#">02</a></li>
                      <li className="page-item"><a className="page-link" href="#">03</a></li>
                      <li className="page-item"><a className="page-link" href="#"><i className="bi bi-arrow-right-short" /></a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>  );
}

export default Shop;
