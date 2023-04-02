import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { getRanking } from "../api";

const ProgressBar = ({ progress }) => (
  <div className="progressbar">
    <div className="progress" style={{ width: `${progress}%` }}></div>
  </div>
);

const styles = {
  rankBar: {},
};

function Verifications() {
  const [total, setTotal] = useState(0);
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(0);
  const [upgrades, setUpgrades] = useState([]);


  const [up, setUp] = useState({}); 

  const query = new URLSearchParams(window.location.search);

  useEffect( () => {

    axios.get(`http://localhost:3000/user/AllUpgrades`).then((response) => {
      console.log("user : " + response);
      setUpgrades(response.data);
      setUp(response.data[0]); 
    });
  }, []);

  const [funding, setFunding] = useState("");

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
                <h1>Account Upgrades Verifications</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
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

      <center>
        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            padding: "20px",
            borderRadius: "10px",
            width: "80%",
            marginTop: "50px",
            marginBottom: "100px",
            background:
              "linear-gradient(217deg, rgba(255,223,195,.8), rgba(255,223,195,0) 70.71%), linear-gradient(127deg, rgba(230,207,207,.8), rgba(230,207,207,0) 70.71%),            linear-gradient(336deg, rgba(255,225,225,.8), rgba(255,225,225,0) 70.71%)",
          }}
        >
          <h1
            style={{
              marginTop: "50px",
              color: "black",
              marginBottom: "30px",
            }}
          >
            <i
              className="fa fa-trophy"
              style={{
                marginRight: "10px",
              }}
            />
            Users Submissions
          </h1>

          <br></br>

          <div
            className="container"
            style={{ padding: "0px 4% 30px 4%", fontWeight: "600" }}
          >
            {/* =============== title ============= */}
            <div className="row">
              {/* =========== tables =================== */}
              <div className="col-6">
                <div className="container">
                  <div className="row">
                    <div className="col-4">
                      <span className="rankHeads">Name</span>
                    </div>

                    <div className="col-4 rankHeads">Type</div>

                    <div className="col-4 rankHeads">Action</div>
                  </div>

                  {/* ==================== rows ====================== */}
                  {upgrades.map((item, index) => (
                    <>
                      <div
                        className="row rankBar"
                        style={{
                          color: "black",
                          marginBottom: "10px",
                          fontSize: "18px",
                          backgroundColor: "#F3E8F5",  
                        }}
                      >
                        <div className="col-4">
                          <span>{item.name}</span>
                        </div>

                        <div className="col-4 username">{item.type}</div>

                        <div className="col-4">
                          <div>
                            <button onClick={()=>{setUp(item)}}>edit</button>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>

              {/* ======== edit part =============== */}
              <div className="col-6">
                  {up.name}




              </div>
            </div>
          </div>
        </div>
      </center>
    </>
  );
}

export default Verifications;
