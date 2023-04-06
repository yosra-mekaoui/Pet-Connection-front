import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
<<<<<<< HEAD
<<<<<<< HEAD
import axios from "axios";
import { createBrowserHistory } from 'history';
import {toast} from "react-toastify";

function Cart() {
  const userFromLocalStorageString = localStorage.getItem('user');
  const user = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;
  const cart = useSelector(state => state.cart);
  const [product, setProduct] = useState("");
  const [products, setProducts] = useState("");
  const { id } = useParams();
  const history = createBrowserHistory();

   useEffect(() => {
   
    axios.post('http://localhost:3000/getCartProductsByUser', { user })
      .then(response => {
        setProducts(response.data);
        console.log(products);
        
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  //delete product from cart 
  const deleteProductFromCart = async (productId) => {
    try {
      const confirmed = window.confirm("Are you sure your want to delete product from cart?");
      
      if (confirmed) {
       
        const response = await axios.post(`http://localhost:3000/deletecart2/${productId}`, { user });
        console.log(response.data);
        history.push('/cart');
        window.location.reload();
        
      }  
     
    } catch (error) {
      console.error(error);
    }
  };
  //subtractFromCart
  const subtractFromCart = async (productId) => {
    try {
      const confirmed = window.confirm("Are you sure your want subtract 1 from product quantity?");
      if (confirmed) {
        const response = await axios.post(`http://localhost:3000/subtractFromCart/${productId}`, { user });
        console.log(response.data);
        history.push('/cart');
        window.location.reload();
      }  
     
    } catch (error) {
      console.error(error);
    }
  };
//   useEffect(() => {
//     const addproducttocart = async () => {
//           try {
//             const response = await fetch(`http://localhost:3000/product/addproducttocart/${id}`, {
//                     method: 'POST',
//                     body: JSON.stringify({ user: user }),
//                     headers: {
//                       'Content-Type': 'application/json'
//                     }});
//                     const data = await response.json();
//                         console.log(data.message); // Print response message to console
//           } catch (error) {
//                   console.error(error);  

//                 }

//   }
//   addproducttocart();
// })
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
   
    

//     axios.post(`http://localhost:3000/addproducttocart/${id}`, { user })
//     .then(response => {
//       console.log(response.data);
      
//     })
   
//   } catch (error) {
//     console.error(error);
//   }
// };


// useEffect(() => {
//   const addToCart = async () => {
//     try {
//       const response = await axios.post(`http://localhost:3000/addproducttocart/${id}`, { user });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   addToCart();
// }, [response.data]);
  
=======
function Cart() {
  const cart = useSelector(state => state.cart);
>>>>>>> ee347506aec4a2318022edffa450cb6f1f699215
=======
function Cart() {
  const cart = useSelector(state => state.cart);
>>>>>>> ee347506aec4a2318022edffa450cb6f1f699215
  return (
    <>
      <div className="inner-page-banner">
        <div className="breadcrumb-vec-btm">
          <img
            className="img-fluid"
            src="/assets/images/bg/inner-banner-btm-vec.png"
            alt=""
          />
        </div>
        <div className="container">
          <div className="row justify-content-center align-items-center text-center">
            <div className="col-lg-6 align-items-center">
              <div className="banner-content">
                <h1>Cart</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Cart
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
                    src="/assets/images/bg/inner-banner-vec.png"
                    alt=""
                  />
                </div>
                <img
                  className="img-fluid"
                  src="/assets/images/bg/inner-banner-img.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cart-section pt-120 pb-120">
        <div className="container">
         
          <div className="row">
            <div className="col-12">
              <div className="table-wrapper">
                <table className="eg-table table cart-table">
                  <thead>
                    <tr>
                      <th>Delete</th>
                      <th>Image</th>
                      <th>Food Name</th>
                      <th>Discount Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                   
<<<<<<< HEAD
<<<<<<< HEAD
                  {products && products.map(pet => (    
                    <tr>
                      <td data-label="Delete">
                        <div className="delete-icon">
                          <i className="bi bi-x" onClick={() => deleteProductFromCart(pet._id)}></i>
                        </div>
                      </td>
                      <td data-label="Image">
                        <img src={pet.img} alt="" />
                      </td>
                      <td data-label="Food Name">
                        <a href="shop-details.html">{pet.name}</a>
                      </td>
                      <td data-label="Unite Price">{pet.price}<br></br><del>50.00 TND</del></td>
                      <td data-label="Discount Price">{pet.quantity} 
                      <button onClick={() => subtractFromCart(pet._id)}>-</button>
                      </td>
                      <td data-label="Quantity">
                        <div className="quantity d-flex align-items-center">
                          <div className="quantity-nav nice-number d-flex align-items-center" >
                          {pet.price} TND <input  type="number" min="1" />
                          </div>
                        </div>
                      </td>
                      
=======
=======
>>>>>>> ee347506aec4a2318022edffa450cb6f1f699215
                   
                    <tr>
                      <td data-label="Delete">
                        <div className="delete-icon">
                          <i className="bi bi-x"></i>
                        </div>
                      </td>
                      <td data-label="Image">
                        <img src="assets/images/bg/cart-03.png" alt="" />
                      </td>
                      <td data-label="Food Name">
                        <a href="shop-details.html">Natural Dog Fresh Food.</a>
                      </td>
                      <td data-label="Unite Price">$30.00</td>
                      <td data-label="Discount Price">$18.00</td>
                      <td data-label="Quantity">
                        <div className="quantity d-flex align-items-center">
                          <div className="quantity-nav nice-number d-flex align-items-center">
                            <input type="number" value="1" min="1" />
                          </div>
                        </div>
                      </td>
                      <td data-label="Subtotal">$18.00</td>
>>>>>>> ee347506aec4a2318022edffa450cb6f1f699215
                    </tr>
                     ))} 
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="row g-4">
            <div class="col-lg-4">
              <div class="coupon-area">
                <div class="cart-coupon-input">
                  <h5 class="coupon-title">Coupon Code</h5>
                  <form class="coupon-input d-flex align-items-center">
                    <input type="text" placeholder="Coupon Code" />
                    <button type="submit">Apply Code</button>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
<<<<<<< HEAD
<<<<<<< HEAD
            <ul class="cart-btn-group">
                <li><a href="/shop" class="primary-btn2 btn-lg">Continue to shopping</a></li>
                <li><a href="/checkout" class="primary-btn3 btn-lg">Proceed to Checkout</a></li>
            </ul>
=======
=======
>>>>>>> ee347506aec4a2318022edffa450cb6f1f699215
           
              <ul class="cart-btn-group">
                <li>
                  <NavLink to="/shop" class="primary-btn2 btn-lg">
                    Continue to shopping
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/checkout" class="primary-btn3 btn-lg">
                    Proceed to Checkout
                  </NavLink>
                </li>
              </ul>
>>>>>>> ee347506aec4a2318022edffa450cb6f1f699215
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;