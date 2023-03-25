import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; 
import axios from "axios";
function AssociationList() {
    const [data, setData] = useState([]);
    const [img, setImg] = useState("http://localhost:3000/uploads/");


    const baseUrl = "http://localhost:3000/associations/"; 

    useEffect(() => {
        //setImg(`http://localhost:3000/uploads/`); 
        
        axios
          .get("http://localhost:3000/association/allAssociations")
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
         
        
    }, [])
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
                  <h1>Associations</h1>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index.html">Home</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Associations
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

        <h2
          style={{
            marginTop: "40px",
            marginLeft: "8%",
            color: "#353535",
            marginBottom: "-20px",
          }}
        >
          You have an association? Become a{" "}
          <NavLink to="/upgrade">Partner.</NavLink>
        </h2>

        <div className="container">
          <div className="row">
            <div className="col-6" style={{ marginTop: "120px" }}>
              <div
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                  padding: "20px",
                  borderRadius: "10px",
                  background:
                    "linear-gradient(217deg, rgba(255,223,195,.8), rgba(255,223,195,0) 70.71%),            linear-gradient(127deg, rgba(230,207,207,.8), rgba(230,207,207,0) 70.71%),            linear-gradient(336deg, rgba(255,225,225,.8), rgba(255,225,225,0) 70.71%)",
                }}
              >
                <h3 style={{ paddingLeft: "10px", color: "#353535" }}>
                  What's New ?{" "}
                </h3>
              </div>
            </div>

            <div className="col-6">
              <div className="blog-grid-pages pt-120 mb-120">
                <div className="container">
                  <div className="row g-lg-4 gy-5 justify-content-center mb-70">
                    {data.map((item) => (
                      <div className="col-lg-12 col-md-6 col-sm-10">
                        <div className="h1-blog-card">
                          <div className="blog-img">
                            <img
                              className="img-fluid"
                              src={baseUrl + item.image}
                              alt=""
                            />
                            <div className="category">
                              <a href="blog-grid.html">{item.name}</a>
                            </div>
                          </div>
                          <div className="blog-content">
                            <div className="blog-meta">
                              <a href="blog-grid.html">{item.role}</a>
                            </div>
                            <h4>
                              <a href="blog-details.html">{item.bio}</a>
                            </h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default AssociationList;
