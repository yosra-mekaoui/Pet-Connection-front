import React, { useEffect, useState } from "react"; 
import Dropzone from "react-dropzone";
import { UpgradeUser } from "./api";



function Upgrade() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))["_id"]); 
  
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [type, setType] = useState("");
  
    console.log(user);  
    console.log("type : " + type);   
    console.log("Name : " + name);   

    const [file, setFile] = useState(null);
    const handleFileUpload = async (acceptedFiles) => {
      setFile(acceptedFiles[0]);
     };


   //console.log(file);
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", file);

      const Upgrade = {
        user: user,
        name: name,
        file: formData,
        type : type
      }

      UpgradeUser(Upgrade); 
    };
  

  return (
    <>
      <center>
        <div className="login-section pt-120 pb-120">
          <div className="container">
            <div className="row d-flex justify-content-center g-4">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title">
                    <h3>Upgrade Account</h3>
                    <p style={{ fontSize: "14px" }}>
                      Are you a veterinarian or an association? Verify your
                      account now.
                    </p>
                  </div>
                  <form className="w-100" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-inner">
                          <label style={{ float: "left" }}>
                            <span style={{ fontWeight: "800" }}>
                              Association Name{" "}
                            </span>
                            (Only if you are submitting for an association){" "}
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Your Username..."
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* <div className="col-6">
                        <div className="form-inner">
                          <label style={{ float: "left" }}>Account Type </label>

                          <select
                            type="text"
                            onChange={(e) => setType(e.target.value)}
                          >
                            <option value={"Veterinarian"}>Veterinarian</option>
                            <option value={"Association"}>Association</option>
                          </select>
                        </div>
                      </div> */}

                      <div className="col-12">
                        <div className="form-inner">
                          <label style={{ float: "left", fontWeight: "800" }}>
                            Type{" "}
                          </label>
                          <div style={{ display: "flex" }}>
                            <input
                              style={{
                                transform: "scale(0.5)",
                                marginTop: "-10px",
                              }}
                              type="radio"
                              id="Veterinarian"
                              name="type"
                              value="Veterinarian"
                              onChange={(e) => setType(e.target.value)}
                            />
                            <label
                              for="html"
                              style={{
                                marginLeft: "-40px",
                                marginRight: "10px",
                              }}
                            >
                              Veterinarian
                            </label>
                            <input
                              style={{
                                transform: "scale(0.5)",
                                marginTop: "-10px",
                              }}
                              type="radio"
                              id="Association"
                              name="type"
                              value="Association"
                              onChange={(e) => setType(e.target.value)}
                            />
                            <label
                              for="css"
                              style={{
                                marginLeft: "-40px",
                                marginRight: "10px",
                              }}
                            >
                              Association
                            </label>
                          </div>
                        </div>
                      </div>

                      <Dropzone onDrop={handleFileUpload}>
                        {({ getRootProps, getInputProps }) => (
                          <div
                            {...getRootProps()}
                            style={{
                              color: "black !important",
                              height: "100px",
                              paddingTop: "20px",
                              marginTop: "20px",
                              marginBottom: "30px",
                              boxShadow:
                                "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                              border: "1px solid black",
                              background:
                                "linear-gradient(217deg, rgba(255,130,130,.8), rgba(255,130,130,0) 70.71%),            linear-gradient(127deg, rgba(230,207,207,.8), rgba(230,207,207,0) 70.71%),            linear-gradient(336deg, rgba(255,225,225,.8), rgba(255,225,225,0) 70.71%)",
                            }}
                          >
                            <input {...getInputProps()} />
                            <p
                              style={{
                                color: "black",
                                fontSize: "17px",
                              }}
                            >
                              <i
                                className="fa fa-upload"
                                style={{
                                  fontSize: "20px",
                                  marginRight: "10px",
                                }}
                              ></i>
                              Drag and drop your image here or click to select a
                              file
                              {file != null && (
                                <p
                                  style={{
                                    color: "darkGreen",
                                  }}
                                >
                                  {" "}
                                  {file["path"]}{" "}
                                </p>
                              )}
                            </p>
                          </div>
                        )}
                      </Dropzone>
                    </div>
                    <button className="account-btn" hidden={!file}>
                      {" "}
                      <i className="fa fa-paw" aria-hidden="true"></i>
                      &nbsp;Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </center>
    </>
  );
}

export default Upgrade;
