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

function Leaderboard() {
  const [total, setTotal] = useState(0);
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(0);
  const [ranking, setRanking] = useState([]);
  
  const query = new URLSearchParams(window.location.search);

  useEffect(() => {
    setTotal(query.get("total"));
    setFunding(query.get("funding")); 
    
    axios.get(`http://localhost:3000/donation/getRanking`).then((response) => {
      console.log("user : " + response.data);
      setRanking(response.data); 
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
                <h1>Leaderboard</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Crowdfundings
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
            style={{ marginTop: "50px", color: "black", marginBottom: "20px" }}
          >
            <i
              className="fa fa-trophy"
              style={{
                marginRight: "10px",
              }}
            />
            Leaderboard
          </h1>
          <div
            style={{
              marginBottom: "50px",
              letterSpacing: "3px",
              fontSize: "18px",
            }}
          >
            Every contribution can save a pet's live.<br></br>
            Kudos to our top donators.
          </div>

          <br></br>

          <div className="container">
            {/* =============== title ============= */}
            <div className="row">
              <div className="col-2">
                <span className="rankHeads"> Rank</span>
              </div>

              <div className="col-6 rankHeads">Username</div>

              <div className="col-2 rankHeads">XP</div>
              <div className="col-2 rankHeads">Level</div>
            </div>

            {/* ==================== rows ====================== */}
            {ranking.map((item, index) => (
              <>
                {index == 0 && (
                  <>
                    <div
                      className="row rankBar"
                      style={{
                        background:
                          "linear-gradient(217deg, rgba(250,181,42,.8), rgba(250,181,42,0) 70.71%), linear-gradient(127deg, rgba(236,198,121,.8), rgba(236,198,121,0) 70.71%),            linear-gradient(336deg, rgba(207,223,217,.8), rgba(207,223,217,0) 70.71%)",
                      }}
                    >
                      <div className="col-2">
                        <span className="rankNumb"> {index + 1} </span>
                      </div>

                      <div className="col-6">{item.username}</div>

                      <div className="col-2">
                        <div>{item.xp}</div>
                      </div>
                      <div className="col-2">{item.level}</div>
                    </div>
                  </>
                )}

                {index == 1 && (
                  <>
                    <div
                      className="row rankBar"
                      style={{
                        color: "black", 
                        marginBottom: "10px",
                        background:
                          "linear-gradient(217deg, rgba(137,137,137,.8), rgba(137,137,137,0) 70.71%), linear-gradient(127deg, rgba(95,95,95,.8), rgba(95,95,95,0) 70.71%),            linear-gradient(336deg, rgba(135,135,135,.8), rgba(135,135,135,0) 70.71%)",
                      }}
                    >
                      <div className="col-2">
                        <span
                          className="rankNumb" 
                        >
                          {index + 1}
                        </span>
                      </div>

                      <div className="col-6">{item.username}</div>

                      <div className="col-2">
                        <div>{item.xp}</div>
                      </div>

                      <div className="col-2">
                        <div>{item.level}</div>
                      </div>
                    </div>
                  </>
                )}

                {index == 2 && (
                  <>
                    <div
                      className="row rankBar"
                      style={{
                        color: "black",
                        
                        marginBottom: "10px",
                        background:
                          "linear-gradient(217deg, rgba(223,178,155,.8), rgba(178,137,117,0) 70.71%), linear-gradient(127deg, rgba(172,83,38,.8), rgba(172,83,38,0) 70.71%),            linear-gradient(336deg, rgba(201,127,90,.8), rgba(201,127,90,0) 70.71%)",
                      }}
                    >
                      <div className="col-2 ">
                        <span
                          className="rankNumb" 
                        >
                          {index + 1}
                        </span>
                      </div>

                      <div className="col-6">{item.username}</div>

                      <div className="col-2">
                        <div>{item.xp}</div>
                      </div>

                      <div className="col-2">
                        <div>{item.level}</div>
                      </div>
                    </div>
                  </>
                )}

                {index != 0 && index != 1 && index != 2 && (
                  <div
                    className="row"
                    style={{
                      color: "black",
                      marginBottom: "10px",
                      fontSize: "18px",
                    }}
                  >
                    <div className="col-2">{index + 1}</div>

                    <div className="col-6">{item.username}</div>

                    <div className="col-2">
                      <div>{item.xp}</div>
                    </div>

                    <div className="col-2">
                      <div>{item.level}</div>
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </center>
    </>
  );
}

export default Leaderboard;
