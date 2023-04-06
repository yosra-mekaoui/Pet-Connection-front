import { useNavigate } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { createBrowserHistory } from 'history';
import {getProductById, selectProduct} from "../../redux/slices/ProductSlice";


function Details() {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);


  useEffect(() => {
    dispatch(getProductById())
  }, [dispatch]);

  return (
    <>
      <div className="inner-page-banner">
        <div className="breadcrumb-vec-btm">
          <img
            className="img-fluid"
            src="assets/images/bg/inner-banner-btm-vec.png"
            alt=""
          />
        </div>
        <div className="container">
          <div className="row justify-content-center align-items-center text-center">
            <div className="col-lg-6 align-items-center">
              <div className="banner-content">
                <h1>Shop Details</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Shop Details
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="banner-img d-lg-block d-none">
                <div className="banner-img-bg">
                  <img
                    className="img-fluid"
                    src="assets/images/bg/inner-banner-vec.png"
                    alt=""
                  />
                </div>
                <img
                  className="img-fluid"
                  src="assets/images/bg/inner-banner-img.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shop-details-page pt-120 mb-120">
        <div className="container">
          <div className="row g-lg-4 gy-5 mb-120">
            <div className="col-lg-7">
              <div className="tab-content tab-content1" id="v-pills-tabContent">

             {product.map((p,i) => {
              return (
                
                <div className="col-lg-5">
                <div className="shop-details-content">
                <img className="img-gluid" src={(p !== null) ? p.img : ''} alt="" />

                  <h3>{(p !== null) ? p.name : ''}</h3>
                  <ul className="shopuct-review2 d-flex flex-row align-items-center mb-25">
                    <li>
                      <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <a href="#" className="review-no">
                        (1 customer review)
                      </a>
                    </li>
                  </ul>
                  <div className="model-number">
                    <span>SKU:9852410</span>
                  </div>
                  <div className="price-tag">
                    <h4>
                    {(p !== null) ? p.price : ''}<del>$50.00</del>
                    </h4>
                  </div>
                  <p>
                  {(p !== null) ? p.desc : ''}
                  </p>
                  <div className="shop-quantity d-flex align-items-center justify-content-start mb-20">
                    <div className="quantity d-flex align-items-center">
                    
                    </div>
                  
                    <NavLink to="/cart" className="primary-btn3">
                      Add to cart
                    </NavLink>
                  </div>
                 
                 
                 
                </div>
              </div>
                );
              })}
              
                
               
               
              </div>
             
                
            </div>
          
          </div>
         
        
         
        </div>
      </div>
    </>
    
  );
}
export default Details;
