import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import Dropzone from "react-dropzone";


const ProgressBar = ({ progress }) => (
  <div className="progressbar">
    <div className="progress" style={{ width: `${progress}%` }}></div>
  </div>
);

const styles = {
  rankBar: {},
};

function PetAvatar() {
  
  const [message, setMessage] = useState(""); 

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [output, setOutput] = useState("");

  const handleFileUpload = async (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };
  
  const avatCreation = async () => { 
    console.log("1"); 
    setMessage("Uploading Image tothe server...");
    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", "dyg5jrqn");

    // const response = await fetch(
    //   'https://api.cloudinary.com/v1_1/dszmvlrpt/image/upload',
    //   {
    //     method: 'POST',
    //     body: formData,
    //   }
    // );

    // const data = await response.json();
    // setImageUrl(data.secure_url);

    // image uploaded to server : done !
    setMessage("Your avatar is being created. Please wait...");
    const response2 = await fetch(
      "https://stablediffusionapi.com/api/v3/img2img",
      {
        method: "POST",
        body: {
          key: "spT4sLoWPHCzhbByl3ttp69ZYQQXya4jj7y37ocANGfiSyNGb6fdLYhXqbdM",
          prompt: "Make an avatar of my pet.",
          negative_prompt: null,
          init_image:
            "https://raw.githubusercontent.com/CompVis/stable-diffusion/main/data/inpainting_examples/overture-creations-5sI6fQgYIuo.png",
          width: "512",
          height: "512",
          samples: "1",
          num_inference_steps: "30",
          guidance_scale: 7.5,
          safety_checker: "yes",
          strength: 0.7,
          seed: null,
          webhook: null,
          track_id: null,
        },
      }
    );

      const data2 = await response2.json();
      setOutput(data2.output[0]);
      console.log("OUTPUT : "+ output);
      setMessage("Done !");
      
  }


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
                <h1>Rewards Center</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Rewards
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
              "linear-gradient(217deg, rgba(205,219,249,1), rgba(205,219,249,0) 90.71%), linear-gradient(127deg, rgba(129,163,230,.8), rgba(129,163,230,0) 90.71%),            linear-gradient(336deg, rgba(77,105,162,.8), rgba(77,105,162,0) 90.71%)",
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
              className="fas fa-dog"
              style={{
                marginRight: "10px",
              }}
            />
            Pet Avatar
          </h1>
          <div
            style={{
              marginBottom: "30px",
              letterSpacing: "3px",
              fontSize: "18px",
              color: "#3A3C3F",
            }}
          >
            Upload an Image of your pet.
          </div>

          <br></br>

          <div
            className="container"
            style={{ padding: "0px 4% 30px 4%", fontWeight: "600" }}
          >
            <Dropzone onDrop={handleFileUpload}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  style={{
                    color: "black !important",
                    width: "60%",
                    height: "80px",
                    paddingTop: "10px",
                    marginTop: "10px",
                    marginBottom: "30px",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    border: "1px solid black",
                    background:
                      "linear-gradient(217deg, rgba(118,198,190,.8), rgba(118,198,190,0) 70.71%),            linear-gradient(127deg, rgba(230,207,207,.8), rgba(230,207,207,0) 70.71%),            linear-gradient(336deg, rgba(191,255,249,.8), rgba(191,255,249,0) 70.71%)",
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
                    Drop your pet picture
                    {file != null && (
                      <p
                        style={{
                          color: "darkGreen",
                          marginBottom : "20px"
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

            <button
              style={{
                padding: "8px 20px 8px 20px",
                backgroundColor: "#5FF0E2",
                border: "1px solid gray",
                borderRadius: "10px",
                marginBottom: "30px",
                boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 5px",
                fontWeight: "600",
              }}
              onClick={avatCreation}
            >
              Generate Avatar
            </button>
            <div
              style={{
                marginBottom: "20px",
                fontSize: "20px",
                color: "#0E4A44",
              }}
            >
              {message}
            </div>

            <img
              style={{
                width: "80%",
                boxShadow: "rgba(0, 0, 0, 0.25) 0px 3px 5px",
              }}
              src={output}
            />
          </div>
        </div>
      </center>
    </>
  );
}

export default PetAvatar;
