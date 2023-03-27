import React, { useState, useEffect } from "react";
 
export function StripeDonation(props) {
  const [total, setTotal] = useState(5);
    const url = "http://localhost:3000/donation/create-checkout-session/"; 
    return (
      <section>
        <div className="product">
          <div className="description">
            <h3>Contribute to this Crowdfunding</h3>
            <h5>{total}$</h5>
          </div>
        </div>
        <form
          action={url + total+"/" + props.id+"/"+props.funding}
          method="POST"
        >
          <input
            style={{
              backgroundColor: "gray",
            }}
            onChange={(e) => setTotal(e.target.value)}
            value={total}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#008cdd",
              width: "200px",
              padding: "10px",
              borderRadius: "7px",
              color: "white",
            }}
          >
            Donate with Stripe
          </button>
          <i className="fab fa-cc-stripe" style={{ marginLeft : "20px" , fontSize: "30px" }} />
        </form>
      </section>
    );
};
  